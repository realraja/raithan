import { connectDB } from "@/DataBase/connectDB";
import { createJWT } from "@/middleware/jwtHash";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import { Course } from "@/models/courses";
import User from "@/models/user";
import { cookies } from "next/headers";
import cloudinary from "@/lib/cloudinary";

export const POST = async (req) => {
  const { name, phone, password, avatar } = await req.json();
  if (!name || !phone || !password || !avatar)
    return ResponseFailed(401, "Please fill all the fields!");

  if (phone.length !== 10)
    return ResponseFailed(401, "fill correct no." + phone.length);

  try {
    await connectDB();

    const user = await User.findOne({ phone: phone });
    if (user)
      return ResponseFailed(401, "this phone no. is already in use", phone);

    const coursesData = await Course.find();

    const uploadResponse = await cloudinary.uploader.upload(avatar, {
      folder: "raithan",
    });

    const passwordHash = createJWT(password);
    const userData = await User.create({
      avatar: uploadResponse.secure_url,
      name,
      phone,
      password: passwordHash,
      courses: [coursesData[0]._id],
    });

    coursesData[0].subscribers.push(userData._id);
    await coursesData[0].save();

    const token = createJWT({ id: userData._id });

    userData.token = token;
    await userData.save();

    cookies().set({
      name: "Raithan_Token",
      value: token,
      httpOnly: true,
      maxAge: process.env.USER_DAY_COOKIE * 24 * 60 * 60,
    });

    return ResponseSuccess(200, "User Created Successfully", {
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return ResponseFailed(400, "User Creating Failed", error.message);
  }
};
