import React from "react";
import { Box, LinearProgress, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom';
const Right = ({ matchScore }) => {
  const location = useLocation();
  const {missingSkills,skillcomparison,recommandation} = location.state || {}; 
  
  const knowledgeData = [
    { name: 'Frontend', value: 85 },
    { name: 'Backend', value: 70 },
  ];


  const data = [
    { skill: 'Java Script', requiredWeightage: 85, candidate_competency: 65, requiredWeightageColor: 'success' , candidate_competencyColor : 'primary' },
    { skill: 'Python', requiredWeightage: 85, candidate_competency: 65, requiredWeightageColor: 'success' , candidate_competencyColor : 'primary' },
    { skill: 'Html', requiredWeightage: 85, candidate_competency: 65, requiredWeightageColor: 'success' , candidate_competencyColor : 'primary' },
    { skill: 'Django', requiredWeightage: 85, candidate_competency: 65, requiredWeightageColor: 'success' , candidate_competencyColor : 'primary' },
    { skill: 'Css', requiredWeightage: 85, candidate_competency: 65, requiredWeightageColor: 'success' , candidate_competencyColor : 'primary' }
  ];
  

  const progress = 200

  return (
    <div >
      <div>
        <Typography variant="h6" color="text.secondary" style={{ fontSize: '14px', letterSpacing: '0.15rem', borderBottom: '2px solid #D3D3D3', paddingBottom: '8px' }}>
          Missing Skills
        </Typography>
        <ul class="list-disc pl-5"><li class="text-sm text-black">{missingSkills}</li></ul>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '2 rem', marginTop: '30px', borderBottom: '2px solid #D3D3D3', paddingBottom: '8px' }}>
          Recommendations
        </Typography>
        <Typography variant='h6' sx={{ fontSize: '0.8rem' }}>
                      {recommandation}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '2 rem', marginTop: '30px' }}>
          Category wise Score
        </Typography>
        <Box>
          {/* {data.map((item) => (
            <Box key={item.label} display="flex" alignItems="center" mb={2}>
              <Typography variant="body1" mr={2}>
                {item.label}
              </Typography>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={item.value} color="primary" />
              </Box>
              <Typography variant="body1">{item.value}%</Typography>
            </Box>
          ))} */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={knowledgeData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" fill="#00CFCF" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* <h3 class="mb-1 text-gray-300 md:text-lg mt-10">Missing Skills</h3> */}
      </div>

      <Box>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: '2 rem', marginTop: '30px', borderBottom: '2px solid #D3D3D3', paddingBottom: '8px' }}>Skill Comparison</Typography>
        {skillcomparison.map((item) => (
          <Box sx={{margin:'50px 0px'}}>
            <Typography variant="h5" sx={{fontSize:'1rem'}}>{item?.skillName}</Typography>
            <Box key={item.label} display="flex" alignItems="center" mb={2}>
              <Box sx={{ width: '100%', mr: 1 }}>
               <label>Required Weightage</label>
                <LinearProgress variant="determinate" sx={{
                  height: '15px',
                  borderRadius: '200px',
                  backgroundColor: 'lightgray',
                  margin:'6px 0px',
                  color:'#32cd32 !important' 
                }} value={item ?.
                  jobDescriptionWeightage
                  } color="success" />

                <label>Candidate Competency</label>
                <LinearProgress variant="determinate" sx={{
                  height: '15px',
                  borderRadius: '200px',
                  backgroundColor: 'lightgray',
                }} value={item['Comparison Score']}   />
              </Box>
              
              <Typography variant="body1">{item.jobDescriptionWeightage}</Typography>
            </Box>

          </Box>
        ))}
      </Box>


       <div style={{textAlign:'center',backgroundColor:'#f4f0f0',borderRadius:'15px',padding:'20px 0px'}}>
          <h4>Match Interpretation</h4>
          <h3 style={{'color':'blue',margin:'10px 0px'}}>Strong Match</h3>
       </div>

    </div>
  );
};

export default Right;
