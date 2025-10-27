import React from "react";
import postServices from "../Appwrite/appwriteDatabase";
import authServices from "../Appwrite/appwriteAuth";
import fileServices from "../Appwrite/appwriteFiles";
import { PostForm, Container } from "../components/input";

function Addpost() {
  return (
    <Container>
      <PostForm />
    </Container>
  );
}

export default Addpost;
