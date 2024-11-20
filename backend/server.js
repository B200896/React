const express = require('express');
const cors = require('cors');
const uploadRoutes=require('./Routes/fileRoutes');
const app= express();
const PORT=5000;
app.use(cors());
app.use('/api', uploadRoutes);//middleware
app.get('/', (req, res) => {
    res.send("Server is running");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});