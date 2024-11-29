"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { app } from "@/firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Signin(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
const route = useRouter()

    const login = ()=>{
        const auth = getAuth(app);
signInWithEmailAndPassword(auth, email, password)
  .then(() => {

    route.push('/')
  })
  .catch((error) => {
console.log(error);

  });

    }
    return(
        <>
            <div className="flex justify-center">
    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
        
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="enter tour email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="enter your password   " value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      <Link href={'/signup'} >Create new Account</Link>
        <Button onClick={login}>login</Button>
      </CardFooter>
    </Card>
    </div>
        </>
    )
}