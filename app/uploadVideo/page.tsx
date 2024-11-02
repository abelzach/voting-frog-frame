"use client";

import React from "react";
import { Button } from "../components/ui/button";

const UploadVideo = () => {
  const handleUpload = () => {
    alert("Video uploaded successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload Your Video</h1>
      <div className="items-center p-10 justify-center flex flex-col">
        <input
          type="file"
          accept="video/*, .mkv"
          className="mb-4 text-white items-center justify-center"
        />
        <Button
          variant="default"
          className="hover:text-white border-gray-600 hover:bg-gray-700 bg-gray-800"
          onClick={handleUpload}
        >
          Upload Video
        </Button>
      </div>
    </div>
  );
};

export default UploadVideo;
