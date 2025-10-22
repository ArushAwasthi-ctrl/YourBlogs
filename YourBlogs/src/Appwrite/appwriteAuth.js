import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setProject(conf.appwriteProjectId)
      .setEndpoint(conf.appwriteUrl);

    this.account = new Account(this.client);
  }

  async createAccount({ username, email, password }) {
    try {
      const user = await this.account.create({
        $id: ID.unique(),
        username,
        email,
        password,
      });
      return user;
    } catch (error) {
      console.error("Error creating account:", error.message);
      return null;
    }
  }

  async loginAccount({ email, password }) {
    try {
      const user = await this.account.createEmailPasswordSession({
        email,
        password,
      });
      if (user) {
        return user;
      }
      return null;
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
      await this.account.deleteSessions('current');
      return true;
    } catch (error) {
      console.error("Logout failed:", error.message);
      return false;
    }
  }
}
const authServices = new AuthServices();
export default authServices;
