'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const [registration, setRegistration] = useState(false);
  const [tournament, setTournament] = useState(false);
  const router = useRouter();
  const [cookieSet, cookieSetter] = useState(false);
  const [names, setNames] = useState([]); // Array to store possible names
  const [selectedName, setSelectedName] = useState(""); // State for the selected name

  useEffect(() => {
    if (registration) {
      console.log("to register")
      router.push("/register"); // Navigate to the register page
    } else if (tournament) {
      console.log("to tournament site")
      router.push("/tournament"); // Navigate to the tournament page
    }
  }, [registration, tournament]);

  useEffect(() => {
    console.log(Cookies.get("teamName"));
    console.log(Cookies.get("name"))
    setSelectedName(Cookies.get("name"))
    if (Cookies.get("teamName")) {
      cookieSetter(true);
    }
  }, [cookieSet]);

  // Fetch possible names when the component mounts
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch("https://depthofheritage.online/api/beerPong/possibleNames");
        const data = await response.json();
        setNames(data); // Set the fetched names
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
  
    fetchNames();


  }, []);

  useEffect(() => {
    const fetchTeamName = async () => {
      try {
        if (!selectedName) return;
        const response = await fetch(`https://depthofheritage.online/api/beerPong/getTeam/${selectedName}`);
        const data = await response.json();
        if (data) {
          Cookies.set("teamName", data.teamName, {expires: 365})
          cookieSetter(true)
        }

      }catch (e) {
        console.log(e)
      }
    }


    if (!cookieSet) fetchTeamName();
  }, [selectedName])

  // Handle the name selection
  const handleNameSelect = (event) => {
    setSelectedName(event.target.value);
    Cookies.set("name", event.target.value,  { expires: 365 }); // Save the selected name in a cookie
    fetch(`https://depthofheritage.online/api/beerPong/possibleName/${event.target.value}`, {
      method: "DELETE"
    });
  };

  const handleLogOut = () => {
    Cookies.remove("name");
    fetch(`https://depthofheritage.online/api/beerPong/possibleName/${selectedName}`, {
      method: "PUT"
    });
    setSelectedName("");
  }

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <Image 
        src="/bg.jpeg" 
        alt="Background" 
        layout="fill"
        quality={100}
        style={{ objectFit: 'cover' }}
      />
      
      {/* Name Selection Dropdown */}
      {!selectedName && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4 flex flex-col items-center justify-center bg-black opacity-70 p-4 rounded-2xl">
          <h2 className="text-xl text-white mb-4">Please select your name:</h2>
          <select 
            value={selectedName} 
            onChange={handleNameSelect}
            className="p-2 rounded bg-white text-black"
          >
            <option value="">Select a Name</option>
            {names.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
      )}

      {/* First Button (slightly higher) */}
      <div className="absolute top-1/2 left-1/8 transform flex items-center justify-center">
        <motion.button 
            className="w-20 h-20 lg:w-40 lg:h-40 lg:pl-4"
            whileHover={!cookieSet ? { scale: 1.2 } : {}} 
            transition={{ duration: 0.5 }}
            animate={registration ? { x: "100vw", opacity: 0 } : tournament ? {opacity:0} : cookieSet ? {opacity:30} : {}}
            onClick={!cookieSet ? () => setRegistration(true) : () => setRegistration(false)} 
        >
          <Image 
            src="/image.png" 
            alt="Button" 
            width={128} 
            height={128} 
            className={`rounded-full ${cookieSet ? "opacity-70" : "hover:opacity-80"} transition duration-300`}
          />
          {/* Text inside the Image Button */}
          <div className="absolute inset-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-black text-[12px] sm:text-[12px] lg:text-[20px] font-bold">
            Register Team
          </div>
        </motion.button>
      </div>
      { selectedName ? 
      <div className="bg-red-600/70 p-4 rounded-2xl text-white absolute bottom-2 right-4">
        <motion.button
        whileHover={{scale:1.2}}
        whileTap={{scale:1.1}}
        onClick={handleLogOut}
        >Log out {Cookies.get("name")}</motion.button>
      </div>  
    : <></>}
      { cookieSet ? 
      <div className="position: absolute top-2 right-3 bg-black opacity-60 p-4 rounded-2xl">
        <h2 className="text-2xl">Your Team: {Cookies.get("teamName")}</h2>
      </div>
      : <></>
      }

      {/* Second Button (top-left) */}
      <div className="absolute top-7/12 left-8/12 flex items-center justify-center -translate-x-1/2">
        <motion.button 
            className="w-40 h-40 pl-4"
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }} 
            whileTap={{scale:1.3}}
            animate={tournament ? { x: "100vw", opacity: 0 } : registration ? {opacity:0} : {}}
            onClick={() => setTournament(true)} 
        >
          <Image 
            src="/image.png" 
            alt="Button" 
            width={128} 
            height={128} 
            className="rounded-full hover:opacity-80 transition duration-300"
          />
          {/* Text inside the Image Button */}
          <div className="absolute inset-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-black text-[14px] font-bold">
            Tournament View
          </div>
        </motion.button>
      </div>
    </div>
  );
}
