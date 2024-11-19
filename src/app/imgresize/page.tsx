"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      setMessage(data.message);
      if (data.url) {
        setPreview(data.url);
        setDownloadUrl(data.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">
        Upload, Resize, and Download Image
      </h1>

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered file-input-primary mb-4"
      />

      {/* Image Preview */}
      {preview && <img src={preview} alt="Preview" className="max-w-xs mb-4" />}

      {/* Upload Button */}
      <button onClick={handleUpload} className="btn btn-primary mb-4">
        Upload
      </button>

      {/* Message */}
      {message && <p className="text-lg">{message}</p>}

      {/* Download Button */}
      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            download="resized-image.jpg"
            className="btn btn-success"
          >
            Download Resized Image
          </a>
        </div>
      )}
    </div>
  );
}
