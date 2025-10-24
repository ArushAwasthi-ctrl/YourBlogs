import { Client, Databases, ID, Query } from 'appwrite';
import conf from '../conf/conf.js';

class DatabaseServices {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, userId }) {
    try {
      const newPost = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          slug,
          content,
          FeaturedImage: featuredImage || null,
          userId,
        }
      );
      return newPost;
    } catch (error) {
      console.error('Error creating new post:', error);
      return null;
    }
  }

  async updatePost(postId, { title, slug, content, featuredImage }) {
    try {
      const updatedPost = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          ...(title && { title }),
          ...(slug && { slug }),
          ...(content && { content }),
          ...(featuredImage !== undefined && { FeaturedImage: featuredImage }),
        }
      );
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  }

  async deletePost(postId) {
    try {
      return this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
    } catch (error) {
      console.error('Error deleting post:', error);
      return null;
    }
  }

  async getPost(postId) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId
      );
      return post || null;
    } catch (error) {
      console.error('Appwrite service :: getPost :: error', error);
      return null;
    }
  }

  async getActivePosts() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal('status', 'active')]
      );
      return response.documents || [];
    } catch (error) {
      console.error('Appwrite service :: getActivePosts :: error', error);
      return [];
    }
  }
}

const postServices = new DatabaseServices();
export default postServices;
