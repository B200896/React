import React from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
// import { Gauge } from '@mui/x-charts/Gauge';
import { LinearProgress, Typography } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';


const Mid = () => {
  const location = useLocation();
  const { matchScore, analysis } = location.state || {};
  
  const progress = 0
  return (
    <>
      <div style={{borderBottom: '2px solid #D3D3D3', padding:'10px'}}>
        <h2>Match Score</h2>

        <div style={{ width: '200px', margin: 'auto' }}>
          <CircularProgressbar
            value={matchScore}
            maxValue={100}
            text={`${matchScore} / 100`}
            styles={{
              path: {
                stroke: '#007bff',
                strokeLinecap: 'round',
                transform: 'rotate(180deg)',
                transformOrigin: 'center center',
              },
              trail: {
                stroke: '#D3D3D3',
                strokeLinecap: 'round',
                transform: 'rotate(180deg)',
                transformOrigin: 'center center',
              },
              text: {
                fill: '#000',
                fontSize: '15px',
                fontWeight: 'bold',
              },
            }}
          />
        </div>
      </div>
      <div>
        <h4>Analysis</h4>
        <p style={{ borderBottom: '2px solid #D3D3D3', padding:'10px' }}>{analysis}</p>
        <div >
          <Typography variant="h6" color="text.secondary">
            Job Analysis:
          </Typography>
        </div>
        <h4>Associate Software Engineer</h4>
        <LinearProgress variant="determinate" value={progress}
          sx={{
            borderRadius: '50px',   // Round corners
            height: '30px',         // Set height of the progress bar
            '& .MuiLinearProgress-bar': {
              borderRadius: '50px',
              width: '50px'
              // Round corners of the progress bar itself
            },
          }} />
      </div>
    </>
  );
};

export default Mid;
