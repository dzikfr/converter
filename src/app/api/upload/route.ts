import { NextResponse } from "next/server";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resizedImage = await sharp(buffer)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toBuffer();

    const outputPath = path.join(process.cwd(), "public", "resized-image.jpg");
    await fs.writeFile(outputPath, resizedImage);

    return NextResponse.json({
      message: "Image uploaded and resized successfully",
      url: "/resized-image.jpg",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process the image" },
      { status: 500 }
    );
  }
}
