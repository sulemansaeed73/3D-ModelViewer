"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
function UploadAutoCad() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  const router = useRouter();

  async function AddFile(e) {
    const file = e.target.files[0];

    if (!file || (!file.name.endsWith(".dwg") && !file.name.endsWith(".dxf"))) {
      console.log("Incorrect File Format");
      setError(true);
      setMessage("Incorrect file format. Only .dwg and .dxf are allowed.");
      return;
    }

    setError(false);
    setMessage("Uploading...");

    try {
      // Step 1: Authenticate and get access token
      console.log("Step 1: Authenticating...");
      const authResponse = await axios.get("http://localhost:5000/auth");
      const accessToken = authResponse.data.access_token;
      localStorage.setItem("Forge3d", accessToken);
      console.log("Step 1 Completed - Access Token Received");

      // Step 2: Check and create bucket if it doesn't exist
      console.log("Step 2: Checking/Creating Bucket...");
      await axios.post("http://localhost:5000/check-create-bucket");
      console.log("Step 2 Completed - Bucket Ready");

      // Step 3: Upload file to Forge
      console.log("Step 3: Uploading File...");
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post(
        "http://localhost:5000/upload_file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (uploadResponse.data && uploadResponse.data.objectKey) {
        console.log("Step 3 Completed - File Uploaded", uploadResponse.data);

        // Step 4: Translate the File for Forge Viewer
        console.log("Step 4: Requesting File Translation...");
        const translateResponse = await axios.post(
          "http://localhost:5000/translatefile",
          {
            objectKey: uploadResponse.data.objectKey,
          }
        );

        console.log(
          "Step 4 Completed - Translation Requested",
          translateResponse.data
        );
        setMessage("File uploaded and translation started.");

        if (translateResponse.data.urn) {
          // router.push('/viewer.html?urn=' + translateResponse.data.urn)
          window.location.replace(
            "/viewer.html?urn=" + translateResponse.data.urn
          ); //To Reload The Page
        } else {
          setMessage("Translation failed.");
        }
      } else {
        console.error("Error: File upload failed.");
        setMessage("File upload failed.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
    <h2 className="text-5xl font-bold text-gray-900 mb-6 text-center underline decoration-[#ca3a3a]">
      Upload AutoCad File
    </h2>
    <p className="text-lg text-gray-700 text-center max-w-2xl mb-8">
      Please upload only DWG or DXF files. This website will load your 3D model for viewing and interaction.
    </p>
  
    <div className="flex flex-col items-center w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <label className="text-xl font-medium text-gray-800 mb-4">
        Select AutoCad File:
      </label>
      <label className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 transition duration-300">
        <span className="text-gray-500 text-lg">Add File</span>
        <input type="file" className="hidden" onChange={AddFile} />
      </label>
      
      {error && <span className="text-red-600 mt-4">{message}</span>}
      {!error && message && <span className="text-green-600 mt-4">{message}</span>}
    </div>
  </div>
  
  );
}

export default UploadAutoCad;
