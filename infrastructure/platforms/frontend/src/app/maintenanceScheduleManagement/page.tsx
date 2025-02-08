'use client';
import React, {useEffect, useState} from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// TypeScript Interfaces
interface MotorcycleBrand {
    id: string;
    name: string;
}

interface MotorcycleModel {
    id: string;
    name: string;
    brandId: string;
}

interface MaintenanceSchedule {
    id?: string;
    modelId: string;
    distanceInterval: string;
    timeInterval: string;
    description: string;
}


export default function MaintenanceScheduleManagement  () {
    const [motorcycleBrands, setMotorcycleBrands] = useState<MotorcycleBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [motorcycleModels, setMotorcycleModels] = useState<MotorcycleModel[]>([]);
    const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
    const [newSchedule, setNewSchedule] = useState<MaintenanceSchedule>({
        modelId: '',
        distanceInterval: '',
        timeInterval: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchMotorcycleBrands();
        fetchSchedules();
    }, []);

    useEffect(() => {
        if (selectedBrand) {
            fetchMotorcycleModels(selectedBrand);
        }
    }, [selectedBrand]);


    const fetchMotorcycleBrands = async()=>{
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/motorcycle-brand');
            const data: MotorcycleBrand[] = await response.json();
            setMotorcycleBrands(data);
        } catch (error) {
            setError('Erreur lors du chargement des marques');
        } finally {
            setIsLoading(false);
        }
    }

    const fetchMotorcycleModels = async (brandId:string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/motorcycle-models/${brandId}`);
            const data: MotorcycleModel[] = await response.json();
            setMotorcycleModels(data);
        } catch (error) {
            setError('Erreur lors du chargement des modèles');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSchedules = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/maintenance-schedules');
            const data: MaintenanceSchedule[] = await response.json();
            setSchedules(data);
        } catch (error) {
            setError('Erreur lors du chargement des planifications');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/maintenance-schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSchedule),
            });

            if (response.ok) {
                setNewSchedule({
                    modelId: '',
                    distanceInterval: '',
                    timeInterval: '',
                    description: ''
                });
                fetchSchedules();
                setSelectedBrand('');
            }
        } catch (error) {
            setError('Erreur lors de la création de la planification');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="px-6 py-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6 text-black">
                <Card>
                    <CardHeader>
                        <CardTitle>Nouvelle planification d'entretien</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4 ">
                            <div>
                                <label className="block text-sm font-medium mb-1 ">
                                    Marque de moto
                                </label>
                                <select
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    required
                                >
                                    <option value="">Sélectionnez une marque</option>
                                    {motorcycleBrands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Modèle de moto
                                </label>
                                <select
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    value={newSchedule.modelId}
                                    onChange={(e) => setNewSchedule({
                                        ...newSchedule,
                                        modelId: e.target.value
                                    })}
                                    disabled={!selectedBrand}
                                    required
                                >
                                    <option value="">
                                        {selectedBrand ? 'Sélectionnez un modèle' : 'Choisissez une marque d\'abord'}
                                    </option>
                                    {motorcycleModels.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Intervalle kilométrique
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="ex: 10000"
                                    value={newSchedule.distanceInterval}
                                    onChange={(e) => setNewSchedule({
                                        ...newSchedule,
                                        distanceInterval: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Intervalle temporel (mois)
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="ex: 12"
                                    value={newSchedule.timeInterval}
                                    onChange={(e) => setNewSchedule({
                                        ...newSchedule,
                                        timeInterval: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    placeholder="Description des opérations d'entretien"
                                    value={newSchedule.description}
                                    onChange={(e) => setNewSchedule({
                                        ...newSchedule,
                                        description: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'En cours...' : 'Créer la planification'}
                            </button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Planifications existantes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {schedules.map((schedule) => {
                                const model = motorcycleModels.find(m => m.id === schedule.modelId);
                                return (
                                    <div key={schedule.id} className="p-4 border rounded-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {model?.name || 'Modèle inconnu'}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Intervalle: {schedule.distanceInterval} km ou {schedule.timeInterval} mois
                                                </p>
                                                <p className="mt-2">{schedule.description}</p>
                                            </div>
                                            <button
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                onClick={() => {/* Logique de modification */}}
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

