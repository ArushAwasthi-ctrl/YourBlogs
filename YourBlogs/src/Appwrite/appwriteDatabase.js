import conf from "../conf/conf.js";
import { Client, TablesDB, ID, Query } from "appwrite";

class DatabaseServices {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userId }) {
    try {
      const newPost = await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: ID.unique(),
        data: {
          title, // required
          slug, // required
          content, // required
          FeaturedImage: featuredImage || null, // optional
          userId, // required
        },
      });
      return newPost;
    } catch (error) {
      console.error("Error creating new post:", error);
      return null;
    }
  }

  async updatePost(postId, { title, slug, content, featuredImage }) {
    try {
      const updatedPost = await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: postId,
        data: {
          ...(title && { title }),
          ...(slug && { slug }),
          ...(content && { content }),
          ...(featuredImage !== undefined && { FeaturedImage: featuredImage }),
        },
      });
      return updatedPost;
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  }

  async deletePost(postId) {
    try {
      return this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: postId,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      return null;
    }
  }

  async getPost(postId) {
    try {
      const post = await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        rowId: postId, // rowId = $id of the post
      });

      return post || null;
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return null;
    }
  }

  async getActivePosts() {
    try {
      const response = await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionId,
        queries: [Query.equal("status", "active")],
      });
      return response.rows || [];
    } catch (error) {
      console.error("Appwrite service :: getActivePosts :: error", error);
      return [];
    }
  }
}

const postServices = new DatabaseServices();
export default postServices;
