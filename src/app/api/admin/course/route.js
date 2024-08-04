import { createdDate } from "@/middleware/Basics";
import { adminTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";

const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { name } = await req.json();
  if(!name) return ResponseFailed(200,"Please provide a name")

  const course = await Course.findOne({ name });

  if (course)
    return ResponseFailed(
      401,
      "this name is already in use choose diffrent",
      name
    );

  const data = await Course.create({ name, createdDate });

  return ResponseSuccess(201, "Course created successfully", data);
});
