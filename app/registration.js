import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Registration() {
    const [hideFirst, setHideFirst] = useState(false);
    const [hideSecond, setHideSecond] = useState(false);
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
      
      {/* First Button (slightly higher) */}
      <div className="absolute top-7/12 left-8/12 transform -translate-x-1/2 flex items-center justify-center">
        <motion.button 
            className="w-40 h-40 ml-8"
            whileHover={{ scale: 1.2 }} 
            transition={{ duration: 0.5 }}
            animate={hideFirst ? { x: "100vw", opacity: 0 } : hideFirst ? {opacity:0} : {}}
            onClick={() => setHideFirst(true)} 
        >
          <Image 
            src="/image.png" 
            alt="Button" 
            width={128} 
            height={128} 
            className="rounded-full hover:opacity-80 transition duration-300"
          />
          {/* Text inside the Image Button */}
          <div className="absolute inset-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-black text-[12px] font-bold">
            Tournament
            view
          </div>
        </motion.button>
      </div>

      {/* Second Button (top-left) */}
      <div className="absolute top-1/2 left-1/8 flex items-center justify-center">
        <motion.button 
            className="w-20 h-20 lg:w-40 lg:h-40 lg:ml-8"
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }} 
            whileTap={{scale:1.3}}
            animate={hideSecond ? { x: "100vw", opacity: 0 } : hideFirst ? {opacity:0} : {}}
            onClick={() => setHideSecond(true)} 
        >
          <Image 
            src="/image.png" 
            alt="Button" 
            width={128} 
            height={128} 
            className="rounded-full hover:opacity-80 transition duration-300"
          />
          {/* Text inside the Image Button */}
          <div className="absolute inset-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-black text-xs font-bold">
            Register
            Team
          </div>
        </motion.button>
      </div>
    </div>
  );
}
