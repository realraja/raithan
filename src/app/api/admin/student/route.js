import { adminTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import User from "@/models/user";

const { createJWT, getJWT } = require("@/middleware/jwtHash");
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { name, phone, password, courses } = await req.json();
  if(!name || !phone || !password || !courses) return ResponseFailed(401,"please fill all the fields");

  

  const user = await User.findOne({ phone: phone });
  if (user)
    return ResponseFailed(401, "this phone no. is already in use", phone);

  const passwordHash = createJWT(password);
  const data = await User.create({
    name,
    phone,
    password: passwordHash,
    verified: true,
    courses,
  });

    const courseUpdate = courses.map(async (i) => {
      const course = await Course.findById(i);
      if (!course) return ResponseFailed(401, "this course not found", i);

      await course.subscribers.push(data._id);
      await course.save();
    });
  
  await Promise.all(courseUpdate);
  return ResponseSuccess(201, "user created successfully", data);
});
export const PUT = adminTryCatch(async (req) => {
  const { name, phone, password, courses,userId } = await req.json();
  if(!name || !phone || !password || !courses || !userId) return ResponseFailed(401,"please fill all the fields");

  

  const userCheck = await User.find({ phone: phone,_id: { $ne: userId }});
  // console.log(userCheck.length)
  if (userCheck.length > 0)
    return ResponseFailed(401, "this phone no. is already in use", phone);

  
  const user = await User.findById(userId);
  if (!user)
    return ResponseFailed(401, "User Not Found");



  const passwordHash = createJWT(password);
  user.name = name;
  user.phone = phone;
  user.password = passwordHash;
  user.courses = courses;
  await user.save();


  const courseUpdate = courses.map(async (i) => {
    const course = await Course.findById(i);
    if (!course) return ResponseFailed(401, "this course not found", i);

    course.subscribers = course.subscribers.filter(s=> s.toString() !== userId.toString());
    await course.subscribers.push(userId);
    await course.save();
  });

await Promise.all(courseUpdate);
  return ResponseSuccess(200, "user Updated successfully", user);
});
export const GET = adminTryCatch(async (req) => {

  const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  const userId = searchParams.get("user");
  if(!userId) return ResponseFailed(401,"please fill all the fields",searchParams);

  

  
  const user = await User.findById(userId).select('+password');
  if (!user)
    return ResponseFailed(401, "User Not Found");

  const hashPass = getJWT(user.password);

   
  return ResponseSuccess(200, "user Password Get Successfully", {password: hashPass});
});



/*
    const courseUpdate = courses.map(async (i) => {
      const course = await Course.findById(i);
      if (!course) return ResponseFailed(401, "this course not found", i);

      course.subscribers = course.subscribers.filter(s=> s.toString() !== userId.toString());
      await course.subscribers.push(userId);
      await course.save();
    });
  
  await Promise.all(courseUpdate);
  */ 