// pages/api/upload.js

import cloudinary from "@/lib/cloudinary";
import { userTryCatch } from "@/middleware/tryCatch";
import { NextResponse } from "next/server";


export const POST = userTryCatch(async(req)=>{
  const {image} = await req.json();
  // console.log(image);
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'raithan'
    });

    console.log(uploadResponse)

    return NextResponse.json({ url: uploadResponse.secure_url });
}
)
// export default async function handler(req, res) {
//   console.log(req)
//   if (req.method === 'POST') {
//     const { image } = req.body;

//     try {
//       const uploadResponse = await cloudinary_js_config.uploader.upload(image, {
//         upload_preset: 'your_upload_preset',
//       });

//       res.status(200).json({ url: uploadResponse.secure_url });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to upload image' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
