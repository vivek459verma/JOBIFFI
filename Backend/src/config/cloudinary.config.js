import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const fileName = file.originalname.split(".")[0];
        return {
            folder: "resumes",
            resource_type: "raw",
            public_id: `${Date.now()}-${fileName}`,
        };
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Memory storage for fast parsing of form fields
// This is used when we want to process the DB part first and upload in background
const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

export { cloudinary, upload, memoryUpload };
