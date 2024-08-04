import { connectDB } from "@/DataBase/connectDB";
import { AdminAuth, UserAuth } from "./auth";
import { ResponseFailed, ResponseFailedError } from "./Response";

export const adminTryCatch = (passedFunction) => async(req) => {
    try {
        const isAdmin = await AdminAuth(req);
        if (!isAdmin) return ResponseFailed(401, "Please Login First", { isAdmin });
        await connectDB();

        

        return await passedFunction(req);
    } catch (error) {
        console.log('try catch error: ' + error)
        return ResponseFailedError(500, "Internal Server Error", error.message);
    }
}

export const userTryCatch = (passedFunction) => async(req) => {
    try {
        await connectDB();
        const User = await UserAuth(req);
        if (!User) return ResponseFailed(401, "Please Login First", { User });
// console.log("user ===>",User)
        req.id = User._id;

        

        return await passedFunction(req);
    } catch (error) {
        console.log('try catch error: ' + error)
        return ResponseFailedError(500, "Internal Server Error", error.message);
    }
}



