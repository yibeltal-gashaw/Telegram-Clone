import toast from "react-hot-toast";

export async function uploadImageToCloudinary(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'Telegram-clone'); // Replace with your actual preset
  
    const resp = await fetch('https://api.cloudinary.com/v1_1/dyzeb4vxu/image/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await resp.json();
  
    if (!data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }
  
    return data.secure_url;
  }
  