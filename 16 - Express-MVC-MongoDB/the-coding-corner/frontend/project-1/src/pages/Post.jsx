import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

function Post() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          return navigate("/login");
        }

        const response = await fetch("http://localhost:3000/api/posts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          console.error(data.error || "Failed to retrieve posts.");
          throw new Error(`Failed: ${response.status}`);
        }

        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading || !posts) return <Spinner animation="border" variant="info" />;

  return (
    <>
      <h1>Welcome to the post page!</h1>
      {posts.map((post) => (
        <Card key={post._id}>
          <Card.Header>{post.author}</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Text>Likes: {post.likes}</Card.Text>
            <Button variant="primary" as={Link} to={`/posts/${post._id}`}>
              View Post Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Post;
