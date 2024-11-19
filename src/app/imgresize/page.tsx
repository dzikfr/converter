'use client'

import { useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'

export default function Home() {
  const [image, setImage] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image')
      return
    }

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const data = response.data
      setMessage(data.message)
      if (data.url) {
        setPreview(data.url)
        setDownloadUrl(data.url)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setMessage('Error uploading image')
    }
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 border-4 border-black bg-yellow-300 px-4 py-2 text-4xl font-extrabold text-black">
        Upload, Resize, and Download
      </h1>

      {/* File Input */}
      <div className="flex justify-center">
        <label
          htmlFor="file-upload"
          className="mb-4 cursor-pointer rounded-lg border-4 border-black bg-white px-6 py-3 font-bold text-black shadow-[3px_-3px_0px_#000000]"
        >
          Upload File
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Image Preview */}
      {preview && <img src={preview} alt="Preview" className="mb-4 max-w-xs" />}

      {/* Upload Button */}
      <Button onClick={handleUpload}>Resize</Button>

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
  )
}
