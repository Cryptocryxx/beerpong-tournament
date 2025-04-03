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
                <p>Zu Beginn wird ausgelost, wer zuerst auswirft. Beide Spieler werfen abwechselnd, bis einer den Ball in einen Becher trifft. Der Spieler, der zuerst trifft, beginnt das Spiel.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">2. Spielablauf</h2>
                <p>Jedes Team hat pro Runde zwei Würfe. Ziel ist es, den Tischtennisball in die Becher des Gegners zu werfen. Trifft ein Spieler einen Becher, muss der Gegner diesen trinken und entfernen. Der getroffene Becher wird aus dem Spiel genommen.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">3. Rückwürfe und Extras</h2>
                
                <p className="mb-3"><strong>Balls Back:</strong> Falls ein Team beide Würfe in unterschiedliche Becher trifft, erhält es die Bälle zurück und darf erneut werfen.</p>
                
                <p className="mb-3"><strong>Bombe:</strong> Falls ein Team es schafft, beide Bälle in denselben Becher zu werfen, werden drei Becher entfernt und das Team erhält Balls Back. Dabei können nur Becher, die direkt aneinander angrenzen, ausgewählt werden. Falls keine Becher anliegen oder nur einer, darf der verbleibende Becher frei gewählt werden.</p>

                <p className="mb-3"><strong>Trickshot:</strong> Falls der Ball über den Tisch zurückrollt und gefangen wird, bevor er den Boden berührt, darf der Spieler einen Trickshot ausführen. Der Ball muss jedoch über die Hälfte des Tisches gerollt sein, bevor er gefangen wird.</p>

                <p className="mb-3"><strong>Island Call:</strong> Steht ein Becher allein, darf ein Spieler einmal pro Spiel „Island“ ansagen. Trifft der Spieler diesen Becher, werden zwei Becher entfernt – den zweiten Becher darf das Team, das getroffen hat, selbst auswählen.</p>

                <p className="mb-3"><strong>Elbow-Regel:</strong> Beim Werfen darf der Ellenbogen nicht über die Tischkante hinausragen. Falls dies passiert, kann das gegnerische Team den Wurf für ungültig erklären und wiederholen lassen. (Nach Ermessen der Spieler – die Regel sollte nicht zu streng ausgelegt werden.)</p>

                <p className="mb-3"><strong>On Fire:</strong> Wenn ein Spieler in zwei aufeinanderfolgenden Runden einen Becher des Gegners trifft, muss der Spieler bei erstenmal ,,Heating Up" und beim erneuten treffen ,,On Fire" sagen. In der nächsten Runde darf der Spieler ein zusätzliches Wurfrecht nutzen, bis er nicht mehr trifft.</p>

                <p><strong>Airball:</strong> Wenn der Spieler mit einem Wurf den Becher des Gegners komplett verfehlt und der Ball hinter den Tisch fliegt, nennt man dies einen „Airball“. Falls ein Team drei Airballs wirft (also bei drei Würfen den Becher verfehlt und der Ball über den Tisch fliegt), muss das Team einen Becher entfernen.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">4. Trinkregeln</h2>

                <p>Das Team bei dem ein Becher getroffen wurde, muss diesen Becher leeren bevor geworfen werden darf.</p>

                <p>Es gibt keine Trinkreihenfolge oder sonstiges, allerdings müssen die Becher von den Stammmitgliedern des Teams getrunken werden.</p>

                <p>Es muss aus den Bechern getrunken werden. Dafür wird jedem Team ein eigenes Bierpong-Becher set zur Verfügung gestellt.</p>

                <p>Der Inhalt der Becher muss alkoholisch sein mit über 3%, ist ansonsten aber frei wählbar.</p>

                <p>Wenn mit Bier getrunken wird werden 2 Bier auf die 10 Becher verteilt. Bei jedem anderen Getränk muss die Spielleitung entscheiden.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">5. Gewinner</h2>
                <p className="mb-3">Das Team, das als Erstes alle Becher des Gegners getroffen hat, gewinnt das Spiel.</p>
                
                <p className="mb-3"><strong>Gast Wurf:</strong> Es ist ein Gast Wurf pro Spiel erlaubt. Mit Gast Wurf ist der Wurf eines nicht Stammmitglieds gemeint.</p>
                
                <p className="mb-3"><strong>Gentleman Agreement:</strong> Es gibt immer einen Rückwurf, das heißt, das gegnerische Team hat die Möglichkeit, nach dem letzten Treffer ebenfalls zu werfen.</p>
                
                <p className="mb-3"><strong>Overtime:</strong> Falls beide Teams den letzten Becher in der gleichen Runde treffen, kommt es zur Overtime. Jedes Team erhält dabei einen einzelnen Becher, der zuerst getroffen werden muss, um das Spiel zu gewinnen.</p>
                
                <p><strong>Extra-Regel:</strong> Falls ein Team vergisst, einen getroffenen Becher zu entfernen und dieser erneut getroffen wird, verliert das Team automatisch das Spiel.</p>
            </div>
        </div>
    );
}
