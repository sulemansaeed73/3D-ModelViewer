
"use client";
import React,{useState,useEffect} from 'react';
const ForgeViewer = ({ urn }) => {
  const [accesstoken, setAccessToken] = useState(null);
  useEffect((()=>{
    const accessToken = localStorage.getItem("Forge3d");
    if(accessToken)
    {
      setAccessToken(accessToken)
    }
  }),[])

  const viewerUrl = `/viewer.html?urn=${urn}&accessToken=${accesstoken}`;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src={viewerUrl}
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
};

export default ForgeViewer;