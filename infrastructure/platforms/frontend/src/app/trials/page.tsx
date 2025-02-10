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

export default function TrialsPage() {
    const [trials, setTrials] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/trials/8bbc4f38-c020-4d4a-bee6-61e3332502ee")
            .then((response) => response.json())
            .then((data) => setTrials(data))
            .catch((error) =>
                console.error("Erreur lors de la récupération des essais :", error)
            );
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/trials/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de l'essai");
            }
            setTrials((prevTrials) => prevTrials.filter((trial) => trial.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Liste des Essais</h1>
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client ID</TableHead>
                            <TableHead>Motocycle ID</TableHead>
                            <TableHead>Concession ID</TableHead>
                            <TableHead>Date de début</TableHead>
                            <TableHead>Date de fin</TableHead>
                            <TableHead>Kilométrage début</TableHead>
                            <TableHead>Kilométrage fin</TableHead>
                            <TableHead>Feedback</TableHead>
                            <TableHead>Créé le</TableHead>
                            <TableHead>Mis à jour le</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trials.map((trial) => (
                            <TableRow key={trial.id}>
                                <TableCell>{trial.id}</TableCell>
                                <TableCell>{trial.clientid}</TableCell>
                                <TableCell>{trial.motorcycleid}</TableCell>
                                <TableCell>{trial.concessionid}</TableCell>
                                <TableCell>{new Date(trial.startdate).toLocaleString()}</TableCell>
                                <TableCell>{new Date(trial.enddate).toLocaleString()}</TableCell>
                                <TableCell>{trial.mileagestart}</TableCell>
                                <TableCell>{trial.mileageend || "N/A"}</TableCell>
                                <TableCell>{trial.feedback || "Aucun"}</TableCell>
                                <TableCell>{new Date(trial.createdat).toLocaleString()}</TableCell>
                                <TableCell>{new Date(trial.updatedat).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Trash
                                        onClick={() => handleDelete(trial.id)}
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
                    <Link href="/trials/create">Ajouter un essai</Link>
                </Button>
            </div>
        </div>
    );
}
