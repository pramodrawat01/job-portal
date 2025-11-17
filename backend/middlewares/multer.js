import multer from "multer";

const storage = multer.diskStorage({
    destination : (req, res, cb)=>{
        cb(null, 'uploads/')
    },
    filename : (req, res, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})


const upload = multer({
    storage : storage,
    limits : {fileSize : 2 * 1024 * 1024},
    fileFilter  : (req, res, cb)=>{
        // only image files
        if(file.mimetype.startWith('image/')){
            cb(null, true)
        }
        else{
            cb(new Error('Only pdf files are allowed'), false)
        }
    }

})


export const multerErrorHandler = async(err, req, res, next)=>{
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            const error = new Error('File too large. Maximum size is 2MB')
            error.status = 400
            throw error
        }
        const error = new Error(err.message)
        error.status = 400
        throw error
        
    }
    else if(err){
        const error = new Error(err.message)
        error.status = 400
        throw error
    }

    next()

}

export default upload