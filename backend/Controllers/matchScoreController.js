const { calculateMatchScore } = require('../utils/matchScoreUtil');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fs = require('fs');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { stringify } = require('querystring');
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// New function to generate the altered job description based on the prompt
async function generateAlteredJobDescription(jobDescription) {
    
    const prompt = `
    Analyze the following job description and identify the key technologies or skills required.
    Assign a weightage (importance) to each skill on a scale of 1 to 10, where 10 is the most important.
    Consider factors such as:
    1. How frequently the skill is mentioned
    2. Whether it's listed as a "required" or "preferred" skill
    3. Its prominence in the job description (e.g., mentioned early or in a key section)
    4. Its relevance to the core responsibilities of the role
    5. The overall focus of the job (e.g., frontend-leaning, full-stack, backend-heavy)

    Provide a brief explanation for the weightage of each skill.

    Job Description:
    ${jobDescription}

    Return the result as a JSON object with the following structure:
    {
      "skills": [
        {
          "name": "Skill Name",
          "weightage": 8,
          "explanation": "Brief explanation for this weightage"
        },
        {
          "name": "Another Skill",
          "weightage": 6,
          "explanation": "Reason for this skill's importance"
        }
      ],
      "topCategories": ["Frontend", "Backend"],
      "jobTitle": "Extracted Job Title",
      "jobFocus": "Brief description of the job's primary focus"
    }

    Sort the skills array by weightage in descending order.
    Include the top 2-3 skill categories that best describe this job.
    Extract and include the job title from the description.
    Provide a brief description of the job's primary focus.

    Return only the JSON object, without any additional text or formatting.
    `;

    try {
        // Generate AI response for the altered job description analysis
        const aiResponse = await model.generateContent(prompt);

        // Clean up the response
        let aiResponsetext = aiResponse.response.candidates[0].content.parts[0].text;

        // Clean the AI response to extract the valid JSON object
        aiResponsetext = aiResponsetext
            .replace(/json|/g, '')   // Remove code block markers
            .replace(/^[^{]*\{/, '{') // Remove text before the first '{'
            .replace(/\}[^}]*$/, '}'); // Remove text after the last '}'

        // console.log("Cleaned Altered Job Description:", aiResponsetext);

        // Parse the cleaned AI response safely
        let parsedAIResponse;
        try {
            parsedAIResponse = JSON.parse(aiResponsetext);
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return { error: 'Error parsing AI response: Invalid JSON format.' };
        }

        // Return the altered job description
        return parsedAIResponse;
    } catch (error) {
        console.error('Error in generating altered job description:', error);
        return { error: 'Error processing job description.' };
    }
}

// Existing function to generate the match score
exports.generateMatchScore = async (req, res) => {
    const { resumeText } = req.body;
    const { data: jobDescriptions, error } = await supabase
        .from('Job_descriptions') // Table name
        .select('company_name, job_role, job_description, job_details, match_score') // Columns to select
    console.log("resumetxt",resumeText)
    if (!resumeText) {
        return res.status(400).json({ error: 'Both job description and resume text are required.' });
    }

    for(let job of jobDescriptions){

        try {
            console.log("job>>.>>>>>",job)
            // Step 1: Generate altered job description
            const alteredJobDescription = await generateAlteredJobDescription(job.job_description);
            console.log("alteredJobDescription",alteredJobDescription)
            if (alteredJobDescription.error) {
                return res.status(500).json({ error: alteredJobDescription.error });
            }

            // console.log("Altered Job Description:", alteredJobDescription);

            // Step 2: Use the altered job description in the result prompt
            const resultPrompt = `
            I am building an application that analyzes resumes based on job descriptions. I will provide both the job description and a resume. 
            Your task is to:
            1. Parse the resume to extract relevant information like Name, Education, Skills, Experience, etc.
            2. Provide a score that represents the match between the resume and job description.
            3. Analyze and compare the skills in the job description with those in the resume. Provide a score for each skill comparison (from 0 to 10, where 0 means no match, and 10 means an exact match).
            4. Identify any skills from the job description that are missing from the resume and provide suggestions for how to improve the resume to better match the job description.
            5. Ensure the response includes structured objects with fields like Name, Education, Skills, Projects, Experience, MatchScore, MissingSkills, Recommendations, and SkillComparison.
            6. The SkillComparison section should provide the following for each skill:
            - Skill Name
            - Job Description Weightage (for reference)
            - Resume Skill Score (how well the resume matches the skill)
            - Comparison Score (how closely the resume skill aligns with the job description skill)
            
            Please format your response as valid JSON. For example:
            {            
                "Skills": [ ... ],
                "MatchScore": 85,
                "MissingSkills": ["Substrate", "MPC (Multi-Party-Computation) & TSS"]
                "Analysis":"Based on the provided resume skills, there is a good overall match for a web development role, particularly for frontend development.
                "The candidate possesses a strong set of front-end skills, including React, HTML, CSS, Bootstrap, SASS, and jQuery. However, the backend skills are limited to JavaScript, Express.JS, and MongoDB. Without specific job requirements, it's difficult to determine the importance of backend skills for this role."
                "Recommendations": [
                    "Learn Substrate to align with the Web3/Blockchain focus.",
                    "Gain knowledge in MPC/TSS for better understanding of the company's tech stack."
                ],
                "SkillComparison": [
                    {
                        "skill": "Typescript",
                        "jobDescriptionWeightage": 10,
                        "resumeSkillScore": 9,
                        "comparisonScore": 8
                    },
                    {
                        "skill": "Full Stack Development",
                        "jobDescriptionWeightage": 9,
                        "resumeSkillScore": 8,
                        "comparisonScore": 7
                    },
                    ...
                ]
            }
            
            Consider the following job description and resume text:
            
            Job Description: ${JSON.stringify(alteredJobDescription)}
            
            Resume: ${JSON.stringify(resumeText)}
            `;
            

            // Generate AI response for the match score
            const aiResponse = await model.generateContent(resultPrompt);
            let aiResponsetext = aiResponse.response.candidates[0].content.parts[0].text;
            // console.log("aiResponse",aiResponse)
            // Clean up the AI response
            aiResponsetext = aiResponsetext
                .replace(/json|/g, '')   // Remove code block markers
                .replace(/^[^{]*\{/, '{')      // Remove text before first '{'
                .replace(/\}[^}]*$/, '}');     // Remove text after last '}'

            // console.log("Cleaned AI Response:", aiResponsetext);


            // get the data from job description table

            // Parse JSON safely
            try {
             
                let parsedAIResponse = JSON.parse(aiResponsetext);
                console.log(parsedAIResponse, "parsedAiresponse");
            
                // Ensure MatchScore is a valid number
                const matchScore = parsedAIResponse.MatchScore || 0; // Default to 0 if MatchScore is undefined
                console.log(typeof matchScore,"type of match score")
                console.log(matchScore,"match score")
                console.log(job.id,"job id>>>>")
                // Update the Job_descriptions table
                const { error: updateError } = await supabase
                    .from('Job_descriptions')
                    .update({
                        match_score: String(matchScore), // Ensure this is a valid number
                        job_details: parsedAIResponse, // Convert object to JSON string
                    })
                    .eq('job_description', job.job_description);
                    console.log(job.job_description,"job id>>>>")
            
                if (updateError) {
                    console.error('Error updating job description:', updateError);
                } else {
                    return res.status(200).json(parsedAIResponse);
                }
            } catch (error) {
                console.error('Error parsing AI response:', error);
                return res.status(500).json({ error: 'Error parsing AI response: Invalid JSON format.' });
            }

            // Map parsed response to resumeData object
            // const resumeData = {
            //     name: parsedAIResponse.Name || "Unknown Name",
            //     education: parsedAIResponse.Education || null,
            //     skills: parsedAIResponse.Skills || null,
            //     contact: parsedAIResponse.Contact || null,
            //     experience: parsedAIResponse.Experience || null,
            // };

            // console.log("Parsed Resume Data:", resumeData);

            // Calculate match score
            // const matchScore = calculateMatchScore(resumeData, alteredJobDescription);
            // console.log("Match Score:", matchScore);

            // Respond with the match score
            // return res.status(200).json({ matchScore });

        } catch (error) {
            console.error("Error in processing AI response:", error);
            return res.status(500).json({ error: 'Error processing AI response.' });
        }
}
};