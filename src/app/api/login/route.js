import { connectDB } from "@/DataBase/connectDB";
import { createJWT, getJWT } from "@/middleware/jwtHash";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { Course } from "@/models/courses";
import User from "@/models/user";
import { cookies } from "next/headers";



export const POST = async(req)=>{
    const {phone,password} = await req.json();
    if(!phone || !password) return ResponseFailed(401,'Please fill all the fields!');

    try {
        await connectDB();

        const user = await User.findOne({phone}).select('+password');
        
        if(!user) return ResponseFailed(401,'invalid phone no. or password',user);

        const hashPass = getJWT(user.password);

        if(hashPass !== password) return ResponseFailed(401,"invalid phone no. or password",{user,hashPass});

        
        const token = createJWT({id:user._id});     

        user.token = token;
        await user.save();

        cookies().set({
            name: "Raithan_Token",
            value: token,
            httpOnly: true,
            maxAge: process.env.USER_DAY_COOKIE*24 * 60 * 60,
          });

        return ResponseSuccess(200,'User Login Successfully',{user});

    } catch (error) {
        return ResponseFailed(400,'User Login Failed',error.message);
    }

    
}
