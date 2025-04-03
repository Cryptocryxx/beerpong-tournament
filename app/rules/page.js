import Image from "next/image";

export default function Rules() {
    return (
        <div className="relative min-h-screen w-screen flex flex-col items-center p-4">
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
                
                <h2 className="text-xl font-semibold mb-4">1. Auswerfen</h2>
                <p>Zu Beginn wird ausgelost, wer zuerst auswirft. Beide Spieler werfen abwechselnd, bis einer den Ball in einen Becher trifft. Der Spieler, der zuerst trifft, beginnt das Spiel.</p>
                
                <h2 className="text-2xl font-semibold mt-6 mb-4">2. Spielablauf</h2>
                <p>Jedes Team hat pro Runde zwei Würfe. Ziel ist es, den Tischtennisball in die Becher des Gegners zu werfen. Trifft ein Spieler einen Becher, muss der Gegner diesen trinken und entfernen. Der getroffene Becher wird aus dem Spiel genommen.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">3. Rückwürfe und Extras</h2>
                
                <p className="mb-3"><strong>Balls Back:</strong> Falls ein Team beide Würfe in unterschiedliche Becher trifft, erhält es die Bälle zurück und darf erneut werfen.</p>
                
                <p className="mb-3"><strong>Bombe:</strong> Falls ein Team es schafft, beide Bälle in denselben Becher zu werfen, werden drei Becher entfernt und das Team erhält Balls Back.</p>

                <p className="mb-3"><strong>Trickshot:</strong> Falls der Ball über den Tisch zurückrollt und gefangen wird, bevor er den Boden berührt, darf der Spieler einen Trickshot ausführen.</p>

                <p className="mb-3"><strong>Island Call:</strong> Steht ein Becher allein, darf ein Spieler einmal pro Spiel „Island“ ansagen. Trifft der Spieler diesen Becher, werden zwei Becher entfernt.</p>

                <p className="mb-3"><strong>Elbow-Regel:</strong> Beim Werfen darf der Ellenbogen nicht über die Tischkante hinausragen.</p>

                <p className="mb-3"><strong>On Fire:</strong> Wenn ein Spieler in zwei aufeinanderfolgenden Runden trifft, muss er „Heating Up“ und dann „On Fire“ sagen. Danach hat er ein zusätzliches Wurfrecht.</p>

                <p><strong>Airball:</strong> Wenn der Spieler mit einem Wurf den Becher komplett verfehlt und der Ball hinter den Tisch fliegt. Bei drei Airballs muss das Team einen Becher entfernen.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">4. Gewinner</h2>
                <p className="mb-3">Das Team, das als Erstes alle Becher des Gegners getroffen hat, gewinnt das Spiel.</p>
                
                <p className="mb-3"><strong>Gentleman Agreement:</strong> Es gibt immer einen Rückwurf.</p>
                
                <p className="mb-3"><strong>Overtime:</strong> Falls beide Teams den letzten Becher in der gleichen Runde treffen, gibt es eine Verlängerung mit einem einzelnen Becher.</p>
                
                <p><strong>Extra-Regel:</strong> Falls ein Team vergisst, einen getroffenen Becher zu entfernen und dieser erneut getroffen wird, verliert es automatisch das Spiel.</p>
            </div>
        </div>
    );
}
