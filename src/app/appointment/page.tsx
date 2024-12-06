"use client"
import { useAuthContext } from "@/context/authcontext"
import { auth, db } from "@/firebase/firebaseConfig"
import { collection, DocumentData,  getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"


import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"
import DoctorAppointment from "@/components/Doctorapointment/doctorappointment"
import PattientAppointment from "@/components/Doctorapointment/pattientppointment"
import { currentUser } from "@/lib/data"
dayjs.extend(relativeTime)



interface DoctorInfo {
  docid: string;
  userinfo: {
    pic: string;
    userName: string;
  };
  bio: string;
  specialization: string;
  fees: number;
  hospital: string;
  appointmentTime: string;
}

interface Appointment {
  doctorinfo: DoctorInfo;
  status: string;
  appointmentDate: string;
  date: string;
}

// Define props type for the Card component
interface AppointmentCardProps {
  appointment: Appointment;
  status: string;
  handleAccept: () => void;
  handleReject: () => void;
}


export default function Appointment(){
const [doctorData,setDoctorData] = useState<DocumentData>([])
const [userData,setUserData] = useState<DocumentData>([])

const [loading,setLoading] = useState(true)
const {user} = useAuthContext()!

const currentUser = auth.currentUser?.uid

useEffect(()=>{
  if(currentUser){
    fetchDoctorData()
    setLoading(false)
  }
  
  
},[user])
   
    

const fetchDoctorData = async()=>{
  const docRef = collection(db,"appointment")
  const q = query(docRef,where('currentuser','==',currentUser))
  const doctorquery = query(docRef,where('doctorid','==',currentUser))

     const querySnapshot =  await getDocs(q) 
      const userRef  = querySnapshot.docs.map((users)=>(
          users.data()
          
      ))
setUserData(userRef)


const doctorquerySnapshot =  await getDocs(doctorquery) 
const doctorRef  = doctorquerySnapshot.docs.map((doc)=>(
    doc.data()
    
))
setDoctorData(doctorRef)
        
}



    return(
        <>
   
   
        <div className="container mx-auto">
            <h1 className="text-4xl text-center font-bold m-4">Appointment</h1>

           
        </div>


        {loading ? <h1 className="text-center text-3xl flex justify-center">loading...</h1> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

 

            

  {
    doctorData.map((appointment:any)=>
      <DoctorAppointment key={appointment.doctorinfo.docid} appointment={appointment}   />

      
)
}


{

  userData.map((appointment:any)=>
         <PattientAppointment key={appointment.doctorinfo.docid} appointment={appointment}/>              

  )

 }




           





        </div>
}
        </>
    )
}







//     const fetchUser = async (uid:string)=>{
//     //     const doctorRef = collection(db,"appointment")
//     //     const q = query(doctorRef,where("currentuser","==",uid))
    
//     //     const querySnapshot =await getDocs(q)
        
//     //    const userinfo =   querySnapshot.docs.map(async(doc)=>{
//     //     console.log(doc.data());
//     //     const docid = doc.data().useruid

//     //     console.log('docid',docid);
        
//         const userRef = collection(db,"Request")

//         const user = query(userRef,where('docid','==',uid))
//         console.log('user',user);
// try{
//     const usersnap = await getDocs(user)
//     console.log('user',usersnap);
//     let allJobs = usersnap.docs.map((doc) => {
//         // let obj = doc.data();
//         // obj.id = doc.id;
//         // return obj;
//         console.log(doc);
        
//       });
// }catch(e){
//     console.log(e);
    
// }
       
        
  
        
        
//     //    })

       
        
//     }





    // const doctor =   docSnap.docs.map((doc)=> ({
    //       ...doc.data(),
    //       // appointmentid:doc.id
    // }))
    // console.log('doctor===>',doctor);
    // setAppointments(doctor)
    
    // }