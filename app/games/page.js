'use client'
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { FaBeer } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Games() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [showLoginWarning, setShowLoginWarning] = useState(false);
    const [ergebnis, setErgebnis] = useState(null);
    const [becher, setBecher] = useState(1);
    const [gespielteSpiele, setGespielteSpiele] = useState([]);
    const [naechstesSpiel, setNaechstesSpiel] = useState(null);

    useEffect(() => {
        const teamName = Cookies.get("teamName");

        if (!teamName) {
            setShowLoginWarning(true);
            return;
        }

        // Fetch past games
        fetch(`https://depthofheritage.online/api/beerPong/pastGames/${teamName}`)
            .then(res => res.json())
            .then(data => {
                const mappedGames = data.map((game, index) => ({
                    datum: `Spiel ${index + 1}`,
                    spiel: `Spiel ${index + 1}`,
                    ergebnis: game.win ? "Gewonnen" : "Verloren",
                    opponent: game.opponentTeam,
                    becher: game.remainingCups
                }));
                setGespielteSpiele(mappedGames);
            })
            .catch(err => console.error("Fehler beim Laden der vergangenen Spiele:", err));

        // Fetch next opponent
        fetch(`https://depthofheritage.online/api/beerPong/nextopponent/${teamName}`)
            .then(res => res.json())
            .then(data => {
                setNaechstesSpiel({
                    tisch: 5, // Kannst du evtl. später auch dynamisch machen
                    gegen: data,
                    vorEinem: 2 // Auch das ggf. später aus API
                });
            })
            .catch(err => console.error("Fehler beim Laden des nächsten Spiels:", err));
    }, [showModal]);

    const handleSubmit = () => {
        const teamName = Cookies.get("teamName");
    
        if (!teamName || !naechstesSpiel) {
            console.warn("Teamname oder nächstes Spiel fehlt");
            return;
        }
    
        const payload = {
            team: teamName,
            opponentTeam: naechstesSpiel.gegen,
            win: ergebnis === 'Gewonnen',
            remainingCups: becher,
            groupPhase: true
        };
    
        fetch("https://depthofheritage.online/api/beerPong/result", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Senden des Spielergebnisses");
            }
            return response.json();
        })
        .then(data => {
            console.log("Ergebnis gespeichert:", data);
            setShowModal(false);
            // Optional: Daten neu laden (z.B. vergangene Spiele neu fetchen)
        })
        .catch(error => {
            console.error("Fehler beim Speichern des Ergebnisses:", error);
        });
    };

    const handleReturnHome = () => {
        router.push("/")
    }
    

    const Spielverlauf = () => (
        <div className="min-h-screen flex flex-col bg-black/20 items-center justify-start p-6 relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-12">Spielverlauf</h1>

            {/* Gespielte Spiele */}
            <div className="w-full max-w-4xl text-center mb-12">
                {gespielteSpiele.length > 0 ? (
                    <ul className="list-none bg-black/60 rounded-xl p-4 space-y-4 text-lg text-white">
                        {gespielteSpiele.map((spiel, index) => (
                            <li key={index}>
                                <strong>{spiel.spiel}</strong> - <span className="font-bold">{spiel.ergebnis} gegen {spiel.opponent}</span>
                                <p>Becher übrig: {spiel.becher}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">Keine Spiele vorhande Trage dein erstes Spiel ein um hier Inhalt zu sehen...</p>
                )}
            </div>

            {/* Nächstes Spiel */}
            {naechstesSpiel && (
                <div className="text-center  text-white text-lg border-t-2 pt-8 mt-12">
                    <h2 className="text-xl font-semibold mb-4">Nächstes Spiel</h2>
                    <p className="text-white bg-black/60 rounded-xl p-4" >Du spielst als nächstes {/* am Tisch <span className="font-bold">{naechstesSpiel.tisch}</span> */} gegen <span className="font-bold">{naechstesSpiel.gegen}</span>.{/*</p>
                    <p>Es sind noch <span className="font-bold">{naechstesSpiel.vorEinem}</span> Spieler vor dir dran. */}</p>
                </div>
            )}

            {/* Button für Ergebnis eintragen */}
            <button 
                className="bg-white/100 text-black p-3 rounded-full mt-6 hover:bg-white/80 transition"
                onClick={() => setShowModal(true)}
            >
                Ergebnis eintragen
            </button>

            {/* Modal für Ergebnis-Eingabe */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-20">
                    <div className="bg-white/60 p-6 rounded-lg w-10/12 shadow-lg text-black">
                        <h2 className="text-xl font-semibold mb-4">Spielergebnis eintragen</h2>

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

                        <div className="flex justify-center space-x-2 mb-4">
                            {[...Array(10)].map((_, index) => (
                                <FaBeer  
                                    key={index} 
                                    className={`text-xl cursor-pointer transition ${index < becher ? 'text-orange-500' : 'text-gray-300'}`} 
                                    onClick={() => setBecher(index + 1)} 
                                />
                            ))}
                        </div>

                        <p className="text-center font-bold">Becher übrig: {becher}</p>

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

            {/* Login-Warnung Modal */}
            {showLoginWarning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-30">
                    <div className="bg-white p-8 rounded-xl shadow-lg text-center text-black max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Nicht angemeldet</h2>
                        <p className="mb-6">Bitte melde dich zuerst an, um deine Spiele sehen zu können.</p>
                        <button 
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                            onClick={handleReturnHome}
                        >
                            Schließen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="relative h-screen w-screen bg-black/30">
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
