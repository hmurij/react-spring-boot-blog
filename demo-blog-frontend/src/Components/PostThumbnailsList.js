import React from "react";
import PostThumbnail from "./PostThumbnail";

const PostThumbnailsList = (props) => {
  return props.posts.map((post) => {
    return <PostThumbnail key={post.id} post={post} />;
  });
};

export default PostThumbnailsList;
