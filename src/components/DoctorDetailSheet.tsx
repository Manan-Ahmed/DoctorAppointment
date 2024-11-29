// import { Briefcase, Clock, EyeIcon, GraduationCap, MapPin, Phone, Stethoscope } from "lucide-react";
// import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "./ui/button";

// // Define TypeScript interface for doctor props
// interface DoctorInfo {
//   specialization: string;
//   degree: string;
//   experience: string;
//   hospital: string;
//   address: string;
//   number: string;
//   appointmentTime: string;
//   fees: string;
//   status: string;
// }



// export default function DetailSheet({ doctor }: any) {

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
      
//         <Button
//               size="icon"
//               variant="outline"
//               className="bg-blue-50 hover:bg-blue-100 text-blue-600"
//             >
//               <EyeIcon className="h-4 w-4" />
//               <span className="sr-only">View doctor details</span>
//             </Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Doctor Details</SheetTitle>
//           <SheetDescription>
//             <div className="flex flex-col items-center gap-4 mt-4">
//               <Avatar className="h-24 w-24">
//                 <AvatarImage
//                   src={doctor.userinfo.pic} // Fallback image if picture is null
//                 />
//                 <AvatarFallback>
                    
//                 </AvatarFallback>
//               </Avatar>
//               <h1 className="font-bold text-2xl text-center">
//               {doctor.userinfo.userName}

//               </h1>
//             </div>
//           </SheetDescription>
//         </SheetHeader>
//         <div className="mt-6 space-y-4">
//           <div className="flex items-center gap-2">
//             <Stethoscope className="h-3 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Specialization:</span> {doctor.specialization}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <GraduationCap className="h-5 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Degree:</span> {doctor.degree}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Briefcase className="h-5 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Experience:</span> {doctor.experience}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="h-5 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Hospital:</span> {doctor.hospital}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="h-5 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Address:</span> {doctor.address}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Phone className="h-5 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Contact:</span> {doctor.number}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock className="h-5 w-5 text-gray-500" />
//             <p>
//               <span className="font-semibold">Appointment Time:</span> {doctor.appointmentTime}
//             </p>
//           </div>
//           <div>
//             <p className="font-semibold">Bio:</p>
//             <p className="mt-1">{doctor.bio}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <p>
//               <span className="font-semibold">Fees:</span> ${doctor.fees}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <p>
//               <span className="font-semibold">Status:</span> <span className="capitalize">{doctor.status}</span>
//             </p>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }





import React from "react";
// import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./SheetComponents"; // Adjust imports as needed
// import { Avatar, AvatarImage, AvatarFallback } from "./AvatarComponents"; // Adjust imports as needed
// import { Button } from "./ButtonComponents"; // Adjust imports as needed
// import { EyeIcon, Stethoscope, GraduationCap, Briefcase, MapPin, Phone, Clock } from "react-icons"; // Adjust imports for icons as needed


import { Briefcase, Clock, EyeIcon, GraduationCap, MapPin, Phone, Stethoscope } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";


// Define types for the doctor object
interface DoctorInfo {
  userinfo: {
    pic: string;
    userName: string;
  };
  specialization: string;
  degree: string;
  experience: string;
  hospital: string;
  address: string;
  number: string;
  appointmentTime: string;
  bio: string;
  fees: number;
  status: string;
}

// Define props for the DoctorDetailSheet component
interface DoctorDetailSheetProps {
  doctor: DoctorInfo;
}

// Define the DoctorDetailSheet component
const DoctorDetailSheet: React.FC<DoctorDetailSheetProps> = ({ doctor }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="bg-blue-50 hover:bg-blue-100 text-blue-600"
        >
          <EyeIcon className="h-4 w-4" />
          <span className="sr-only">View doctor details</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Doctor Details</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col items-center gap-4 mt-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={doctor.userinfo.pic} />
                <AvatarFallback />
              </Avatar>
              <h1 className="font-bold text-2xl text-center">
                {doctor.userinfo.userName}
              </h1>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-3 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Specialization:</span> {doctor.specialization}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Degree:</span> {doctor.degree}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Experience:</span> {doctor.experience}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Hospital:</span> {doctor.hospital}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Address:</span> {doctor.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Contact:</span> {doctor.number}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <p>
              <span className="font-semibold">Appointment Time:</span> {doctor.appointmentTime}
            </p>
          </div>

          <div>
            <p className="font-semibold">Bio:</p>
            <p className="mt-1">{doctor.bio}</p>
          </div>

          <div className="flex items-center gap-2">
            <p>
              <span className="font-semibold">Fees:</span> ${doctor.fees}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p>
              <span className="font-semibold">Status:</span> <span className="capitalize">{doctor.status}</span>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorDetailSheet;
