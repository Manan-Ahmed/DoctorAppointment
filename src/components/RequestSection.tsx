// "use client"



// import React, { useState, useEffect } from "react";
// import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { XIcon, CheckIcon, EyeIcon } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Assuming you have a Button component
// import DetailSheet from "./DoctorDetailSheet"; // Assuming your DetailSheet component is in the same directory
// import { db } from "@/firebase/firebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
// // import { TabsTrigger } from "@radix-ui/react-tabs";
// import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
// import { useSearchParams,usePathname, useRouter } from "next/navigation";
// import DoctorCard from "./DoctorCard";

// export default function RequestDoctorCard({ request }: any) {
//   const [openDialog, setOpenDialog] = useState<boolean>(false);
//   const [action, setAction] = useState<"accept" | "reject" | null>(null);
//   const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
//   const [filteredRequests, setFilteredRequests] = useState<any>(request); // Store filtered requests
//   const [filterStatus, setFilterStatus] = useState<"all" | "accept" | "reject" | "pending">("all");
 

//   // Filter requests based on the selected status
//   useEffect(() => {
//     if (filterStatus === "all") {
//       setFilteredRequests(request);
//     } else {
//       setFilteredRequests(request.filter((data: any) => data.status === filterStatus));
//     }
//     renderRequestCard(filteredRequests)
//   }, [filterStatus, request]); // Re-filter when filterStatus or request changes


//   const handleActionClick = (action: "accept" | "reject", doctor: any) => {
//     setAction(action);
//     setSelectedDoctor(doctor);
//     setOpenDialog(true); // Open the dialog
//   };

//   const handleConfirmAction = async () => {
//     if (action && selectedDoctor) {
//       const doctorinfo = doc(db, "Request", selectedDoctor.docid);

//       if (action === "accept") {
//         console.log(`Accepted doctor request for ${selectedDoctor.docid}`);
//         await updateDoc(doctorinfo, { status: "accepted" });
//       } else if (action === "reject") {
//         console.log(`Rejected doctor request for ${selectedDoctor.docid}`);
//         await updateDoc(doctorinfo, { status: "rejected" });
//       }
//     }
//     setOpenDialog(false); // Close the dialog
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false); // Close the dialog without doing anything
//   };


//   const renderRequestCard = (request:any)=>{
//     <DoctorCard 
//     data={request}
//     isAdmin={true}
//     onAccept={()=>{handleActionClick("accept",request.id)}}
//     onReject={()=>{handleActionClick("accept",request.id)}}


//     />
//   }
//   return (
//     <div className="w-full">


// <div className="grid w-full mx-auto md:w-1/2 grid-cols-4">
// <div
//                  className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
//                   filterStatus == "all" && "bg-primary text-center text-white"
//                 }`}
//           onClick={() => setFilterStatus("all")}
//         >
//           All
//         </div>
//         <div
//           className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
//             filterStatus == "pending" && "bg-primary text-center text-white"
//           }`}
//           onClick={() => setFilterStatus("pending")}
//         >
//           Pending
//         </div>
//         <div
//           className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
//             filterStatus == "reject" ? "bg-primary text-center text-white":"border-secondory cursor-pointer p-3 my-4 text-center border rounded"
//           }`}
//           onClick={() => setFilterStatus("reject")}
//         >
//           Reject
//         </div>
//         <div
//           className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
//             filterStatus == "accept" && "bg-primary text-center text-white"
//           }`}
//           onClick={() => setFilterStatus("accept")}
//         >
//           Accept
//         </div>
// </div>
    

//       {/* Doctor Cards */}
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

  

//       </div>
//       {/* Confirmation Dialog */}
//       {openDialog && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold">
//               Are you sure you want to {action} this doctor request?
//             </h2>
//             <div className="mt-4 flex justify-end gap-4">
//               <Button onClick={handleCloseDialog} variant="outline" className="text-gray-600">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleConfirmAction}
//                 className={`${action === "accept" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//                   }`}
//               >
//                 Confirm {action === "accept" ? "Accept" : "Reject"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






























import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { XIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import DetailSheet from "./DoctorDetailSheet"; // Assuming your DetailSheet component is in the same directory
import { db } from "@/firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


export default function DoctorCard({ request }: any) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [filteredRequests, setFilteredRequests] = useState<any[]>(request); // Store filtered requests
  const [filterStatus, setFilterStatus] = useState<"all" | "accept" | "reject" | "pending">("all");
 

  // Filter requests based on the selected status
  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredRequests(request);
    } else {
      setFilteredRequests(request.filter((data: any) => data.status === filterStatus));
    }
  }, [filterStatus, request]); // Re-filter when filterStatus or request changes


  const handleActionClick = (action: "accept" | "reject", doctor: any) => {
    setAction(action);
    setSelectedDoctor(doctor);
    setOpenDialog(true); // Open the dialog
  };

  const handleConfirmAction = async () => {
    if (action && selectedDoctor) {
      const doctorinfo = doc(db, "Request", selectedDoctor.docid);

      if (action === "accept") {
        console.log(`Accepted doctor request for ${selectedDoctor.docid}`);
        await updateDoc(doctorinfo, { status: "accepted" });
      } else if (action === "reject") {
        console.log(`Rejected doctor request for ${selectedDoctor.docid}`);
        await updateDoc(doctorinfo, { status: "rejected" });
      }
    }
    setOpenDialog(false); // Close the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without doing anything
  };

  return (
    <div className="w-full">


<div className="grid w-full mx-auto md:w-1/2 grid-cols-4">
<div
                 className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
                  filterStatus == "all" && "bg-primary text-center text-white"
                }`}
          onClick={() => setFilterStatus("all")}
        >
          All
        </div>
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            filterStatus == "pending" && "bg-primary text-center text-white"
          }`}
          onClick={() => setFilterStatus("pending")}
        >
          Pending
        </div>
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            filterStatus == "reject" ? "bg-primary text-center text-white":"border-secondory cursor-pointer p-3 my-4 text-center border rounded"
          }`}
          onClick={() => setFilterStatus("reject")}
        >
          Reject
        </div>
        <div
          className={`border-secondory cursor-pointer p-3 my-4 text-center border rounded ${
            filterStatus == "accept" && "bg-primary text-center text-white"
          }`}
          onClick={() => setFilterStatus("accept")}
        >
          Accept
        </div>
</div>
    

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((data: any) => (
          <Card key={data.docid}>
            <CardHeader className="flex gap-2 flex-row">
              <Avatar className="serif-center h-10 w-10">
                <AvatarImage src={data.userinfo.pic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{data.userinfo.userName}</CardTitle>
                <CardDescription>{data.status}</CardDescription>
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

            <CardFooter className="justify-between">
              {
                data.status === "accept" ? (
                  <Button
                  size="icon"
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100 text-green-600"
                  onClick={() => handleActionClick("accept", data)}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="sr-only">Accept doctor request</span>
                </Button>
                ): data.status === "rejected" ? (
                  <Button
                  size="icon"
                  variant="outline"
                  className="bg-red-50 hover:bg-red-100 text-red-600"
                  onClick={() => handleActionClick("reject", data)}
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Reject doctor request</span>
                </Button>   ):  <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-red-50 hover:bg-red-100 text-red-600"
                  onClick={() => handleActionClick("reject", data)}
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Reject doctor request</span>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100 text-green-600"
                  onClick={() => handleActionClick("accept", data)}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="sr-only">Accept doctor request</span>
                </Button>
              </div>
              }
            
              <DetailSheet doctor={data} />
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
  );
}
