import Image from "next/image";

export default function Rules() {
    return (
        <div className="relative min-h-[100dvh] w-screen flex flex-col items-center p-4">
            {/* Background Image - Fixiert und nicht verzerrt */}
            <div className="fixed inset-0 -z-10">
                <Image 
                    src="/bg.jpeg" 
                    alt="Background" 
                    layout="fill"
                    quality={100}
                    className="object-cover"
                />
            </div>

            {/* Titel */}
            <h1 className="text-3xl font-bold text-white mt-8">Offizielle Beerpong Regeln</h1>

            {/* Regel-Container */}
            <div className="w-11/12 max-w-3xl bg-black/60 text-white text-lg p-6 rounded-lg mt-6 shadow-lg">
                
                <h2 className="text-2xl font-semibold mb-4">1. Auswerfen</h2>
                <p>Zu Beginn des Spiels wird ausgelost, welches Team das Spiel beginnt. Beide Teams werfen abwechselnd, bis einer der Spieler einen Becher trifft. Das Team, das zuerst trifft, beginnt offiziell mit dem Spiel.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">2. Spielablauf</h2>
                <p>Jedes Team hat pro Runde zwei Würfe (ein Wurf pro Spieler). Ziel ist es, den Tischtennisball in die Becher des gegnerischen Teams zu werfen. Wird ein Becher getroffen, muss dieser ausgetrunken und aus dem Spiel genommen werden. Das Spiel wird fortgesetzt, bis ein Team alle gegnerischen Becher getroffen hat.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">3. Sonderregeln & Aktionen</h2>
                
                <p className="mb-3"><strong>Balls Back:</strong> Trifft ein Team in derselben Runde beide Würfe in unterschiedliche Becher, erhält es die Bälle zurück und darf erneut werfen.</p>
                
                <p className="mb-3"><strong>Bombe:</strong> Treffen beide Bälle in denselben Becher, darf das werfende Team drei beliebige Becher des gegnerischen Teams entfernen. Außerdem erhalten sie die Bälle zurück („Balls Back“).</p>

                <p className="mb-3"><strong>Trickshot:</strong> Rollt ein Ball nach einem Wurf über den Tisch zurück und wird gefangen, bevor er den Boden berührt, darf ein Trickshot ausgeführt werden. Voraussetzung: Der Ball muss dabei mindestens die Tischmitte überquert haben.</p>

                <p className="mb-3"><strong>Elbow-Regel:</strong> Beim Wurf darf der Ellenbogen nicht über die Tischkante hinausragen. Verstößt ein Spieler dagegen, kann das gegnerische Team den Wurf für ungültig erklären und eine Wiederholung verlangen. (Hinweis: Diese Regel sollte sportlich und nicht zu streng ausgelegt werden.)</p>

                <p className="mb-3"><strong>Gastwürfe:</strong> Pro Spiel sind vier Gastwürfe erlaubt. Ein Gastwurf ist der Wurf einer Person, die nicht zum Stammteam gehört.</p>

                <p className="mb-3"><strong>Gentleman Agreement:</strong> Nach dem letzten Treffer eines Spiels erhält das gegnerische Team einen Rückwurf, um ebenfalls die Chance auf den Ausgleich zu haben. Dies gilt unabhängig von Balls Back oder anderen Regeln.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">4. Spielende & Sonderfälle</h2>
                
                <p className="mb-3"><strong>Sieg:</strong> Das Team, das alle Becher des Gegners zuerst getroffen hat, gewinnt das Spiel.</p>
                
                <p className="mb-3"><strong>Overtime (Verlängerung):</strong> Treffen beide Teams den letzten Becher in derselben Runde, kommt es zur Overtime. Jedes Team erhält einen Becher. Es wird weitergespielt, bis eines der Teams den Becher trifft und das gegnerische Team im Rückwurf verfehlt.</p>
                
                <p className="mb-3"><strong>Unentschieden (Draw):</strong> Wenn beide Teams einem Unentschieden zustimmen, wird das Spiel mit einem Punkt für beide Teams und der jeweiligen Becherdifferenz gewertet.</p>
            </div>
        </div>
    );
}
