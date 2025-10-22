import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

class FileManagement {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteUrl);

    this.storage = new Storage(this.client);
  }
  async createFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile || null;
    } catch (error) {
      console.log("Error while creating FileId", error);
      return null;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error.message);
      return false;
    }
  }
  getFilePreview(fileId) {
    try {
      return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/preview`;
    } catch (error) {
      console.error(
        "Appwrite service :: getFilePreview :: error",
        error.message
      );
      return null;
    }
  }
}
