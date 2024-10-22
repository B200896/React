const multer=require('multer')
const path=require('path')
const pdfparse=require('pdf-parse')
const fs = require('fs')
const {GoogleGenerativeAI} = require("@google/generative-ai")
require('dotenv').config();
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

    });
};   