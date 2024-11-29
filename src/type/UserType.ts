

export type UserType = {
    email:string,
    pic?:string,
    uid:string
    role?: 'admin' | 'user' | 'doctor'
    doctorinfo?:{
        bio: string,
        hospital: string,
        fees: string,
        gender: string,
        appointmentTime: string,
        degree: string,
        specialization: string,
        experience: string,
        number: string,
        address: string,
    }
}

