'use client'

import React, { useState } from 'react'
import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal'
import Button from '@/app/components/Button'

const RemoveBgPage = () => {
  const [image, setImage] = useState<File | null>(null)
  const [removedBgImage, setRemovedBgImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false) // State for loading

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      setImage(file)
    }
  }

  const removeBackground = async () => {
    if (image) {
      setIsLoading(true) // Set loading state to true before processing
      try {
        const reader = new FileReader()
        reader.onloadend = async () => {
          const imageSrc = reader.result

          if (typeof imageSrc === 'string') {
            const resultBlob = await imglyRemoveBackground(imageSrc)
            const url = URL.createObjectURL(resultBlob)
            setRemovedBgImage(url)
          } else {
            console.error('Gambar tidak dalam format yang valid')
          }
        }

        reader.readAsDataURL(image)
      } catch (error) {
        console.error('Error removing background:', error)
      } finally {
        setIsLoading(false) // Set loading state to false after processing
      }
    }
  }

  const downloadImage = () => {
    if (removedBgImage) {
      const link = document.createElement('a')
      link.href = removedBgImage
      link.download = 'removedbg.png'
      link.click()
    }
  }

  const clearImage = () => {
    setImage(null)
    setRemovedBgImage(null)
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 border-4 border-black bg-yellow-300 px-4 py-2 text-4xl font-extrabold text-black">
        Remove Background
      </h1>

      {/* Input file */}
      <div className="mt-6 flex justify-center">
        <label
          htmlFor="file-upload"
          className="rounded-lg border-4 border-black bg-white px-6 py-3 font-bold text-black shadow-[3px_-3px_0px_#000000]"
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

      {/* Button to generate */}
      <div className="mt-6 flex justify-center">
        <Button onClick={removeBackground}>Generate</Button>
      </div>

      {/* Display result */}
      {removedBgImage && !isLoading && (
        <div className="text-center">
          <h3 className="text-xl font-semibold">Result</h3>
          <img
            src={removedBgImage}
            alt="Removed Background"
            className="mt-4 h-auto max-w-full rounded-lg shadow-md"
          />
          {/* Download button */}
          <div className="mt-4">
            <Button onClick={downloadImage}>Download Image</Button>
          </div>

          {/* Clear button */}
          <div className="mt-4">
            <Button onClick={clearImage}>Clear Image</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RemoveBgPage
