// pages/api/upload.ts
import multer from 'multer';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import mammoth from 'mammoth';
import fs from 'fs/promises';

// Extend NextApiRequest to include the file property from multer
interface ExtendedNextApiRequest extends NextApiRequest {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  };
}

// Set up multer storage
const upload = multer({ dest: 'uploads/' });

// Create the router
const router = createRouter<ExtendedNextApiRequest, NextApiResponse>();

// ✅ Fix: Cast multer middleware as any to bypass type issues
router.use(upload.single('file') as any);

router.post(async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Missing file path" });
    }

    const name = req.body.name;
    const filePath = req.file.path;

    const result = await mammoth.extractRawText({ path: filePath });
    const text = result.value;

    const txtPath = `uploads/${name}.txt`;
    await fs.writeFile(txtPath, text, "utf-8");

    // Add assistant + DB logic here if needed

    res.status(200).json({
      success: true,
      message: "File uploaded and processed successfully",
      textPath: txtPath
    });

  } catch (err: any) {
    console.error('Upload error:', err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Handle unsupported methods
router.all((req, res) => {
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
});

// Export the handler
export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: `Something went wrong: ${err.message}` });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
