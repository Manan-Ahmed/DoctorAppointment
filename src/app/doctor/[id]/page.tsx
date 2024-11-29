"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  HomeIcon,
  ClockIcon,
  PlusIcon,
  UserIcon as GenderMaleIcon,
  GraduationCapIcon,
  StethoscopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "lucide-react";
import { DatePickerWithPresets } from '@/components/DatePicker';
export default function MyComponent({ params }:any) {
  const [unwrappedParams, setUnwrappedParams] = useState(null);
const [doctorDetail,setDoctorDetail] = useState<DocumentData>([])
  useEffect(() => {
    const fetchParams = async () => {
      const result = await params;
      setUnwrappedParams(result);
      console.log(result.id)
          const docRef = doc(db,"Request",result.id)
    const docSnap = await getDoc(docRef)

const data = docSnap.data()

console.log();
const uid = data?.docid
const userRef = doc(db,'users2',uid)

const userSnap = await getDoc(userRef)
console.log('userSnap',userSnap.data());

const obj = {
  ...data,
  userinfo: userSnap.data(),
  docid: docSnap.id,
  doctorid:uid
}
console.log('obj===>',obj);
setDoctorDetail([obj])
 
};
    fetchParams();
  }, [params]);

  if (!unwrappedParams) {
    return <div>Loading...</div>;
  }



const currentuser = auth.currentUser?.uid

  return (
 <>
 
 
 

 <div className="min-h-screen bg-background">
      <div className="container py-10 mx-auto">
{
  doctorDetail && doctorDetail.map((doctorInfo:any)=>{
    console.log('doctorDetail',doctorInfo.userinfo.uid)
return(
    <Card className="w-full max-w-4xl mx-auto" key={doctorInfo.docid}>
    <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage
          src={doctorInfo.userinfo.profilePic}
          alt={`${doctorInfo.userinfo.userName}`}
        />
        <AvatarFallback>
          {doctorInfo.userinfo.userName}
        </AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <CardTitle className="text-3xl font-bold">{`Dr. ${
doctorInfo.userinfo.userName
        }`}</CardTitle>
        <p className="text-muted-foreground">
          {doctorInfo.specialization} Specialist
        </p>
      </div>
    </CardHeader>
    <CardContent className="grid gap-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className='flex gap-2'>
       {<GraduationCapIcon />}
          {doctorInfo.degree}
        </div>
        
        <div className='flex gap-2'>
       {<StethoscopeIcon />}
          {doctorInfo.experience}
        </div>
   
        <div className='flex gap-2'>
       {<GenderMaleIcon />}
       
          {doctorInfo.gender}
        </div>
        <div className='flex gap-2'>
       {<PlusIcon />}
        
          {doctorInfo.hospital}
        </div>
        <div className='flex gap-2'>
       {<ClockIcon />}
        
          {doctorInfo.appointmentTime}
        </div>
        <div className='flex gap-2'>
       {<HomeIcon />}
      
          {doctorInfo.fees}
        </div>
        <div className='flex gap-2'>
       {<PhoneIcon />}
          {doctorInfo.number}
        </div>
        <div className='flex gap-2'>
       {<MapPinIcon />}
          {doctorInfo.address}
        </div>
      
      </div>
      <div>
        <h3 className="font-semibold mb-2">Bio</h3>
        <p className="text-muted-foreground">{doctorInfo.bio}</p>
      </div>
      <div className="space-y-4">
        Pick your appointment date
      </div>
      <DatePickerWithPresets doctorinfo={doctorInfo}  currentuser={currentuser}  />
    
    </CardContent>
  </Card>
)
  })
  
  
 }
        
     
      </div>
    </div>
 </>
  );
}




// "use client"
// // import { DatePicker } from "@/components/DatePicker"
// // import { DatePicker } from "@/components/DatePicker"
// // import { DatePicker } from "@/components/DatePicker"
// import { Button } from "@/components/ui/button"
// import { db } from "@/firebase/firebaseConfig"
// import { doctor } from "@/lib/data"
// import { collection, doc, getDoc } from "firebase/firestore"
// import { useEffect } from "react"



// export default function DoctorDeatil({params}:any){
// console.log('id==>',params.id);


//     useEffect(()=>{
//       fetchUser()
//     },[])
//     const fetchUser = async()=>{
//       const docRef = doc(db,"Request",params.id)
//       const docSnap = await getDoc(docRef)

//       console.log('docRef==>',docSnap);
      
//     }
    
//     return(
//         <>
//         <div className="min-h-screen">

  

//         </div>
//         </>
//     )
// }