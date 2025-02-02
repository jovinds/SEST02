import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function PostDetails() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userIsAuthor, setUserIsAuthor] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showAlert, setShowAlert] = useState(null);

  const handleShowAlert = (message, variant = "success") => {
    setShowAlert({ message, variant });
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          return navigate("/login");
        }

        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          handleShowAlert(data.error || "Failed to retrieve post.", "danger");
          throw new Error(`Failed: ${response.status}`);
        }

        const postDetails = await response.json();
        setPost(postDetails);
      } catch (error) {
        console.error("Failed:", error.message);
        handleShowAlert("An unexpected error occured.", "danger");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        return navigate("/login");
      }

      const updatedPost = {
        title: title !== "" ? title : post.title,
        author: post.author,
        description: description !== "" ? description : post.description,
      };

      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        const data = await response.json();
        handleShowAlert(data.error || "Failed to update post.", "danger");
        throw new Error(`Failed: ${response.status}`);
      }

      const data = await response.json();
      handleShowAlert(`${data.message} Redirecting...`);
      setTimeout(() => {
        navigate("/posts");
      }, 3000);
    } catch (error) {
      console.error("Failed:", error.message);
      handleShowAlert("An unexpected error occured.", "danger");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        return navigate("/login");
      }

      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        handleShowAlert(data.error || "Failed to delete post.", "danger");
        throw new Error(`Failed: ${response.status}`);
      }

      const data = await response.json();
      handleShowAlert(`${data.message} Redirecting...`);
      setTimeout(() => {
        navigate("/posts");
      }, 3000);
    } catch (error) {
      console.error("Failed:", error.message);
      handleShowAlert("An unexpected error occured.", "danger");
    }
  };

  if (isLoading) return <Spinner animation="border" variant="info" />;

  return (
    <>
      {showAlert && (
        <Alert variant={showAlert.variant}>{showAlert.message}</Alert>
      )}
      <h1>Welcome to the post details page!</h1>
      {userIsAuthor ? (
        <>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              defaultValue={post.title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter description"
              defaultValue={post.description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" className="m-2" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="danger" className="m-2" onClick={handleDelete}>
            Delete
          </Button>
        </>
      ) : (
        <Card key={post._id}>
          <Card.Header>{post.author}</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Text>Likes: {post.likes}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default PostDetails;
  