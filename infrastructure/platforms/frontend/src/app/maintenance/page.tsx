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
    id?: string;
    name: string;
    year: number;
    brandId: string;
    maintenanceIntervalKm: number;
    maintenanceIntervalMonths: number;
    description: string;
}

export default function ModelManagement() {
    const [motorcycleBrands, setMotorcycleBrands] = useState<MotorcycleBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedDisplayBrand, setSelectedDisplayBrand] = useState<string>('');
    const [models, setModels] = useState<MotorcycleModel[]>([]);
    const [filteredModels, setFilteredModels] = useState<MotorcycleModel[]>([]);
    const [newModel, setNewModel] = useState<MotorcycleModel>({
        name: '',
        year: new Date().getFullYear(),
        brandId: 0,
        maintenanceIntervalKm: 0,
        maintenanceIntervalMonths: 0,
        description: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        fetchMotorcycleBrands();
        fetchModels();
    }, []);
    useEffect(() => {
        if (selectedDisplayBrand) {
            console.log(models)
            console.log(selectedDisplayBrand)
            const filtered = models.filter(model => model.brand_id == selectedDisplayBrand);
            console.log('Filtered Models:', filtered);
            setFilteredModels(filtered);
        } else {
            setFilteredModels(models);
        }
    }, [selectedDisplayBrand, models]);



    const fetchMotorcycleBrands = async() => {
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

    const fetchModels = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/motorcycle-models');
            const data: MotorcycleModel[] = await response.json();
            const formattedData: MotorcycleModel[] = data.map(model => ({
                ...model,
                brandId: model.brand_id,
            }));

            setModels(formattedData);
            setFilteredModels(formattedData);
        } catch (error) {
            setError('Erreur lors du chargement des modèles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const modelData = {
                ...newModel,
                brandId: selectedBrand
            };

            const response = await fetch('http://localhost:8000/motorcycle-models', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modelData),
            });

            if (response.ok) {
                await fetchModels();
                setNewModel({
                    name: '',
                    year: new Date().getFullYear(),
                    brandId: '',
                    maintenanceIntervalKm: 0,
                    maintenanceIntervalMonths: 0,
                    description: ''
                });
                setSelectedBrand('');
            }
        } catch (error) {
            setError('Erreur lors de la création du modèle');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-6 py-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6 text-black">
                <Card className="mx-auto w-[400px]">
                    <CardHeader>
                        <CardTitle>Nouveau modèle de moto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
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
                                    Nom du modèle
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    value={newModel.name}
                                    onChange={(e) => setNewModel({
                                        ...newModel,
                                        name: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Année du modèle
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    min="1900"
                                    max={currentYear}
                                    value={newModel.year}
                                    onChange={(e) => setNewModel({
                                        ...newModel,
                                        year: parseInt(e.target.value)
                                    })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Intervalle kilométrique
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    placeholder="ex: 10000"
                                    value={newModel.maintenanceIntervalKm}
                                    onChange={(e) => setNewModel({
                                        ...newModel,
                                        maintenanceIntervalKm: parseInt(e.target.value)
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
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    placeholder="ex: 12"
                                    value={newModel.maintenanceIntervalMonths}
                                    onChange={(e) => setNewModel({
                                        ...newModel,
                                        maintenanceIntervalMonths: parseInt(e.target.value)
                                    })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description de l'entretien
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                                    rows={3}
                                    placeholder="Description des opérations d'entretien"
                                    value={newModel.description}
                                    onChange={(e) => setNewModel({
                                        ...newModel,
                                        description: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !selectedBrand}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'En cours...' : 'Créer le modèle'}
                            </button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="mx-auto w-[400px]">
                    <CardHeader>
                        <CardTitle>Modèles existants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Filtrer par marque
                            </label>
                            <select
                                className="w-full px-3 py-2 rounded-md border border-gray-300"
                                value={selectedDisplayBrand}
                                onChange={(e) => setSelectedDisplayBrand(e.target.value)}
                            >
                                <option value="">Toutes les marques</option>
                                {motorcycleBrands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-4">
                            {filteredModels.map((model) => {
                                const brand = motorcycleBrands.find(b => b.id === model.brandId);
                                return (
                                    <div key={model.id} className="p-4 border rounded-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                {brand ? (
                                                    <h3 className="font-semibold">
                                                        {brand.name} {model.name} ({model.year})
                                                    </h3>
                                                ) : (
                                                    <h3 className="font-semibold text-red-500">
                                                        Marque non trouvée {model.name} ({model.year})
                                                    </h3>
                                                )}
                                                <p className="text-sm text-gray-600">
                                                    Entretien tous les: {model.maintenanceIntervalKm} km ou {model.maintenanceIntervalMonths} mois
                                                </p>
                                                <p className="mt-2">{model.description?.type || model.description}</p> {/* Accessing description */}
                                            </div>
                                            <button
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                onClick={() => {}}
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
}