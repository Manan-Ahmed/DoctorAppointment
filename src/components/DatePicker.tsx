




"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { auth, db } from "@/firebase/firebaseConfig"
import { useToast } from "@/hooks/use-toast"
import { title } from "process"
import { addDoc, collection } from "firebase/firestore"
import { useAuthContext } from "@/context/authcontext"

export function DatePickerWithPresets({doctorinfo,currentuser}:any) {
  
  const [date, setDate] = React.useState<any>(new Date())
const [target,setTarget] = React.useState()
const {toast} = useToast()
const showTime = async()=>{
  let isfuture = new Date() < new Date(date)
    if(!isfuture) return toast({title: "slect your future date"})
      console.log('date',date,doctorinfo,);
const obj = {date,doctorinfo,currentuser:[currentuser,doctorinfo.userinfo.uid],status:'pending'}
const appointmentRef = collection(db,"appointment")
const jobSnap = await addDoc(appointmentRef,obj)
console.log('appointment done succesfully',jobSnap);

toast({
  title: "Scheduled: Catch up",
  description: "appointment done succesfully",
})
}
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
      {
        currentuser ?
      
      <Button onClick={showTime}>Book your Appointment</Button> : <Button>logi your account</Button>
}
    </Popover>
  )
}
