import React from 'react';
import { useLocation } from 'react-router-dom';
import { Chip, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Left = () => {
    const location = useLocation();
    const { skills, matchScore,projects,experience} = location.state || {};
    console.log("experience",experience)
    console.log("projject",projects)
    const knowledgeData = [
        { name: 'Frontend', value: 85 },
        { name: 'Backend', value: 70 },
        { name: 'Database', value: 75 },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Resume
            </Typography>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                Skills:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            color="primary"
                            backgroundColor="#19c399"
                            variant="outlined"
                            sx={{ marginBottom: 1 }}
                        />
                    ))
                ) : (
                    <Typography>No skills available</Typography>
                )}
            </Box>

            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', marginTop: '30px' }} sx={{
                fontSize: '0.8rem'
            }}>
                Candidate Competency Technical Analysis:
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                        label={`${matchScore || 85}%`}
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            backgroundColor: '#00CFCF',
                            color: '#000',
                            padding: '3px 5px',
                        }}
                    />
                    <Typography variant="h6" sx={{
                        fontSize: '0.8rem',
                        margin: '0px 5px'
                    }}>
                        Overall Rating
                    </Typography>
                </Box>
                <Box>

                    <Typography variant="body2" style={{ color: '#6C757D', marginLeft: 'auto' }}>
                      {experience}
                    </Typography>
                </Box>
            </Box>

            {/* Chart Section */}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={knowledgeData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 5  }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]}  />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00CFCF" barSize={40} />
                </BarChart>
            </ResponsiveContainer>

            <Box>
                <Typography variant='h4' sx={{
                    fontSize: '1rem',
                    margin: '10px 0px',
                    fontWeight: '900'
                }}>
                    Projects
                </Typography>
                {/* {projects.length > 0 && projects ? (
                    projects.map((project)=>(
                <Box>
                    <Typography variant='h3'
                        sx={{
                            fontSize: '1.3rem',
                            color: 'gray',
                            margin: '4px 0px',
                        }}
                    >
                       {project?.Name}
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: '0.8rem' }}>
                      {project?.Description}
                    </Typography>
                </Box>
               ))) :(<Typography>No skills available</Typography> )}  */}
                {/* <Box sx={{ margin: '10px 0px' }}>
                    <Typography variant='h3'
                        sx={{
                            fontSize: '1.3rem',
                            color: 'gray',
                            margin: '4px 0px',
                        }}
                    >
                        Streamer Heighlights
                    </Typography>
                    <Typography variant='h6' sx={{ fontSize: '0.8rem' }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto excepturi minima velit explicabo cumque in vero cupiditate deserunt accusantium provident porro, asperiores aliquid, aut id dicta! Temporibus, expedita corrupti. Non cumque sit quia praesentium ea rem similique nostrum vero qui sint. Nulla explicabo corporis sint consequatur ipsum natus quidem sed?
                    </Typography>
                </Box> */}
            </Box>


            <Box>
                <Typography
                    variant='h4'
                    sx=
                    {{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        margin: '4px 0px'
                    }}
                >
                    Categorized Technologies
                </Typography>
                <Box>
                    <Typography>Frontend</Typography>
                    <Box>
                    <Chip
                        label= 'Java Script'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'HTML'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'CSS'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'Bootstrap'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'React'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                    </Box>
                </Box>
                <Box>
                    <Typography>Backend</Typography>
                    <Chip
                        label= 'node js'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'express js'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'django'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                </Box>
                <Box>
                    <Typography>Database</Typography>
                    <Box>
                    <Chip
                        label= 'Mysql'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                             <Chip
                        label= 'Mongo'
                        color="primary"
                        variant="filled"
                        sx={{
                            fontSize: '0.8rem',
                            backgroundColor: '#e8f4f8',
                            color: 'blue',
                            margin:'3px'
                        }}
                    />
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Left;
