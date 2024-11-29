"use client"

import { useAuthContext } from "@/context/authcontext";
import {  db } from "@/firebase/firebaseConfig";
import { collection, DocumentData, getDocs,doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import RequestDoctorCard from "@/components/RequestSection";


export default function Request(){
const [request,setRequest] = useState<DocumentData[]>([])

    useEffect(()=>{
        fetchData()
       

        
    },[])

    const fetchData = async()=>{
      const querySnapshot = await getDocs(collection(db,"Request"))
      const docSnap = querySnapshot.docs.map(async(request)=>{
              const reqData =    request.data()
              const userid = reqData.docid
console.log('userid',userid);

const docid = request.id
              
const userRef = doc(db,"users2",userid)

const userCreateinfo = await getDoc(userRef)

              console.log('user',userCreateinfo.data())

              const userObj = {
                ...reqData,
                userinfo: userCreateinfo.data(),
                docid

              }
              return userObj
       })


       const alldoctorResolved = await Promise.all(docSnap)
console.log(alldoctorResolved);
setRequest(alldoctorResolved)


     
            
             
        }



      

    
    return(
        <>
        <div className="container mx-auto">
            <h1 className="text-2xl">Doctor Request</h1>
        </div>


<RequestDoctorCard request={request}/>

       






        </>
    
        )

      }

