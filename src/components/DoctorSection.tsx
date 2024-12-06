"use client"


import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

import { collection, doc, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import DetailSheet from "./DoctorDetailSheet";

interface DoctorInfo {
  docid: string;
  userinfo: {
    pic: string;
    userName: string;
  };
  gender: string;
  hospital: string;
  fees: string;
  appointmentTime: string;
  specialization: string;
  bio: string;
  status: string;
  number: string;
  address: string;
}

interface DoctorSectionProps {
  ishome: boolean;
}


export default function DoctorSection({ ishome }: any) {
 const [showDoctors,setShowDoctors] = useState<DocumentData>([]) 
 const [openDialog, setOpenDialog] = useState<boolean>(false);
 const [action, setAction] = useState<"accept" | "reject" | null>(null);

//  const handleActionClick = (action: "accept" | "reject", doctor: any) => {
//   setAction(action);
//   setOpenDialog(true); // Open the dialog
// };

const handleConfirmAction = async () => {
  
  setOpenDialog(false); // Close the dialog
};

const handleCloseDialog = () => {
  setOpenDialog(false); // Close the dialog without doing anything
};



useEffect(()=>{
  fetchData()
 

  
},[])

const fetchData = async()=>{

  const doctorRef = collection(db,"Request")
  let q = query(doctorRef,where("status","==","accepted"))
const querySnapshot = await getDocs(q)
const docSnap = querySnapshot.docs.map(async(request)=>{
        let reqData =    request.data()
        let userid = reqData.docid

        let docid = request.id
        
        let userRef = doc(db,"users2",userid)

        let userCreateinfo = await getDoc(userRef)


        let userObj = {
          ...reqData,
          userinfo: userCreateinfo.data(),
          docid

        }

        return userObj

 })


let alldoctorResolved = await Promise.all(docSnap)
setShowDoctors(alldoctorResolved)


      
       
  }


  const filtered = ishome ? showDoctors.slice(0, 6) : showDoctors
  return (

    <>

    
    
    <div className="container mx-auto my-20">


      <div className=" flex justify-between">
        <h1 className="text-3xl font-semibold ">Find Doctors</h1>

        {
          ishome ? <Link href={'/doctor'}><Button>See All</Button></Link>
            : ''
            
        }
 




      </div>



  

       {/* Doctor Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showDoctors.map((data: any) => (
          <Card key={data.docid}>
            <CardHeader className="flex gap-2 flex-row">
              <Avatar className="serif-center h-10 w-10">
                <AvatarImage src={data.userinfo.pic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{data.userinfo.userName}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <h1>Gender</h1>
                <h1>{data.gender}</h1>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <h1>Hospital</h1>
                </div>
                <h1>{data.hospital}</h1>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <h1>Fees</h1>
                </div>
                <h1>{data.fees}</h1>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <h1>Appointment Time</h1>
                </div>
                <h1>{data.appointmentTime}</h1>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              
           
                
                           <DetailSheet doctor={data} />
                 

           <Link href={`/doctor/${data.docid}`}><Button className="text-center w-full">Book Appointment</Button>
           </Link> 
            </CardFooter>

          </Card>
        ))}
     
      </div>
     

      {/* Confirmation Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
              Are you sure you want to {action} this doctor request?
            </h2>
            <div className="mt-4 flex justify-end gap-4">
              <Button onClick={handleCloseDialog} variant="outline" className="text-gray-600">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                className={`${action === "accept" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
              >
                Confirm {action === "accept" ? "Accept" : "Reject"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}





