import { cookies } from "next/headers";
import { getJWT } from "./jwtHash";
import User from "@/models/user";


export const AdminAuth = async(req)=>{
//    const cookie = await req.cookies;
   const cookie = cookies().get("Raithan_Admin_Token");
   if(!cookie) return false;

//    const isVerified = jwt.verify(cookie.value,process.env.JWT_SECRET).password ===  process.env.ADMIN_PASSWORD
   const isVerified = getJWT(cookie.value).password ===  process.env.ADMIN_PASSWORD



    return isVerified;
}
export const UserAuth = async(req)=>{
//    const cookie = await req.cookies;
   const cookie = cookies().get("Raithan_Token");
   if(!cookie) return false;

//    const isVerified = jwt.verify(cookie.value,process.env.JWT_SECRET).password ===  process.env.ADMIN_PASSWORD
   const userId = getJWT(cookie.value).id;

   // console.log(userId);

   const user = await User.findById(userId);

   if(!user) return false;

   if(user.token !== cookie.value){
      cookies().set({
         name: "Raithan_Token",
         value: '',
         httpOnly: true,
         maxAge: 0,
       });
      return false;
   }

    return user;
}