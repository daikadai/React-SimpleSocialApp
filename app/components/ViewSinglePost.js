import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import Page from "./Page";

function ViewSinglePost(props) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`);
        console.log(response.data);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("There was a problem");
      }
    }
    fetchPost();
  }, []);

  if(isLoading) return <Page title="..."><LoadingDotsIcon /></Page>

  const date = new Date(post.createdDate);
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Page title={post.title}>
      <div className="container container--narrow py-md-5">
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          <span className="pt-2">
            <a href="#" className="text-primary mr-2" title="Edit">
              <i className="fas fa-edit"></i>
            </a>
            <a className="delete-post-button text-danger" title="Delete">
              <i className="fas fa-trash"></i>
            </a>
          </span>
        </div>

        <p className="text-muted small mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img
              className="avatar-tiny"
              src={post.author.avatar}
            />
          </Link>
          Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
        </p>

        <div className="body-content">
          {post.body}
        </div>
      </div>
    </Page>
  );
}

export default ViewSinglePost;
