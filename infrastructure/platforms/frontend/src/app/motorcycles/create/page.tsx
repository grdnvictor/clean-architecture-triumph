"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useRequireAuth} from "@/hooks/useRequireAuth";

export default function CreateMotorcyclePage() {
    // const authChecked = useRequireAuth();
    //
    // if (!authChecked) {
    //     return null;
    // }

    const [formData, setFormData] = useState({
        vin: "",
        modelId: "",
        concessionId: "",
        currentMileage: ""
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Convertir le kilométrage en nombre avant l'envoi
        const payload = {
            ...formData,
            currentMileage: Number(formData.currentMileage)
        };

        try {
            const response = await fetch("http://localhost:8000/motorcycles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création de la moto");
            }

            router.push("/motorcycles");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 grid place-items-center h-full w-full">
            <Card className="mx-auto w-[400px]">
                <CardHeader>
                    <CardTitle>Créer une Moto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="vin">VIN</Label>
                            <Input
                                id="vin"
                                name="vin"
                                value={formData.vin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="modelId">ID Modèle</Label>
                            <Input
                                id="modelId"
                                name="modelId"
                                value={formData.modelId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="concessionId">ID Concession</Label>
                            <Input
                                id="concessionId"
                                name="concessionId"
                                value={formData.concessionId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="currentMileage">Kilométrage Actuel</Label>
                            <Input
                                type="number"
                                id="currentMileage"
                                name="currentMileage"
                                value={formData.currentMileage}
                                onChange={handleChange}
                                required
                            />
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
