import React from 'react'
import { Grid } from '@mui/material'  // Import Grid from MUI
import Left from './Left'
import Mid from './Mid'
import Right from './Right'
import { useLocation } from "react-router-dom";
const Dashboard = () => {
  const location = useLocation();
  const {
    state: {
      job,
      matchScore,
      analysis,
      skills,
      missingSkills,
      projects,
      skillComparison,
      recommendations,
    } = {},
  } = location || {};
  return (
    <>
      <h1 style={{ textAlign: 'center', borderBottom: '2px solid #ccc', padding: '30px' }}>
        Candidate Match Report
      </h1>
      <div>
        {/* Grid container with minimum height to allow scrolling */}
        <Grid container spacing={2} sx={{ minHeight: '100vh', paddingBottom: '20px',marginRight:'40px' }}>
          {/* Left Section shifted left with some margin */}
          <Grid item xs={12} sm={4} md={4} sx={{ borderRight: '2px solid #ccc', padding: '10px' }}>
            <Left />
          </Grid>

          {/* Mid Section taking the remaining space */}
          <Grid item xs={12} sm={4} md={4} sx={{ padding: '10px' }}>
            <Mid />
          </Grid>

          {/* Right Section shifted to the right */}
          <Grid item xs={12} sm={4} md={3} sx={{ padding: '10px' }}>
            <Right />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default Dashboard;