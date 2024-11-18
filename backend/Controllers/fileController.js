const multer = require('multer');
const path = require('path');
const pdfparse = require('pdf-parse');
const fs = require('fs');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "I'm developing a project that involves parsing text from resumes. I will provide you with the parsed text, and I need you to convert that information into structured JavaScript objects. Please ensure that the objects are formatted with keys and values, wrapped in curly braces, and separated by commas. The goal is for me to easily map over these objects in my frontend code. In the response text, I need you to provide me the data in the fields like Name, Education, Skills, Projects, Experience etc. Also make sure I get all the objects inside a single object called 'aiResponse' and everything is inside of it and you don't need to mention 'json' or anything just give me the direct object itself.";
const prompt = 
`I'm developing a project that involves parsing text from resumes. I will provide you with the parsed text, and I need you to convert that information into structured JavaScript objects. Please ensure that the objects are formatted with keys and values, wrapped in curly braces, and separated by commas. The goal is for me to easily map over these objects in my frontend code. In the response text, I need you to provide me the data in the fields like Name, Education, Skills, Projects, Experience, etc.
Additionally:
1. Please analyze the resume and categorize the skills into 'frontend', 'backend', and 'database' technologies. Place each skill under the appropriate category.
2. **Calculate the percentage distribution of skills across 'frontend', 'backend', and 'database' categories**. Use the total number of skills to determine the percentage for each category. Provide these percentages in an object format like:
{
  "frontend": '33.33%',
  "backend": '33.33%',
  "database": '33.33%'
}
3. Ensure that these percentages are part of the 'aiResponse' object and include them in your final response.

Make sure I get all the objects inside a single object called 'aiResponse'. Provide only the direct object itself without mentioning 'json' or additional formatting.`

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('pdfFile');

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err.message);
            return res.status(400).send('Error uploading file: ' + err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log('File uploaded:', req.file);
        const filePath = path.join(__dirname, '../uploads', req.file.filename);

        // Check if the file exists after upload
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Uploaded file not found.' });
        }

        fs.readFile(filePath, (err, dataBuffer) => {
            if (err) {
                console.error('Error reading file:', err.message);
                return res.status(500).json({ error: 'Error reading the PDF file.' });
            }
        
            // Parse the PDF text
            pdfparse(dataBuffer)
                .then(async (data) => {
                    const result = `${prompt} ${data.text}`;
                    try {
                        const aiResponse = await model.generateContent(result);
        
                        // Extract AI response text
                        let aiResponseText = aiResponse.response.candidates[0].content.parts[0].text;
                        console.log('AI Response Text:', aiResponseText);
        
                        // Remove the markdown code block formatting
                        aiResponseText = aiResponseText.replace(/```javascript/g, '').replace(/```/g, '').trim();
        
                        try {
                            // Parse the cleaned AI response as JSON
                            const parsedAIResponse = JSON.parse(aiResponseText);
        
                            // Extracting resume data from the parsed AI response
                            const resumeData = {
                                name: parsedAIResponse.aiResponse.Name || "Unknown Name",
                                education: parsedAIResponse.aiResponse.Education || null,
                                skills: parsedAIResponse.aiResponse.Skills || null,
                                Contact: parsedAIResponse.aiResponse.Contact || null,
                                experience: parsedAIResponse.aiResponse.Experience || null,
                                frontendSkills: parsedAIResponse.aiResponse.Skills.frontend || [],
                                backendSkills: parsedAIResponse.aiResponse.Skills.backend || [],
                                databaseSkills: parsedAIResponse.aiResponse.Skills.database || [],
                                skillDistribution: parsedAIResponse.aiResponse.SkillDistribution || null,
                            };
        
                            // console.log('Parsed Resume Data:', resumeData);
                            console.log("parsedAIResponsehhdhdhdh",parsedAIResponse.aiResponse)
                            
        
                            // Check for duplicates in the database based on 'name'
                            const { data: existingRecord, error: fetchError } = await supabase
                                .from('Resumes data')
                                .select('*')
                                .eq('name', resumeData.name);
        
                            if (fetchError) {
                                console.error('Error fetching data:', fetchError);
                                return res.status(500).json({ error: 'Error checking for duplicates.' });
                            }
        
                            if (existingRecord.length > 0) {
                                // Record already exists
                                return res.status(400).json({ message: 'Duplicate entry found. Record not inserted.' });
                            }
        
                            // Insert the parsed data into Supabase
                            const { data: insertData, error: insertError } = await supabase
                                .from('Resumes data') // Replace with your table name
                                .insert([resumeData]);
        
                            if (insertError) {
                                if (insertError.message.includes('duplicate key value violates unique constraint')) {
                                    console.error('Duplicate entry detected:', insertError.message);
                                    return res.status(400).json({ error: 'Duplicate entry found. Record not inserted.' });
                                } else {
                                    console.error('Error inserting data:', insertError);
                                    return res.status(500).json({ error: 'Error storing data in Supabase.' });
                                }
                            }
        
                            // Success
                            return res.status(200).json({
                                message: 'File uploaded and data stored successfully!',
                                aiResponse: parsedAIResponse.aiResponse,
                            });
                        } catch (parseError) {
                            console.error('Error parsing AI response:', parseError);
                            return res.status(500).json({ error: 'Error parsing AI response.' });
                        }
                    } catch (aiError) {
                        console.error('Error generating AI response:', aiError);
                        return res.status(500).json({ error: 'Error processing AI response.' });
                    }
                })
                .catch((error) => {
                    console.error('Error processing PDF:', error);
                    return res.status(500).json({ error: 'Error processing PDF file.' });
                });
        });
    });
};
