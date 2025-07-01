// // src/app/api/upload/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import mammoth from "mammoth";
// import path from "path";

// // ✅ Шинэ runtime config
// export const runtime = "nodejs";
// export const dynamic = "force-dynamic"; // optional

// export async function OPTIONS() {
//   return NextResponse.json(
//     {},
//     {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "http://localhost:3000",
//         "Access-Control-Allow-Methods": "POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         "Access-Control-Allow-Credentials": "true",
//       },
//     }
//   );
// }

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;
//   const name = formData.get("name") as string;

//   if (!file || !name) {
//     return NextResponse.json(
//       { error: "File or name missing" },
//       { status: 400 }
//     );
//   }

//   try {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const docxPath = path.join("uploads", `${name}.docx`);
//     const txtPath = path.join("uploads", `${name}.txt`);

//     await writeFile(docxPath, buffer);

//     const result = await mammoth.extractRawText({ path: docxPath });
//     const extractedText = result.value;

//     await writeFile(txtPath, extractedText, "utf-8");

//     return NextResponse.json(
//       {
//         success: true,
//         message: "File uploaded and converted successfully",
//         textPath: txtPath,
//       },
//       {
//         status: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "http://localhost:3000",
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { error: "Upload failed" },
//       {
//         status: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "http://localhost:3000",
//         },
//       }
//     );
//   }
// }
