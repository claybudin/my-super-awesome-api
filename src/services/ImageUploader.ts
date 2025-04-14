import fs from 'node:fs';
import axios, { type AxiosError } from 'axios';
import formData from 'form-data';
import { imgUploadApiKeyKeyEnvVar } from '../config';

export interface IImghippoResponseObject {
  data: { view_url: string };
}

export const ImageUploader = {
  upload: async (imagePath: string): Promise<string> => {
    console.log("imagePath:", imagePath);
    return "https://i.imghippo.com/files/cLJM4019xxY.png";
    
    const form = new formData();
    form.append('file', fs.createReadStream(imagePath));

    try {
      console.log("UPLOAD IMAGE TO IMG_HIPPO");
      const res = await axios.post<IImghippoResponseObject>(
        `https://api.imghippo.com/v1/upload?api_key=${imgUploadApiKeyKeyEnvVar}`,
        form,
      );
      return res.data.data.view_url;
    } catch (error) {
      const e = error as AxiosError;
      console.error("Catch Upload Error, e.response?.data:", e.response?.data);
      throw new Error('Error uploading image');
    }
  },
};
