import Link from "next/link";
import { Button } from "./ui/button";


export default function HeroSection(){
    return(
        <>
        <section className="text-gray-600 my-10 body-font">
  <div className="container mx-auto flex  md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-3/4  md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="font-semibold sm:text-2xl text-3xl mb-4  text-gray-900">
       Doctor Appoitment System
        <br className="hidden lg:inline-block" />
       By Batch 11
      </h1>
      <p className="mb-8 leading-relaxed">
        Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
        plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk
        tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard
        chambray.
      </p>
      <div className="flex gap-4 justify-center ">
        <Button variant="outline"> Find Doctor you need</Button>
        <Link href={'/doctor/apply'}>
        <Button> Apply Doctor</Button>  
        </Link>
      

     
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img
        className="object-cover object-center rounded"
        alt="hero"
        src="https://images.unsplash.com/photo-1605684954998-685c79d6a018?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </div>
</section>

        
        </>
    )
}