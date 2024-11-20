const multer=require('multer')
const path=require('path')
const pdfparse=require('pdf-parse')
const axios = require('axios');
const fs = require('fs')
const { createClient } = require('@supabase/supabase-js');
const {GoogleGenerativeAI} = require("@google/generative-ai")
require('dotenv').config();
//including clientSupabase to fileController.js
const supabase = createClient("https://rlgifsvcrywsvyxxnltk.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZ2lmc3Zjcnl3c3Z5eHhubHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTA0MTQsImV4cCI6MjA0NzQ4NjQxNH0.N7scHOW0P48iWNeKyC-e0YP3x-E7c7d7op7N7j6RQyY");
const genAI= new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("Model is printed",model);
const prompt = "I'm developing a project that involves parsing text from resumes. I will provide you with the parsed text, and I need you to convert that information into structured JavaScript objects. Please ensure that the objects are formatted with keys and values, wrapped in curly braces, and separated by commas. The goal is for me to easily map over these objects in my frontend code. In the response text, i need you to provide me the data in the fields like Name, Education, Skills, Projects, Experience etc. Also make sure i get all the objects inside a single object called as 'aiResponse' and everything is inside of it and u dont need to mention ''''json' or anything just give me the direct object itself.";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage }).single('pdfFile');
async function extractWithGenerativeAI(parsedText) {
    console.log("The function extract WithGenerative AI is called");
    const prompt = `
        Extract the following information from the resume text:
        1. Projects: List of projects with brief descriptions
        2. Roles: Job titles or roles held
        3. Job Durations: Start and end dates for each role
        4. Skills: Categorized skills

        Return the result as a JSON object with the following structure:
        {   
            "skills": {
                "Frontend": ["React", "HTML", "CSS"],
                "Backend": ["Node.js", "Express.js"],
                "Database": ["MongoDB", "SQL"],
                "DevOps": ["Docker", "Kubernetes"],
                "Mobile": ["React Native", "Flutter"],
                "Other": ["Git", "Agile"]
            },
            "projects": [
                { "name": "Project Name", "description": "Brief project description" }
            ],
            "roles": [
                { "title": "Job Title", "company": "Company Name" }
            ],
            "jobDurations": [
                { "role": "Job Title", "startDate": "YYYY-MM", "endDate": "YYYY-MM or Present" }
            ]
        }
    `;
    try {
        console.log("The function extract WithGenerative AI is called");

        const result = `${prompt} ${parsedText}`;
        // Use genAI instead of model
        const aiResponse = await genAI.generateContent({ prompt: result });
       // return JSON.parse(aiResponse.candidates[0].content);//returning ai response
       return JSON.parse(aiResponse);
    } catch (error) {
        console.error("Error in AI response generation:", error.message);
        throw error;
    }
}


async function processResumes() {
    console.log("Function is executed:");
    try {
        // Step 1: Fetch records with resume URLs from the Supabase table
        const { data: resumes, error: fetchError } = await supabase
            .from('FirstTable') // 
            .select('id, resume_link'); // selecing the id and resume_link

        if (fetchError) throw fetchError;

        for (const resume of resumes) {
            const { id, resume_link } = resume;
           
            if (!resume_link) {
                console.log(`No resume URL found for record ID: ${id}`);
                continue;
            }
            console.log(`Processing resume for record ID: ${id}, ${resume_link}`);

            //Downloaded the pdf
            const response = await axios.get(resume_link, { responseType: 'arraybuffer' });
            const pdfBuffer = Buffer.from(response.data);
          
            //Parse the PDF content
            const parsedPDF = await pdfparse(pdfBuffer);
            const extractedText = parsedPDF.text;
            console.log("The extracted text are here",extractedText);
            //function call
           const finalResult=await extractWithGenerativeAI(extractedText);
            console.log(finalResult);
            console.log(`Extracted text for ID ${id}:`, extractedText.slice(0, 100)); // Preview text

            //Update the Supabase table with parsed text
            const { error: updateError } = await supabase
                .from('FirstTable')
                .update({ parsedResume: parsedPDF }) // Update the 'parseResume' field
                .eq('id', id); // Updated the specific record by ID

            if (updateError) throw updateError;

            console.log(`Record ID ${id} updated successfully.`);
        }
    } catch (error) {
        console.error('Error processing resumes:', error.message);
    }
}

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send('Error uploading file: ' + err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }       
        console.log('File uploaded:', req.file);
        const filePath=path.join(__dirname, '../uploads', req.file.filename);
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
                     console.log("result", result); 
                    console.log("I am getting error in that point:");
                    const aiResponse = await model.generateContent(result);
                    const aiResponsetext=aiResponse.response.candidates[0].content.parts
                    console.log('AI Response:', aiResponsetext); 
                    res.status(200).json({
                        message: 'File uploaded successfully!',
                        text: data.text,
                        aiResponse:aiResponsetext,
                    });
                    
                    // console.log(data.text);
                    
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Error processing PDF' });
                    console.error(error);

                });
        }); 
        // res.send('File uploaded successfully!');
        processResumes()
    });
};   