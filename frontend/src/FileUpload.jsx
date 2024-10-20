import React from "react";
import { useState,useEffect } from "react";
const FileUpload=()=>{
    const[file,setFile]=useState(null)
    const [error,setError]=useState("")
    const handleFileChange=(event)=>{
        const selectedFile=event.target.files[0];
        
        if(selectedFile){

            
            const fileSizeMB=selectedFile.size/1024/1024 //to convert bytes to mb we are dividing it 1024^2
            
            if(fileSizeMB > 2 && fileSizeMB < 5)
            {
                console.log("filesize",fileSizeMB)
                console.log("selectedFile",selectedFile)
                setError('')
                setFile(selectedFile) 
                console.log(file)
                console.log(error)
                
               
            } else{
                setError('File size exceeded ')
                setFile(null)
                console.log(file)
            console.log(error)
                
                              
            }
            

        }

    }
    return(
        <div>
        <h2>File Upload</h2>
        <input type="file"
        accept=".pdf"
        onChange={handleFileChange}/>
        <button>Upload Resume</button>
        </div>

    )
}
export default FileUpload;