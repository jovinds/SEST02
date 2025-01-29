import { useState, useEffect } from "react";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <h1>Welcome to the post details page!</h1>
    </>
  );
}

export default PostDetails;
