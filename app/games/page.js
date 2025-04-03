'use client'
import Image from "next/image";
import React, { useState } from 'react';
import { FaBeer } from "react-icons/fa"; // Becher-Icon

export default function Games() {
    const [showModal, setShowModal] = useState(false);
    const [ergebnis, setErgebnis] = useState(null);
    const [becher, setBecher] = useState(1); // Startwert 1

    const gespielteSpiele = [
        { datum: '01.04.2025', spiel: 'Spiel 1', ergebnis: 'Gewonnen', opponent: 'Spieler A', becher: 3 },
        { datum: '02.04.2025', spiel: 'Spiel 2', ergebnis: 'Verloren', opponent: 'Spieler B', becher: 0 },
        { datum: '03.04.2025', spiel: 'Spiel 3', ergebnis: 'Gewonnen', opponent: 'Spieler C', becher: 2 },
    ];

    const naechstesSpiel = {
        tisch: 5,
        gegen: 'Max Mustermann',
        vorEinem: 2,
    };

    const handleSubmit = () => {
        console.log("Spielergebnis:", ergebnis, "Becher übrig:", becher);
        setShowModal(false);
    };

    const Spielverlauf = () => {
        return (
            <div className="min-h-screen flex flex-col items-center justify-start p-6 relative z-10">
                <h1 className="text-4xl font-extrabold text-white mb-12">Spielverlauf</h1>

                {/* Verlauf der gespielten Spiele */}
                <div className="w-full max-w-4xl text-center mb-12">
                    <ul className="list-none space-y-4 text-lg text-white">
                        {gespielteSpiele.map((spiel, index) => (
                            <li key={index}>
                                <strong>{spiel.spiel}</strong> - <span className="font-bold">{spiel.ergebnis} gegen {spiel.opponent}</span>
                                <p>Becher übrig: {spiel.becher}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Nächstes Spiel */}
                <div className="text-center text-white text-lg border-t-2 pt-8 mt-12">
                    <h2 className="text-xl font-semibold mb-4">Nächstes Spiel</h2>
                    <p>Du spielst am Tisch <span className="font-bold">{naechstesSpiel.tisch}</span> gegen <span className="font-bold">{naechstesSpiel.gegen}</span>.</p>
                    <p>Es sind noch <span className="font-bold">{naechstesSpiel.vorEinem}</span> Spieler vor dir dran.</p>
                </div>
                
                {/* Button für Ergebnis eintragen */}
                <button 
                    className="bg-white/60 text-black p-3 rounded-full mt-6 hover:bg-white/80 transition"
                    onClick={() => setShowModal(true)}
                >
                    Ergebnis eintragen
                </button>

                {/* Modal für Ergebnis-Eingabe */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
                        <div className="bg-white/60 p-6 rounded-lg w-10/12 shadow-lg text-black">
                            <h2 className="text-xl font-semibold mb-4">Spielergebnis eintragen</h2>
                            
                            {/* Auswahl: Gewonnen oder Verloren */}
                            <div className="flex justify-between mb-4">
                                <button 
                                    className={`px-2 py-2 rounded ${ergebnis === 'Gewonnen' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} 
                                    onClick={() => setErgebnis('Gewonnen')}
                                >
                                    Gewonnen
                                </button>
                                <button 
                                    className={`px-2 py-2 rounded ${ergebnis === 'Verloren' ? 'bg-red-500 text-white' : 'bg-gray-200'}`} 
                                    onClick={() => setErgebnis('Verloren')}
                                >
                                    Verloren
                                </button>
                            </div>

                            {/* Auswahl der Becher als Icons */}
                            <div className="flex justify-center space-x-2 mb-4">
                                {[...Array(10)].map((_, index) => (
                                     <FaBeer  
                                     key={index} 
                                     className={`text-xl cursor-pointer transition ${index < becher ? 'text-orange-500' : 'text-gray-300'}`} 
                                     onClick={() => setBecher(index + 1)} 
                                 />
                                ))}
                            </div>

                            {/* Becher-Anzahl anzeigen */}
                            <p className="text-center font-bold">Becher übrig: {becher}</p>

                            {/* Buttons zum Speichern oder Abbrechen */}
                            <div className="flex justify-between mt-4">
                                <button 
                                    className="bg-gray-500 text-white px-2 py-2 rounded hover:bg-gray-600 transition"
                                    onClick={() => setShowModal(false)}
                                >
                                    Abbrechen
                                </button>
                                <button 
                                    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
                                    onClick={handleSubmit}
                                >
                                    Speichern
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative h-screen w-screen bg-black/30">
            {/* Hintergrundbild */}
            <Image 
                src="/bg.jpeg" 
                alt="Background" 
                layout="fill"
                quality={100}
                style={{ objectFit: 'cover' }}
                className="-z-10"
            />
            <Spielverlauf />
        </div>
    );
}
