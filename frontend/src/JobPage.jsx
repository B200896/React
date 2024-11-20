import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";

const JobPage = () => {
    
    const [jobDescription, setJobDescription] = useState("");

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    };

    const handleSubmit = () => {
        if (!jobDescription.trim()) {
            alert("Enter a valid job description");
        } else {
            alert("Job Description Submitted: " + jobDescription);
        }
    };

    return (
        <Container maxWidth="sm" style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Job Description
            </Typography>
            
            <TextField
                label="Job Description"
                variant="outlined"
                multiline
                rows={10}
                fullWidth
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                style={{ marginBottom: "20px" }}
            />
            
            {/* Set fixed width for the button */}
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
                size="large"
                style={{ padding: "10px", width: "200px", margin: "0 auto" }} // Reduce width
            >
                Submit
            </Button>
        </Container>
    );
};

export default JobPage;
