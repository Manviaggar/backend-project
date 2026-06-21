import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
// fs is filesystem, u need not import it, comes with node.js

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary= async (localfilepath)=> {
    try {
        if(!localfilepath) return null
        const response= await cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto"
        })
        //file has been uploaded successfully
        // console.log("file is uploaded on cloudinary", response.url);
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }
        return response;
    } catch (error) {
        console.log("Cloudinary upload failed:", error);

        if (localfilepath && fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }

        return null;
    }
}

export {uploadOnCloudinary}