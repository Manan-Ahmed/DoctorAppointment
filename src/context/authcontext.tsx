"use client";

import { auth, db } from "@/firebase/firebaseConfig";
import { UserType } from "@/type/UserType";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ChildrenType = {
  children: ReactNode;
};

type ContextType = {
  user: UserType | null;
};

const AuthContext = createContext<ContextType | null>(null);

export default function AuthContextProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<UserType | null>(null);

  const route = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('uid',uid);
        
        fetchUser(uid)
      } else {
        setUser(null);
      }
    });
  }, []);

 const fetchUser = async(uid:string)=>{
  const docRef = doc(db, "users2", uid);
  try{
    const userFound = await getDoc(docRef);
let user:any = userFound.data()
setUser(user)
console.log(user);

  }
  catch(e){
    console.log('user not found',e);
    
  }


 }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);