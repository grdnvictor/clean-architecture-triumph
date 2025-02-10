"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientData {
    id: string;
    firstName: string;
    lastName: string;
    motorcycles?: { id: string; brand: string; model: string; year: number }[];
}

interface AppointmentData {
    date: string;
    time: string;
    duration: string;
    type: string;
    notes: string;
}

export default function CreateAppointmentPage() {
    const [searchPhone, setSearchPhone] = useState<string>("");
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [selectedMotorcycle, setSelectedMotorcycle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [appointmentData, setAppointmentData] = useState<AppointmentData>({
        date: "",
        time: "",
        duration: "60",
        type: "maintenance",
        notes: "",
    });

    const handleSearchClient = async () => {
        try {
            const response = await fetch(`http://localhost:8000/clients/search?phone=${searchPhone}`);
            if (!response.ok) {
                throw new Error("Client non trouvé");
            }
            const data: ClientData = await response.json();
            setClientData(data);
            setSelectedMotorcycle("");
        } catch (error) {
            console.error("Erreur lors de la recherche du client:", error);
            setClientData(null);
        }
    };

    const handleAppointmentDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentData({
            ...appointmentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setAppointmentData({
            ...appointmentData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientData || !selectedMotorcycle) {
            alert("Veuillez sélectionner un client et une moto");
            return;
        }

        setLoading(true);
        try {
            const appointmentPayload = {
                clientId: clientData.id,
                motorcycleId: selectedMotorcycle,
                date: `${appointmentData.date}T${appointmentData.time}`,
                duration: appointmentData.duration,
                type: appointmentData.type,
                notes: appointmentData.notes
            };

            const response = await fetch("http://localhost:8000/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentPayload),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création du rendez-vous");
            }

            router.push("/appointments");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 grid place-items-center h-full w-full">
            <Card className="mx-auto w-[500px]">
                <CardHeader>
                    <CardTitle>Maintenance - Nouveau Rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="searchPhone">Numéro de téléphone</Label>
                                    <Input
                                        id="searchPhone"
                                        value={searchPhone}
                                        onChange={(e) => setSearchPhone(e.target.value)}
                                        placeholder="Entrez le numéro"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearchClient}
                                    className="mt-6"
                                >
                                    Trouver client
                                </Button>
                            </div>

                            {clientData && (
                                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium">Client trouvé :</h3>
                                    <p>{clientData.firstName} {clientData.lastName}</p>

                                    <div>
                                        <Label htmlFor="motorcycle">Choisir une moto</Label>
                                        <Select
                                            value={selectedMotorcycle}
                                            onValueChange={setSelectedMotorcycle}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une moto" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {clientData.motorcycles?.map((moto) => (
                                                    <SelectItem key={moto.id} value={moto.id}>
                                                        {moto.brand} {moto.model} - {moto.year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="date">Date</Label>
                                                <Input
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    value={appointmentData.date}
                                                    onChange={handleAppointmentDataChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="time">Heure</Label>
                                                <Input
                                                    id="time"
                                                    name="time"
                                                    type="time"
                                                    value={appointmentData.time}
                                                    onChange={handleAppointmentDataChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="duration">Durée (minutes)</Label>
                                            <Select
                                                value={appointmentData.duration}
                                                onValueChange={(value) => handleSelectChange("duration", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionnez une durée" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="30">30 minutes</SelectItem>
                                                    <SelectItem value="60">1 heure</SelectItem>
                                                    <SelectItem value="90">1 heure 30</SelectItem>
                                                    <SelectItem value="120">2 heures</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="notes">Notes</Label>
                                            <Input
                                                id="notes"
                                                name="notes"
                                                value={appointmentData.notes}
                                                onChange={handleAppointmentDataChange}
                                            />
                                        </div>

                                        <Button
                                            onClick={handleSubmit}
                                            disabled={loading || !selectedMotorcycle}
                                            className="w-full"
                                        >
                                            {loading ? "Création en cours..." : "Créer le rendez-vous"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}