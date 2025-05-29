export const getCloudinaryUrl = async (imageFile: File): Promise<{ url: string | null, publicId: string | null }> => {
    if (!imageFile) return { url: null, publicId: null }; // Ensure a file is selected
    
    const data = new FormData();
    data.append("file", imageFile); // Append the file object
    data.append("upload_preset", "first_project");
    data.append("cloud_name", "dhl9zrcgp");
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dhl9zrcgp/image/upload", {
        method: "POST",
        body: data,
      });
  
      if (!response.ok) {
        console.error("Error uploading image: Server responded with status", response.status);
        return { url: null, publicId: null };
      }
  
      const uploadImageResponse: { url: string, public_id: string } = await response.json(); // Expecting a JSON response with `url` and `public_id`
  
      // Return both URL and public ID
      return {
        url: uploadImageResponse.url,
        publicId: uploadImageResponse.public_id,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      return { url: null, publicId: null };
    }
  };