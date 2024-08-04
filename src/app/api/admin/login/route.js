import { createJWT } from "@/middleware/jwtHash";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { cookies } from "next/headers";



export const POST = async(req)=>{
    const {username,password} = await req.json();
    if(!username || !password) return ResponseFailed(401,'Please fill all the fields!');

    try {    
        if(username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) return ResponseFailed(401,'Invalid username or password!');


        // const token = jwt.sign({username,password},process.env.JWT_SECRET); 
        const token = createJWT({username,password});
        cookies().set({
            name: "Raithan_Admin_Token",
            value: token,
            httpOnly: true,
            maxAge: process.env.DAY_COOKIE*24 * 60 * 60,
          });

        return ResponseSuccess(200,'Admin Login Successfully',token);

    } catch (error) {
        return ResponseFailed(400,'Admin Login Failed',error);
    }

    
}
