// "use client"
// import {  db } from "@/firebase/firebaseConfig"
// import { doc, updateDoc } from "firebase/firestore"
// import {  useState } from "react"


// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import dayjs from "dayjs"

// import relativeTime from "dayjs/plugin/relativeTime"
// import { Calendar,  Clock, MapPin } from "lucide-react"
// dayjs.extend(relativeTime)

// export default function PattientAppointment({appointment}:any){
//     const [loading, setLoading] = useState(false);
//     const handleAccept = async () => {
//         const doctorinfo = doc(db, "appointment", appointment.id);

//       setLoading(true);
//       await updateDoc(doctorinfo,{status: 'accepted'});
//       console.log(appointment.id);
      
//       setLoading(false);
//     };
  
//     const handleReject = async () => {
//       setLoading(true);
//       const doctorinfo = doc(db, "appointment", appointment.id);

//       await updateDoc(doctorinfo,{status: 'rejected'});
//       console.log(appointment.id);
//     //   await updateAppointment(appointment._id, "cancelled");
//       setLoading(false);
//     };
// console.log(appointment.appointmentDate);

//     return(
//         <>
//        {
//         loading ? <h1>loading...</h1>

//         :
//         <Card key={appointment.docid}>
//         <CardHeader className="flex gap-2 flex-row">
//           <Avatar className="serif-center h-10 w-10">
//           <AvatarImage src={appointment.doctorinfo.userinfo.pic} />

//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <div>
//             <CardTitle>{appointment.doctorinfo.userinfo.userName}</CardTitle>
//             <CardTitle>{appointment.status}</CardTitle>
       
//           </div>
//         </CardHeader>
       
// <CardContent className="space-y-2">
// <p className="text-sm text-muted-foreground">
//   {appointment.doctorinfo.bio}
// </p>
// <div className="flex items-center gap-2 text-sm">
//   <Calendar className="h-4 w-4" />
//   <span>
//     {dayjs(new Date(appointment.appointmentDate)).fromNow() +
//       " " +
//       dayjs(new Date(appointment.appointmentDate)).format("dd DD MMMM")}
//   </span>
// </div>
// <div className="flex items-center gap-2 text-sm">
//   <Clock className="h-4 w-4" />
//   <span>{appointment.doctorinfo.appointmentTime}</span>
// </div>
// <div className="flex items-center gap-2 text-sm">
//   <MapPin className="h-4 w-4" />
//   <span>
//     {appointment.doctorinfo.hospital}
//   </span>
// </div>
// <p className="text-sm font-semibold">
//   Specialization: {appointment.doctorinfo.specialization}
// </p>
// <p className="text-sm font-semibold">
//   Fees: ${appointment.doctorinfo.fees}
// </p>
// </CardContent>
//         {/* <CardFooter className="flex flex-end">


// {
// }

//         {status === 'pending' &&
//   <>
//     <Button
//       size="sm"
//       onClick={() => handleAccept()}
//       className="flex items-center gap-2"
//     >
//       <CheckCircle className="h-4 w-4" />
//       Accept
//     </Button>
//     <Button
//     //   variant={"outline"}
//       size="sm"
//       onClick={() => handleReject()}
//       className="flex items-center gap-2"
//     >
//       <XCircle className="h-4 w-4" />
//       Reject
//     </Button>
//   </>

// }
             

//         </CardFooter> */}

//       </Card>
//        }
             
         
//         </>
//     )
// }



import React from "react";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardHeader, CardTitle, CardContent } from "./CardComponents"; // Adjust imports as needed
import { Calendar,  Clock, MapPin } from "lucide-react"

// Define types for the `doctorinfo` object inside the `appointment`
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

// Define types for the `appointment` object
interface Appointment {
  doctorinfo: DoctorInfo;
  status: string;
  appointmentDate: string;
}

// Define the props for the AppointmentCard component
interface AppointmentCardProps {
  appointment: Appointment;
}

// Define the AppointmentCard component
const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <Card key={appointment.doctorinfo.docid}>
      <CardHeader className="flex gap-2 flex-row">
        <Avatar className="serif-center h-10 w-10">
          <AvatarImage src={appointment.doctorinfo.userinfo.pic} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{appointment.doctorinfo.userinfo.userName}</CardTitle>
          <CardTitle>{appointment.status}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{appointment.doctorinfo.bio}</p>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>
            {dayjs(new Date(appointment.appointmentDate)).fromNow()}{" "}
            {dayjs(new Date(appointment.appointmentDate)).format("dd DD MMMM")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{appointment.doctorinfo.appointmentTime}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{appointment.doctorinfo.hospital}</span>
        </div>

        <p className="text-sm font-semibold">
          Specialization: {appointment.doctorinfo.specialization}
        </p>

        <p className="text-sm font-semibold">
          Fees: ${appointment.doctorinfo.fees}
        </p>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;


