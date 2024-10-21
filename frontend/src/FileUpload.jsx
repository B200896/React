import React, { useState, useEffect } from "react";
import axios from 'axios'
const FileUpload = () => {
  const [myfile, setFile] = useState(null);
  const [myerror, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const[responseData,setResponseData]=useState("")
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile); 

    if (selectedFile) {
      const fileSizeMB = selectedFile.size / 1024 / 1024;

      if (fileSizeMB < 5) {
        setError("");
        setFile(selectedFile);
      } else {
        setError("File size must be less than 5MB.");
        setFile(null);
      }
    }
  };

  const handleUpload =async () => {
    console.log("Upload button clicked"); 
    if (!myfile) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("pdfFile", myfile)
    try {
        const response = await axios.post("http://localhost:5000/api/upload", formData, {
            
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response.data.data",response.data)
        setResponseData(response.data.data)
        setError("")
        console.log("response",response)

       
    setSuccessMessage("File uploaded successfully!");
    setFile(null); 
  } catch (error) {
    setError(error.response ? error.response.data : "An error occurred while uploading the file.");
  }
};

  useEffect(() => {
    // console.log("Selected File:", myfile);
    // console.log("Error Message:", myerror);
  }, [myfile, myerror,responseData]);

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Resume</button>
      {myerror && <p style={{ color: 'red' }}>{myerror}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} 
      
                <div>
                    <h3>Parsed Data:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
        
    </div>
  );
};

export default FileUpload;
