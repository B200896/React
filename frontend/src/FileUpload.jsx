import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";

import { useNavigate } from "react-router-dom";  
import { Box, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from "@mui/material";

const FileUpload = () => {
  const [myfile, setFile] = useState(null);
  const [myerror, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [responseData, setResponseData] = useState(""); 
  const [matchScore, setMatchScore] = useState(null); 
  const [skills, setSkills] = useState([]); 
  const [missingSkills, setMissingSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [company,setCompany]=useState("")
  const navigate = useNavigate(); 
  const [jobDescription, setJobDescription] = useState(`
    We are a Berlin-based team with our own office space in the heart of Kreuzberg,
    but we have remote workers in a couple of countries in Europe, a new office in Dublin,
    and a team in Melbourne, Australia.
    
    What do we do?
    Chainflip is an efficient swapping protocol that enables users to swap native assets
    across different blockchains with excellent pricing.
 
    Our protocol design removes the need for wrapped tokens. We use MPC (Multi-Party-Computation),
    and in particular, TSS (Threshold Signature Schemes) to create aggregate keys held by
    a permissionless network of 150 Validators. These validators control simple smart contracts/wallets
    called Vaults, on multiple blockchains simultaneously. On top of that, we developed our own substrate-based
    application-specific blockchain — the Chainflip State Chain — to track balances, process events,
    and execute instructions.
 
    This is an exciting challenge that we’ve been working on for 3 years now with our growing engineering team of 15.
    While our heart beats in Berlin, we champion flexible work rhythms, encouraging both in-office collaboration
    and the freedom of remote stints.
 
    What’s the Job?
    This open role is for Full Stack Engineer who wants to transition to Web3 within the Product team.
    Experience in Typescript is ideal, but we are open to everybody with full-stack engineering knowledge
    and interest in the Web3/Blockchain space.
 
    The Product team is a cross-functional team composed of five Engineers, a UX Designer, and a Product Manager.
    The nature of this team means that communication and teamwork are taken very seriously.
    
    Depending on your interests and skills, here are some of the major challenges you will focus your efforts on:
  `);

  useEffect(() => {
    console.log("Updated company state:", company);
  }, [company]); // This hook runs whenever company changes

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

  // Handle file upload and job description and match score generation
  const handleGenerateResponse = async () => {
    console.log("Generate Response button clicked");

    if (!myfile || !jobDescription) {
      alert("Please select a file and fill out the job description.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", myfile);
    formData.append("jobDescription", jobDescription); 

    try {
      
      const uploadResponse = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      console.log("File uploaded successfully, response:", uploadResponse.data);
      setResponseData(uploadResponse.data); 
      setSuccessMessage("File uploaded successfully!");


      const resumeText = uploadResponse.data;  // This is the aiResponse from the file upload response
      
      // Now make the API call to generate the match score
      const matchScoreResponse = await axios.post("http://localhost:5000/api/generate-match-score", {
        resumeText: resumeText, // Use the AI extracted resume text
      });
  
      console.log("Match Score Response:", matchScoreResponse);
      setMatchScore(matchScoreResponse.data.MatchScore);
      setSkills(matchScoreResponse.data.Skills); 
      // navigate("/dashboard", {
      //   state: 
      //   { matchScore: matchScoreResponse.data.MatchScore, 
      //     analysis: matchScoreResponse.data.Analysis,
      //     skills:matchScoreResponse.data.Skills,
      //     missingSkills:matchScoreResponse.data.MissingSkills,
      //     projects:matchScoreResponse.data.Projects,
      //     skillcomparison:matchScoreResponse.data.SkillComparison,recommandation:matchScoreResponse.data.Recommendations
      //   }
      // });

      
      // const matchScoreResponse = await axios.post("http://localhost:5000/api/generate-match-score", {
      //   jobDescription,
      //   resumeText: uploadResponse.data.aiResponse, 
        
      // });
      // console.log("Match Score Response:", matchScoreResponse);
      // setMatchScore(matchScoreResponse.data.MatchScore);
      // setSkills(matchScoreResponse.data.Skills); 
      // navigate("/dashboard", {
      //   state: { matchScore: matchScoreResponse.data.MatchScore, analysis: matchScoreResponse.data.Analysis,skills:matchScoreResponse.data.Skills,missingSkills:matchScoreResponse.data.MissingSkills,projects:matchScoreResponse.data.Projects,skillcomparison:matchScoreResponse.data.SkillComparison,recommandation:matchScoreResponse.data.Recommendations}
      // });
      const genrateJobResponse=await fetch("http://localhost:5000/api/job-descriptions");
      if(!genrateJobResponse.ok){
        throw new Error("Failed to fetch job desc")
      }
      const jobDescriptionData=await genrateJobResponse.json()
      console.log("jobDescriptionData",jobDescriptionData)
      setCompany(jobDescriptionData.jobDescriptions)
      console.log("company",company)

    } catch (error) {
      console.error("Error generating response:", error);
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === "Duplicate entry found. Record not inserted.") {
          setError("This resume has already been uploaded. Please upload a different file.");
        } else {
          setError(error.response.data.message || "An error occurred while processing the request.");
        }
      } else {
        setError("An error occurred while processing the request.");
      }
    }
  };
  
  const handleMatchScoreResponse = async (job) => {
    if (!myfile) {
      alert("Please select a file");
      return;
    }
  
    try {
      // We assume you have already uploaded the file and have the response data
      const resumeText = responseData;  // This is the aiResponse from the file upload response
      
      // Now make the API call to generate the match score
      const matchScoreResponse = await axios.get("http://localhost:5000/api/job-descriptions");
  
      const final_data = matchScoreResponse.data.jobDescriptions.filter((item)=>{
         
         return item.id == job;
      })
      console.log(final_data,"final data")
      console.log(final_data[0].job_details,"final data")
      console.log("Match Score Response:", final_data[0].job_details.MatchScore);
      setMatchScore(final_data[0].job_details.MatchScore);
      setSkills(final_data[0].job_details.Skills); 
      navigate("/dashboard", {
        state: 
        { matchScore: final_data[0]?.job_details.MatchScore, 
          analysis: final_data[0]?.job_details.Analysis,
          skills:final_data[0]?.job_details.Skills,
          missingSkills:final_data[0]?.job_details.MissingSkills,
          projects:final_data[0]?.job_details.Projects,
          skillcomparison:final_data[0]?.job_details.SkillComparison,recommandation:final_data[0].job_details.Recommendations
        }
      });
    
    } catch (error) {
      console.error("Error generating match score:", error);
      setError(error.message || "An error occurred while generating the match score.");
    }
  };
  
  
  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value); 
  };

  return (
    <div style={{ textAlign: "center" }}>
    <h2>File Upload and Job Description</h2>

    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", marginBottom: "20px" }}>
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <h3>Upload Resume</h3>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        {myerror && <p style={{ color: 'red' }}>{myerror}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>

      {/* Job Description Section */}
      {/* <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h3>Job Description</h3>
        <textarea
          rows="15"
          cols="50"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          style={{ width: "100%" }}
        />
      </div>*/}
    </div> 

    <Button
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
      onClick={handleGenerateResponse}
    >
      Generate Response
    </Button>
    
    {company.length > 0 && (
      
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="job description table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Company Name</strong></TableCell>
                <TableCell><strong>Job Role</strong></TableCell>
                <TableCell><strong>Job Description</strong></TableCell>
                <TableCell><strong>Match Score</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {company?.map((job, index) => (
                // console.log(job)
                <TableRow key={index}>
                  <TableCell>{job.company_name}</TableCell>
                  <TableCell>{job.job_role}</TableCell>
                  <TableCell>{job.job_description}</TableCell>
                  <TableCell>{job?.match_score}</TableCell>
                  <TableCell>
                    <button style={{
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
      onClick={()=>{handleMatchScoreResponse(job.id)}}>View Analysis</button>
                  </TableCell>
                  {/* <TableCell>{job.analysis ? job.analysis : 'N/A'}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    
  </div>
  );
};

export default FileUpload;