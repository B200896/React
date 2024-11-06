const multer = require('multer');
const path = require('path');
const pdfparse = require('pdf-parse');
const fs = require('fs');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_KEY; // Your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase,"supabasekey......")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const prompt = "I'm developing a project that involves parsing text from resumes. I will provide you with the parsed text, and I need you to convert that information into structured JavaScript objects. Please ensure that the objects are formatted with keys and values, wrapped in curly braces, and separated by commas. The goal is for me to easily map over these objects in my frontend code. In the response text, i need you to provide me the data in the fields like Name, Education, Skills, Projects, Experience etc. Also make sure i get all the objects inside a single object called as 'aiResponse' and everything is inside of it and u dont need to mention ''''json' or anything just give me the direct object itself.";

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
            return res.status(400).send('Error uploading file: ' + err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        console.log('File uploaded:', req.file);
        const filePath = path.join(__dirname, '../uploads', req.file.filename);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found.' });
        }

        fs.readFile(filePath, (err, dataBuffer) => {
            if (err) {
                return res.status(500).json({ error: 'Error reading the PDF file.' });
            }

            pdfparse(dataBuffer)
                .then(async (data) => {
                    const result = `${prompt} ${data.text}`;
                    const aiResponse = await model.generateContent(result);

                    // Extract the AI response text
                    const aiResponsetext = aiResponse.response.candidates[0].content.parts[0].text;
                    console.log(aiResponsetext, "AI Response Text");

                    // Parse the JSON string into an actual object
                    try {
                        const parsedAIResponse = JSON.parse(aiResponsetext);  // Parse the JSON string

                        // Extract data from the parsed object
                        const resumeData = {
                            name: parsedAIResponse.aiResponse.Name || "Unknown Name",
                            education: parsedAIResponse.aiResponse.Education || null,
                            skills: parsedAIResponse.aiResponse.Skills || null,
                            Contact: parsedAIResponse.aiResponse.Contact || null,
                            experience: parsedAIResponse.aiResponse.Experience || null,
                        };

                        console.log(resumeData, "Parsed Resume Data");

                        // Insert into Supabase
                        const { data: insertData, error: insertError } = await supabase
                            .from('Resumes data') // Replace with your table name
                            .insert([resumeData]);

                        if (insertError) {
                            console.error('Error inserting data:', insertError);
                            return res.status(500).json({ error: 'Error storing data in Supabase.' });
                        }

                        // console.log('Data inserted:', insertData);
                        return res.status(200).json({
                            message: 'File uploaded and data stored successfully!',
                            text: data.text,
                            aiResponse: parsedAIResponse.aiResponse,
                        });

                    } catch (parseError) {
                        console.error('Error parsing AI response:', parseError);
                        return res.status(500).json({ error: 'Error parsing AI response.' });
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error processing PDF' });
                    console.error(error);
                });
        });
    });
};
