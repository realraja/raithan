import { connectDB } from "@/DataBase/connectDB";
import { UserAuth } from "@/middleware/auth";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { userTryCatch } from "@/middleware/tryCatch";
import { Notification } from "@/models/notification";

export const POST = async (req) => {
  try {
    const { name, phone, message } = await req.json();

    if (!message) return ResponseFailed(401, "Please fill all fileds");

    await connectDB();

    if (!phone || !name) {
      const User = await UserAuth(req);
      if (!User) return ResponseFailed(401, "Please Login First", { User });

      const data = await Notification.create({ message, user: User._id });

      return ResponseSuccess(201, "Notification send", data);
    }
    
    
    const data = await Notification.create({name,phone, message });

    return ResponseSuccess(201, "Notification send", data);
} catch (error) {
    console.log(error);
    return ResponseFailed(401, error.message);
  }
};
export const GET = userTryCatch(async (req) => {
 const notification = await Notification.find({to:'User'});
 return ResponseSuccess(200, "Notification Get", notification);
});
