

"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {  auth, db } from "@/firebase/firebaseConfig";
import { addDoc, collection, doc, updateDoc} from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authcontext";


const formSchema = z.object({
  bio: z.string().min(2).max(120),
  hospital: z.string().min(2).max(50),
  fees: z.string(),
  gender: z.string(),
  appointmentTime: z.string(),
  degree: z.string(),
  specialization: z.string(),
  experience: z.string(),
  number: z.string().regex(/^\d+$/, "Enter a valid phone number"),
  address: z.string().min(5),
});


type DoctorFormValues = {
  bio: string;
  hospital: string;
  fees: string;
  gender: string;
  appointmentTime: string;
  degree: string;
  specialization: string;
  experience: string;
  number: string;
  address: string;
  docid?:string,
  status?:string
};

export default function DoctorForm() {
  const route = useRouter()
  const {user} = useAuthContext()!
  
  console.log('uid',user?.uid);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      hospital: "",
      fees: "",
      gender: "",
      appointmentTime: "",
      degree: "",
      specialization: "",
      experience: "",
      number: "",
      address: "",
      
    },

  });

  

  async function onSubmit(values:DoctorFormValues) {
    console.log("values=>", values);
    values.docid = auth.currentUser?.uid
    values.status = 'pending'
    saveDoctorinfo(values,values.docid as string)
    route.push('/')
  }

  const saveDoctorinfo = async(doctorinfo:DoctorFormValues,docid:string)=>{

    const washingtonRef = doc(db, "users2", docid);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      role: 'doctor'
    });


  try {
    const docRef = await addDoc(collection(db, "Request"), {
    bio:doctorinfo.bio,
    hospital:doctorinfo.hospital,
    fees:doctorinfo.fees,
    gender:doctorinfo.gender,
    appointmentTime:doctorinfo.appointmentTime,
    degree:doctorinfo.degree,
    specialization:doctorinfo.specialization,
    experience:doctorinfo.experience,
    number:doctorinfo.number,
    address:doctorinfo.address,
    docid:doctorinfo.docid,
    status:doctorinfo.status
    });


    console.log("Document written with ID: ", docRef.id);
  
  } 
  
  catch (e) {
    console.error("Error adding document: ", e);
  }

   
      }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 m-2 lg:grid-cols-2 gap-5">
          <FormField
            name="hospital"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital</FormLabel>
                <FormControl>
                  <Input placeholder="Enter hospital name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            name="fees"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fees</FormLabel>
                <FormControl>
                  <Input placeholder="Enter fees" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Enter gender" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="appointmentTime"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="degree"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Enter degree" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="specialization"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input placeholder="Enter specialization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="experience"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input placeholder="Enter years of experience" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="number"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {form.formState.isSubmitting ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}


