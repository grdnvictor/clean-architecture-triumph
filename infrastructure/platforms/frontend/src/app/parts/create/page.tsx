"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePartPage() {
    const [formData, setFormData] = useState({
        name: "",
        reference: "",
        stock: 0,
        minimumStock: 1,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "stock" || name === "minimumStock" ? parseInt(value, 10) || 0 : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/parts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    stock: parseInt(formData.stock, 10),
                    minimumStock: parseInt(formData.minimumStock, 10),
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création de la pièce");
            }

            router.push("/parts");
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
                    <CardTitle>Créer une Pièce</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="reference">Référence</Label>
                            <Input id="reference" name="reference" value={formData.reference} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="minimumStock">Stock Minimum</Label>
                            <Input id="minimumStock" name="minimumStock" type="number" value={formData.minimumStock} onChange={handleChange} required />
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
