import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

function ProfileFolow(props) {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/${props.action}`,{cancelToken: ourRequest.token});
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("There was a problem");
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    }
  }, [username, props.action, props.isFollow]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img
              className="avatar-tiny"
              src={follower.avatar}
            />{" "} {follower.username}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFolow;
