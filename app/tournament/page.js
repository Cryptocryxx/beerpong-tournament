'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import Head from "next/head";
import TournamentPige from "../tournamentTree";
import Xarrow from "react-xarrows";
import { useEffect, useState } from "react";
export default function TournamentPage() {
    const [groups, setGroups] = useState([])

    const router = useRouter();

    const handleReturn = () => {
        router.push("/")
    }

    useEffect(() => {
        getGroupPhaseGroups()
    }, [])

    async function getGroupPhaseGroups() {
        try {
            const response = await fetch("https://depthofheritage.online/api/beerPong/groupPhase/teams");
            const teams = await response.json();
            let groupCount = 0;
            teams.forEach(team => {
                if (team.group > groupCount) groupCount = team.group
            })
            console.log(groupCount)
            let groups = [];
            if (groupCount > 0) {
                
                for (let i = 1; i <= groupCount; i++){
                    groups.push([])
                    teams.forEach(team => {
                        if (i == team.group) {
                            groups[i-1].push(team)
                        }
                    })
                }
            }else {
                let count = 1;
                let group = [];
                teams.forEach(team => {
                    group.push(team)
                    if (count % 4 == 0) {
                        groups.push(group)
                        group = [];
                    }
                    count++;
                });

                // Falls noch Teams in der letzten Gruppe übrig sind, aber es weniger als 3 sind
                if (group.length > 0) {
                    groups.push(group);
                }

                // Prüfen, ob die letzte Gruppe weniger als 3 Teams hat
                if (groups.length > 1 && groups[groups.length - 1].length < 3) {
                    const lastGroup = groups.pop(); // Letzte Gruppe entfernen

                    let groupIndex = 0; // Zum Rotieren der Teams in den bestehenden Gruppen
                    lastGroup.forEach(team => {
                        groups[groupIndex].push(team);
                        groupIndex = (groupIndex + 1) % groups.length; // Nächste Gruppe auswählen
                    });
                }
            }
            setGroups(groups);
        }catch (e) {
            console.log("An error occured: ", e)
        }
    }


    const GroupPhaseGroup = ({ group, index }) => {
        // Teams sortieren: Erst nach Wins, dann nach Tordifferenz
        const sortedGroup = [...group].sort((a, b) => {
            // 1. Nach Wins sortieren (absteigend)
            if (b.wins !== a.wins) return b.wins - a.wins;
    
            // 2. Falls Wins gleich sind, nach Tordifferenz sortieren
            const cupDiffA = parseInt(a.sum.split(":")[0]) - parseInt(a.sum.split(":")[1]);
            const cupDiffB = parseInt(b.sum.split(":")[0]) - parseInt(b.sum.split(":")[1]);
    
            return cupDiffB - cupDiffA; // Höhere Tordifferenz kommt weiter oben
        });
    
        return (
            <div className="flex flex-col lg:text-3xl gap-2 lg:gap-5 items-center justify-around h-3/4 w-11/12">
                <h1>Gruppe {index + 1}</h1>
                <div className="flex flex-row h-full gap-1 justify-around w-full">
                    {/* Teams */}
                    <div className="flex flex-col justify-start items-start text-[10px] w-6/12 h-full bg-black/60">
                        <h1 className="mb-1.5 text:xs lg:text-xl text-white">Teams</h1>
                        {sortedGroup.map((team, idx) => (
                            <div key={team.teamName} className="w-full h-full flex justify-left items-center">
                                <div className={`bg-black/60 ${idx == 0 ? 'text-green-500' : idx == 1 ? 'text-green-300' : 'text-red-500'}  flex flex-col justify-center h-full w-2/12 text-xs lg:text-xl items-center`}>
                                    {idx + 1}
                                </div>
                                <div className={`lg:text-xl text-white ${idx == 0 ? 'bg-linear-to-r from-lime-800 via-green-600 to-emerald-400' : idx == 1 ? 'bg-linear-to-r from-lime-700 via-green-600 to-emerald-300' : 'bg-linear-to-r from-rose-800 via-pink-700 to-red-300'} flex flex-col justify-center h-full w-10/12 text-xss rounded-r-xl items-center`}>
                                    {team.teamName}
                                </div>
                            </div>
                        ))}
                    </div>
    
                    {/* Spiele */}
                    <div className="flex flex-col justify-start items-center text-[10px] h-full w-2/12 bg-black/60">
                        <h3 className="mb-1.5  text:xs lg:text-xl text-white">Spiele</h3>
                        {sortedGroup.map((team) => (
                            <div key={team.teamName} className="h-full w-full flex justify-center items-center text-xs text-white lg:text-xl">
                                {team.games}
                            </div>
                        ))}
                    </div>
    
                    {/* Siege */}
                    <div className="flex flex-col justify-start items-center text-[10px] h-full w-2/12 bg-black/60">
                        <h3 className="mb-1.5  text:xs lg:text-xl text-white">Siege</h3>
                        {sortedGroup.map((team) => (
                            <div key={team.teamName} className="h-full w-full flex text-xs lg:text-xl text-white justify-center items-center">
                                {team.wins}
                            </div>
                        ))}
                    </div>
    
                    {/* Niederlagen */}
                    <div className="flex flex-col justify-start items-center text-[10px] h-full w-2/12 bg-black/60">
                        <h3 className="mb-1.5  text:xs lg:text-xl text-white">Niederlage</h3>
                        {sortedGroup.map((team) => (
                            <div key={team.teamName} className="h-full w-full flex text-xs lg:text-xl text-white justify-center items-center">
                                {team.defeats}
                            </div>
                        ))}
                    </div>
    
                    {/* Summe */}
                    <div className="flex flex-col justify-start items-center text-[10px] h-full w-2/12 bg-black/60">
                        <h3 className="mb-1.5 text:xs lg:text-xl text-white">Summe</h3>
                        {sortedGroup.map((team) => (
                            <div key={team.teamName} className="h-full w-full flex text-xs lg:text-xl  text-white justify-center items-center">
                                {team.sum}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const KOPhase = () => {
        return (
          <div className="flex flex-row justify-around bg-linear-to-t from-black/30 to-black/0 items-center h-[50vh] w-[100vw] relative">
            {/* Halbfinale */}
            <div className="flex flex-col justify-around items-center h-3/4 w-1/4">
              <h1 className="h-1/12 flex items-center justify-center bg-black/60 rounded-xl text-white w-full gap-4">Halb Finale</h1>
              <div className="flex flex-col justify-center items-center h-1/2 w-full gap-4">
                <div id="semi1" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-2/6 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 rounded-xl w-full">
                  Gewinner Gruppe 1
                </div>
                <div id="semi2" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-2/6 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 rounded-xl w-full">
                  2.er Gruppe 2
                </div>
              </div>
              <div className="flex flex-col justify-center items-center h-1/2  w-full gap-4">
                <div id="semi3" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-2/6 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 rounded-xl w-full">
                  Gewinner Gruppe 2
                </div>
                <div id="semi4" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-2/6 bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 rounded-xl w-full">
                  2.er Gruppe 1
                </div>
              </div>
            </div>
      
            {/* Finale */}
            <div className="flex flex-col justify-around items-center h-3/4 w-1/4">
              <h1 className="h-1/12 flex items-center justify-center bg-black/60 rounded-xl text-white w-full gap-4">Finale</h1>
              <div className="flex flex-col justify-around items-center h-11/12 w-full">
                <div id="final1" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-1/6 w-full bg-linear-to-r from-blue-500 via-teal-500 to-emerald-300 rounded-xl">
                  Tbd
                </div>
                <div id="final2" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-1/6 w-full bg-linear-to-r from-blue-500 via-teal-500 to-emerald-300 rounded-xl">
                  Tbd
                </div>
              </div>
            </div>
      
            {/* Gewinner */}
            <div className="flex flex-col justify-center h-3/4 w-1/4">
              <h1 className="h-1/12 flex items-center justify-center bg-black/60 rounded-xl text-white w-full gap-4">Gewinner</h1>
              <div className="flex flex-col justify-around items-center h-11/12 w-full">
                <div id="winner" className="flex p-2 text-xs lg:text-xl text-white justify-center items-center h-1/6 w-full bg-linear-to-r from-emerald-200 via-lime-400 to-green-600 rounded-xl">
                  Tbd
                </div>
              </div>
            </div>
      
            {/* Pfeile mit Xarrow */}
                  {/* Pfeile mit Xarrow */}
                <Xarrow
                    start="semi1"
                    end="final1"
                    strokeWidth={2}
                    color="black"
                />
                <Xarrow
                    start="semi2"
                    end="final1"
                    strokeWidth={2}
                    color="black"
                />
                <Xarrow
                    start="semi3"
                    end="final2"
                    strokeWidth={2}
                    color="black"
                />
                <Xarrow
                    start="semi4"
                    end="final2"
                    strokeWidth={2}
                    color="black"
                />
                <Xarrow
                    start="final1"
                    end="winner"
                    strokeWidth={2}
                    color="black"
                />
                <Xarrow
                    start="final2"
                    end="winner"
                    strokeWidth={2}
                    color="black"
                />
          </div>
        );
      };
    

    return (
        <>
        <Head>
            <title>Beerpong Tournament 2025</title>
        </Head>
       <div className="relative min-h-[100dvh] w-screen flex justify-center items-center">
             {/* Background Image */}
             <Image 
               src="/bg.jpeg" 
               alt="Background" 
               layout="fill"
               quality={100}
               style={{ objectFit: 'cover' }}
               className="-z-10"
             />
             {/*Gruppen Phase*/}
            <div className="flex flex-col items-center justify-top min-h-screen  text-white p-4">
                <h1 className="text-xl lg:text-2xl xl:text-3xl mt-5">Beerpong 2025 Gruppenphase</h1>
                <div className="flex flex-col lg:flex-row lg:gap-15 justify-around items-center h-[50vh] w-[100vw]">
                    {groups.map((group, index) => (
                        <GroupPhaseGroup key={index} group={group} index={index} />
                    ))}
                </div>
                <KOPhase/>
            </div>
            <button className="z-4 absolute bg-white/60 text-black pl-3 pr-3 pt-1 pb-1 rounded-lg top-2 left-2" onClick={handleReturn}>
                &lt;
            </button>
        </div>
        </>
    )
}  