export const deleteCloudinaryImage = async (imageId: string): Promise<void> => {
    if (!imageId) {
      console.error("No imageId provided");
      return;
    }
  
    const cloudName = "dhl9zrcgp"; // Replace with your Cloudinary cloud name
    const uploadPreset = "first_project"; // Replace with your unsigned upload preset
  
    // Cloudinary API URL for deleting an image
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  
    // Prepare the data to send in the request
    const formData = new FormData();
    formData.append("public_id", imageId);
    formData.append("upload_preset", uploadPreset); // Unsigned upload preset
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Image deleted successfully:", result);
      } else {
        console.error("Error deleting image:", result);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };
  
  