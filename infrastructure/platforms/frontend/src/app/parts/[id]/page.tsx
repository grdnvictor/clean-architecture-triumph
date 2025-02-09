"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EditPartPage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        reference: "",
        stock: 0,
        minimumStock: 1
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/parts/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setFormData({
                        name: data.name || "",
                        reference: data.reference || "",
                        stock: data.stock || 0,
                        minimumStock: data.minimumStock || 1
                    });
                })
                .catch(() => setError("Erreur lors de la récupération de la pièce"));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === "stock" || name === "minimumStock" ? parseInt(value, 10) || 0 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:8000/parts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    stock: parseInt(formData.stock, 10),
                    minimumStock: parseInt(formData.minimumStock, 10),
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour de la pièce");
            }

            router.push("/parts");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <Card className="mx-auto w-[400px]">
                <CardHeader>
                    <CardTitle>Modifier la Pièce</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
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
                            {loading ? "Mise à jour..." : "Mettre à jour"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
