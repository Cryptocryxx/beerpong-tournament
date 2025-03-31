'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import Head from "next/head";
export default function TournamentPage() {
    const router = useRouter();

    const handleReturn = () => {
        router.push("/")
    }

    return (
        <>
        <Head>
            <title>Beerpong Tournament 2025</title>
        </Head>
       <div className="relative h-screen w-screen flex justify-center items-center">
             {/* Background Image */}
             <Image 
               src="/bg.jpeg" 
               alt="Background" 
               layout="fill"
               quality={100}
               style={{ objectFit: 'cover' }}
             />
             <div className="z-1 bg-black/60 p-12 rounded-3xl text-2xl text-white">
                <h1>Just registration for now</h1>
             </div>
            <button className="z-4 absolute bg-white/60 text-black pl-3 pr-3 pt-1 pb-1 rounded-lg top-2 left-2" onClick={handleReturn}>
                &lt;
            </button>
        </div>
        </>
    )
}