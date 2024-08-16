import { userTryCatch } from "@/middleware/tryCatch";
import User from "@/models/user";
import cloudinary from "@/lib/cloudinary";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { Course } from "@/models/courses";

export const PUT = userTryCatch(async (req) => {
  const { avatar, name } = await req.json();
  if (!avatar && !name)
    return ResponseFailed(401, "please fill all the fields");

  const user = await User.findById(req.id).populate('courses');

  let uploadResponse;
  if (avatar && avatar !== user.avatar) {
      uploadResponse = await cloudinary.uploader.upload(avatar, {
        folder: "raithan",
      });    
    user.avatar = uploadResponse?.secure_url;
}

  user.name = name;

  await user.save();

  return ResponseSuccess(201, "user update successfully", user);
});
