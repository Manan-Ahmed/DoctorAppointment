


"use client"
import { db } from "@/firebase/firebaseConfig"
import { doc, updateDoc} from "firebase/firestore"
import {  useState } from "react"


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"
import { Button } from "../ui/button"
import {  Calendar, CheckCircle, Clock, MapPin, XCircle } from "lucide-react"
dayjs.extend(relativeTime)



export default function DoctorAppointment({appointment,status}:any){

  console.log('appointment',appointment.doctorinfo);
  
    const [loading, setLoading] = useState(false);
    const handleAccept = async () => {
        const doctorinfo = doc(db, "appointment", appointment.id);

      setLoading(true);
      await updateDoc(doctorinfo,{status: 'accepted'});
      console.log(appointment.id);
      
    };
  
    const handleReject = async () => {
      setLoading(true);
      const doctorinfo = doc(db, "appointment", appointment.id);

      await updateDoc(doctorinfo,{status: 'rejected'});
      console.log(appointment.id);
      setLoading(false);
    };

    return(
        <>
       
       {
        loading ? <h1>loading...</h1>

        :
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
<p className="text-sm text-muted-foreground">
  {appointment.doctorinfo.bio}
</p>
<div className="flex items-center gap-2 text-sm">
  <Calendar className="h-4 w-4" />
  <span>
    {dayjs(new Date(appointment.appointmentDate)).fromNow() +
      " " +
      dayjs(new Date(appointment.date)).format("dd DD MMMM")}
  </span>
</div>
<div className="flex items-center gap-2 text-sm">
  <Clock className="h-4 w-4" />
  <span>{appointment.doctorinfo.appointmentTime}</span>
</div>
<div className="flex items-center gap-2 text-sm">
  <MapPin className="h-4 w-4" />
  <span>
    {appointment.doctorinfo.hospital}
  </span>
</div>
<p className="text-sm font-semibold">
  Specialization: {appointment.doctorinfo.specialization}
</p>
<p className="text-sm font-semibold">
  Fees: ${appointment.doctorinfo.fees}
</p>
</CardContent>
       

<CardFooter className="flex flex-end">


{
}

        {status === 'pending' &&
  <>
    <Button
      size="sm"
      onClick={() => handleAccept()}
      className="flex items-center gap-2"
    >
      <CheckCircle className="h-4 w-4" />
      Accept
    </Button>
    <Button
    //   variant={"outline"}
      size="sm"
      onClick={() => handleReject()}
      className="flex items-center gap-2"
    >
      <XCircle className="h-4 w-4" />
      Reject
    </Button>
  </>

}
             

        </CardFooter> 
      </Card>
       }
            
         
        </>
    )
}

