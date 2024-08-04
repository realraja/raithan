import { ResponseSuccess } from "@/middleware/Response";
import { userTryCatch } from "@/middleware/tryCatch";
import User from "@/models/user";
import { cookies } from "next/headers";




export const GET = userTryCatch(async(req)=>{
    const user = await User.findById(req.id);
    user.token = '';
    await user.save();
    cookies().set({
        name: "Raithan_Token",
        value: '',
        httpOnly: true,
        maxAge: 0,
      });

    return ResponseSuccess(200,'User Logout Successfully');
})