import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      // Appwrite expects positional args: userId, email, password, name?
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name || undefined
      );
      return user;
    } catch (error) {
      console.error("Error creating account:", error.message);
      return null;
    }
  }

  async loginAccount({ email, password }) {
    try {
      // Use positional args per Appwrite SDK
      const user = await this.account.createEmailPasswordSession(email, password);
      return user || null;
    } catch (error) {
      console.error("Login failed:", error.message);
      return null;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("No user session found:", error.message);
      return null;
    }
  }

  async logoutAccount() {
    try {
      // Delete only the current session
      await this.account.deleteSession('current');
      return true;
    } catch (error) {
      console.error("Logout failed:", error.message);
      return false;
    }
  }
}
const authServices = new AuthServices();
export default authServices;
