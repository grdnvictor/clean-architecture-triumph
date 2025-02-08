"use client"
import { useEffect, useState } from "react";

export default function MotorcyclesPage() {
    const [motorcycles, setMotorcycles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/motorcycles")
            .then((response) => response.json())
            .then((data) => setMotorcycles(data))
            .catch((error) => console.error("Error fetching motorcycles:", error));
    }, []);

    return (
        <div >
            <h1>Motorcycles</h1>
            <div >
                {motorcycles.map((motorcycle) => (
                    <div key={motorcycle.id} >
                        <div>
                            <p >VIN: {motorcycle.vin}</p>
                            <p>Model ID: {motorcycle.modelid}</p>
                            <p>Concession ID: {motorcycle.concessionid}</p>
                            <p>Current Mileage: {motorcycle.currentmileage} km</p>
                            <p >Created At: {new Date(motorcycle.createdat).toLocaleString()}</p>
                            <p >Updated At: {new Date(motorcycle.updatedat).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
