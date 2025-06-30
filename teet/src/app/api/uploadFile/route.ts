// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import mammoth from "mammoth";
import path from "path";

// Edge runtime дэмждэггүй тул Node runtime-г заавал зааж өгнө
export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
};

// GET, OPTIONS гэх мэт бүх HTTP method-уудад CORS хариу өгөх
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000", // эсвэл таны frontend domain
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;

  if (!file || !name) {
    return NextResponse.json(
      { error: "File or name missing" },
      { status: 400 }
    );
  }

  try {
    // Файлыг унших
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const docxPath = path.join("uploads", `${name}.docx`);
    const txtPath = path.join("uploads", `${name}.txt`);

    // DOCX файлыг хадгалах
    await writeFile(docxPath, buffer);

    // Mammoth ашиглан текст задлах
    const result = await mammoth.extractRawText({ path: docxPath });
    const extractedText = result.value;

    // TXT файл руу бичих
    await writeFile(txtPath, extractedText, "utf-8");

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded and converted successfully",
        textPath: txtPath,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
  }
}
