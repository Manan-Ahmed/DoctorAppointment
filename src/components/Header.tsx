"use client"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "./ui/button"

import { app } from "@/firebase/firebaseConfig";
import { useAuthContext } from "@/context/authcontext"
import { getAuth, signOut } from "firebase/auth"


export default function Header(){
  const {user} = useAuthContext()!


 const logout = ()=>{
  const auth = getAuth(app);
  signOut(auth).then(() => {
    console.log('logout');
    
  }).catch((error) => {
    console.log(error);

  });
 }

//  console.log(user);
 
 
  return(
        <>
        <div className="bg-secondary p-3">
        <div className="flex container mx-auto justify-between ">
             <h1 className="text-xl font-mono font-bold">LOGO</h1>


{
   user ? <Menubar className={'border-none bg-transparent'}>
   <MenubarMenu >
     <MenubarTrigger>
     <Avatar>
   <AvatarImage src={user.pic} />
   <AvatarFallback>CN</AvatarFallback>
 </Avatar>
 
     </MenubarTrigger>
     <MenubarContent>
       
     <Link href={'/profile'}> <MenubarItem>Profile</MenubarItem></Link> 
       <MenubarSeparator />
    
       <Link href={'/appointment'}>    <MenubarItem>My Appointment</MenubarItem></Link> 
       <MenubarSeparator />
    
    <MenubarItem onClick={logout}>Logout</MenubarItem>
     </MenubarContent>
   </MenubarMenu>
 </Menubar> 
 :    
 <Link href={'/signin'}>
 <Button  variant="outline" >login</Button>
 </Link>
 
}
 


              
            
          
</div>
        </div>
        </>
    )
}