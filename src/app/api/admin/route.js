import {  ResponseSuccess } from "@/middleware/Response"
import { adminTryCatch } from "@/middleware/tryCatch";


export const GET = adminTryCatch(async(req) => {
    return ResponseSuccess(200,'Admin Verified');
})