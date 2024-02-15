import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,"./bloguploads/");
    },
    filename:(req,file,cb)=>{
// cb(null,new Date().toISOString()+file.originalname);
const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)    
 cb(null, uniquePrefix+'-'+file.originalname); 
    }
})

export const blogware=multer({storage:storage});