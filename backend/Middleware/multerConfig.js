// const multer=require('multer')
// const path = require('path')
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./uploads/')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+'-'+ Date.now() + path.extname(file.originalname))
//     }
// });
// const upload=multer({
//     storage:storage,
//     limits:{fieldSize:5*1024*1024},
//     fileFilter:(req,file,cb)=>{
//         const filetypes='/pdf/';
//         const extnames=filetypes.test(path.extname(file.originalname).toLowerCase())
//         const mimetype=filetypes.test(file.mimetype)
//         if(extnames && mimetype) {
//             return cb("null",true)
//         } else{
//             cb(new Error('Only pdf files'))
//         }
//     }
// }).single('pdfFile')
// module.exports=upload;