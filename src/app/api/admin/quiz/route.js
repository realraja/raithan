import { adminTryCatch } from "@/middleware/tryCatch";
import { Quiz } from "@/models/quizes";
import { Course } from "@/models/courses";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { name, courses, subject } = await req.json();
  if (!name || !courses || !subject) {
    return ResponseFailed(401, "Please fill all the fields");
  }

  const quiz = await Quiz.findOne({ name });
  if (quiz) {
    return ResponseFailed(401, "This quiz name is already created, please choose a different name", name);
  }

  const data = await Quiz.create({ name, forCourse: courses, forSubject: subject });

  const updateCourses = courses.map(async (courseId) => {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error(`Course not found: ${courseId}`);
    }
    
    course.quizes.push({ id: data._id, createdAt: new Date() });
    await course.save();
  });

  try {
    await Promise.all(updateCourses);
    return ResponseSuccess(201, "Quiz created successfully", data);
  } catch (error) {
    return ResponseFailed(500, "Internal Server Error while updating courses", error);
  }
});
