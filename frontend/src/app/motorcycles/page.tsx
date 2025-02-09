"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash } from "lucide-react";

export default function MotorcyclesPage() {
    const [motorcycles, setMotorcycles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/motorcycles")
            .then((response) => response.json())
            .then((data) => setMotorcycles(data))
            .catch((error) =>
                console.error("Erreur lors de la récupération des clients :", error)
            );
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/motorcycles/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du client");
            }
            setMotorcycles((motorcycles) =>
                motorcycles.filter((motorcycle) => motorcycle.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Liste des motos</h1>
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>VIN</TableHead>
                            <TableHead>Model ID</TableHead>
                            <TableHead>Current Mileage</TableHead>
                            <TableHead>Créée le</TableHead>
                            <TableHead>Mise à jour le</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {motorcycles.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.id}</TableCell>
                                <TableCell>{client.vin}</TableCell>
                                <TableCell>{client.modelid}</TableCell>
                                <TableCell>{client.concessionid}</TableCell>
                                <TableCell>
                                    {new Date(client.createdat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(client.updatedat).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Trash
                                        onClick={() => handleDelete(client.id)}
                                        className="text-red-500 w-4 h-4 cursor-pointer"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-8">
                <Button>
                    <Link href="/motorcycles/create">Ajouter une moto</Link>
                </Button>
            </div>
        </div>
    );
}
