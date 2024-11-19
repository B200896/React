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
async function processResumes() {
    console.log("Function is executed:");
    try {
        // Step 1: Fetch records with resume URLs from the Supabase table
        const { data: resumes, error: fetchError } = await supabase
            .from('FirstTable') // Replace with your table name
            .select('id, resume_link'); // Select the necessary fields

        if (fetchError) throw fetchError;

        for (const resume of resumes) {
            const { id, resume_link } = resume;
           
            if (!resume_link) {
                console.log(`No resume URL found for record ID: ${id}`);
                continue;
            }

            console.log(`Processing resume for record ID: ${id}, ${resume_link}`);

            // Step 2: Download the PDF
            const response = await axios.get(resume_link, { responseType: 'arraybuffer' });
            const pdfBuffer = Buffer.from(response.data);
          
            // Step 3: Parse the PDF content
            const parsedPDF = await pdfparse(pdfBuffer);
            const extractedText = parsedPDF.text;

            console.log(`Extracted text for ID ${id}:`, extractedText.slice(0, 100)); // Preview text

            // Step 4: Update the Supabase table with parsed text
            const { error: updateError } = await supabase
                .from('FirstTable')
                .update({ parsedResume: parsedPDF }) // Update the 'parseResume' field
                .eq('id', id); // Update the specific record by ID

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
                    // console.log("result", result); 
                    const aiResponse = await model.generateContent(result);
                    const aiResponsetext=aiResponse.response.candidates[0].content.parts
                    //console.log('AI Response:', aiResponsetext); 
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