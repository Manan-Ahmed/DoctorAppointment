"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db, storage } from "@/firebase/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"; 
import Link from "next/link"
import { useRouter } from "next/navigation"
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function CardWithForm() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userName,setUserName] = useState('')
  const [pic,setPic] = useState<File>()
  const [role,setRole] = useState('user')
const route = useRouter()

  const signup = async (email: string, password: string,pic:string ) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
     
      const userData = userCredential.user;
      let users = {      email,uid:userData.uid,role,pic,userName
      }
      console.log('user succesful login',userData,role);
      saveUserinDB(users)

    } catch (e) {
      console.error(e);
    }
  };




  const saveUserinDB = async(users:any)=>{
    let docRef = doc(db,'users2',users.uid)
         await setDoc(docRef,users)
  
    
  }
    const uploadFile = ()=>{

const storageRef = ref(storage, 'images/rivers.jpg');

const uploadTask = uploadBytesResumable(storageRef, pic!);


uploadTask.on('state_changed', 
  // (snapshot) => {
   
  
  // }, 
  // (error) => {
  // }, 
  () => {
 
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      signup(email,password,downloadURL)
      route.push('/')
    });
  }
);
    }


  return (
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={(e)=>{let files = e.target.files

         if(files?.length){
          setPic(files[0])
         }
      }}/>
    </div>
    <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="enter tour email" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
            </div>
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
      <Link href={'/signin'} >Already have an Account login here</Link>
        <Button onClick={uploadFile}>Signup</Button>
      </CardFooter>
    </Card>
    </div>
    </>
  )
}
