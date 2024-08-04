import { adminTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import { Subject } from "@/models/subjects";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { name, courses } = await req.json();
  if(!name || !courses) return ResponseFailed(401,"please fill all the fields");

  

  const subject = await Subject.findOne({ name });
  if (subject)
    return ResponseFailed(401, "this subject is already created", name);

 
  const data = await Subject.create({ name, for:courses});

    await courses.map(async (i) => {
      const course = await Course.findById(i);
      if (!course) return ResponseFailed(401, "this course not found", i);

      await course.subjects.push(data._id);
      await course.save();
    });
  

  return ResponseSuccess(201, "subject created successfully", data);
});
