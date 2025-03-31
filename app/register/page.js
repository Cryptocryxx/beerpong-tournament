'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function RegisterPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [player1, setPlayer1] = useState(Cookies.get("name"));
  const [player2, setPlayer2] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [possibleNames, setPossibleNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://87.106.90.201/api/beerPong/possibleTeamMembers");
        const possibleNames = await response.json();
        setPossibleNames(possibleNames);
        }catch (e) {
          console.error(e)
        }
    }
    fetchData()
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const teamData = { teamName, player1, player2 };

    try {
      const response = await fetch("http://87.106.90.201/api/beerPong/addTeam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) throw new Error("Failed to submit team");
      const data = await response.json();
      console.log("Success:", data);

      const deletePlayer1 = await fetch(`http://87.106.90.201/api/beerPong/possibleTeamMember/${player1}`, {
        method: "DELETE",
      });
      const deletePlayer2 = await fetch(`http://87.106.90.201/api/beerPong/possibleTeamMember/${player2}`, {
        method: "DELETE",
      });
      
      Cookies.set("teamName", teamName, { expires: 365 });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  const handleReturn = () => {
    router.push("/");
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <Image src="/bg.jpeg" alt="Background" layout="fill" quality={100} style={{ objectFit: 'cover' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-black/80 p-6 rounded-2xl shadow-lg max-w-96 w-3/4"
      >
        <h2 className="text-xl font-bold text-center mb-4">Register Your Team</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-left space-y-4">
          <input 
            type="text" 
            placeholder="Team Name" 
            className="p-2 border rounded-lg"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <select 
            className="p-2 border rounded-lg" 
            value={player1} 
            onChange={(e) => setPlayer1(e.target.value)}
            required
          >
            <option value="">Choose yourself</option>
            {possibleNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <select 
            className="p-2 border rounded-lg" 
            value={player2} 
            onChange={(e) => setPlayer2(e.target.value)}
          >
            <option value="">choose teammate (optional)</option>
            {possibleNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          <div className="flex justify-center">
            <motion.button 
              type="submit" 
              className="bg-teal-500 text-white p-2 w-1/4 rounded-lg hover:bg-teal-600 transition"
              whileHover={{scale:1.2}}
              initial={{ borderRadius: "8px" }}
              animate={isSubmitting ? { borderRadius: "50%", width: [50, 50, 50], height: [50, 50, 50], x: [0, 0, 300], y: [0, 0, -800], opacity: [100,100,0], backgroundColor: "white" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {!isSubmitting && "Submit"}
            </motion.button>
          </div>
        </form>
      </motion.div>
      <button 
        className="z-4 absolute bg-white/60 text-black pl-3 pr-3 pt-1 pb-1 rounded-lg top-2 left-2" 
        onClick={handleReturn}
      >
        &lt;
      </button>
    </div>
  );
}