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

export default function PartsPage() {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/parts")
            .then((response) => response.json())
            .then((data) => setParts(data))
            .catch((error) =>
                console.error("Erreur lors de la récupération des pièces :", error)
            );
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/parts/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de la pièce");
            }
            setParts((prevParts) => prevParts.filter((part) => part.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Liste des Pièces</h1>
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Référence</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Stock Minimum</TableHead>
                            <TableHead>Créé le</TableHead>
                            <TableHead>Mis à jour le</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parts.map((part) => (
                            <TableRow key={part.id}>
                                <TableCell>{part.id}</TableCell>
                                <TableCell>{part.name}</TableCell>
                                <TableCell>{part.reference}</TableCell>
                                <TableCell>{part.stock}</TableCell>
                                <TableCell>{part.minimumstock}</TableCell>
                                <TableCell>{new Date(part.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(part.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Trash
                                        onClick={() => handleDelete(part.id)}
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
                    <Link href="/parts/create">Ajouter une pièce</Link>
                </Button>
            </div>
        </div>
    );
}
