import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class FileManagement {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  // ✅ Upload file to Appwrite Storage
  async createFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      console.error("Appwrite FileService :: createFile ::", error.message);
      return null;
    }
  }

  // ✅ Delete file by its ID
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite FileService :: deleteFile ::", error.message);
      return false;
    }
  }

  // ✅ Get public URL for image without transformations (works on free plan)
  getFilePreview(fileId) {
    try {
      // Use getFileView instead of getFilePreview to avoid image transformation limits
      return this.storage.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFilePreview/getFileView :: error", error.message);
      return null;
    }
  }
}

const fileServices = new FileManagement();
export default fileServices;
