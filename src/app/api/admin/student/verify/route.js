import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { adminTryCatch } from "@/middleware/tryCatch";
import User from "@/models/user";




export const PUT = adminTryCatch(async (req) => {
    const { userId } = await req.json();
    if( !userId) return ResponseFailed(401,"please fill all the fields");
  
    
  
    const user = await User.findById(userId);
    if (!user)
      return ResponseFailed(401, "User Not Found");
  
  
    user.verified = !user.verified;
    await user.save();
  

    return ResponseSuccess(200, "user Verifyed successfully", user);
  });