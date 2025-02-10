"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTrialPage() {
    const [formData, setFormData] = useState({
        clientId: "",
        motorcycleId: "",
        concessionId: "",
        startDate: "",
        endDate: "",
        mileageStart: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "mileageStart" ? parseInt(value, 10) || 0 : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/trials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    mileageStart: parseInt(formData.mileageStart, 10),
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création de l'essai");
            }

            router.push("/trials");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 grid place-items-center h-full w-full">
            <Card className="mx-auto w-[400px]">
                <CardHeader>
                    <CardTitle>Créer un Essai</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="clientId">ID Client</Label>
                            <Input id="clientId" name="clientId" value={formData.clientId} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="motorcycleId">ID Motocycle</Label>
                            <Input id="motorcycleId" name="motorcycleId" value={formData.motorcycleId} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="concessionId">ID Concession</Label>
                            <Input id="concessionId" name="concessionId" value={formData.concessionId} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="startDate">Date de début</Label>
                            <Input id="startDate" name="startDate" type="datetime-local" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="endDate">Date de fin</Label>
                            <Input id="endDate" name="endDate" type="datetime-local" value={formData.endDate} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="mileageStart">Kilométrage début</Label>
                            <Input id="mileageStart" name="mileageStart" type="number" value={formData.mileageStart} onChange={handleChange} required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Ajout en cours..." : "Ajouter"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
