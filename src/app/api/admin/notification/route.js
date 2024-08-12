import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { adminTryCatch } from "@/middleware/tryCatch";
import { Notification } from "@/models/notification";
import User from "@/models/user";

export const POST = adminTryCatch(async (req) => {
  const { message } = await req.json();
  if (!message)
    return ResponseFailed(401, "please fill all the fields");

  const data = await Notification.create({ name:"Raithan Classes", message,to:'User' });

  return ResponseSuccess(201, "notification created successfully", data);
});
export const GET = adminTryCatch(async (req) => {
  const data = await Notification.find({to:'Admin'}).populate('user', 'name avatar phone');
  return ResponseSuccess(200, "notification get successfully", data);
});
