import { ResponseSuccess } from "@/middleware/Response";
import { adminTryCatch } from "@/middleware/tryCatch";
import { cookies } from "next/headers";




export const GET = adminTryCatch(async(req)=>{
    cookies().set({
        name: "Raithan_Admin_Token",
        value: '',
        httpOnly: true,
        maxAge: 0,
      });

    return ResponseSuccess(200,'Admin Logout Successfully');
})