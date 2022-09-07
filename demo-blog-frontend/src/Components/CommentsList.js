import React from "react";
import Comment from "./Comment";

const CommentsList = ({ comments, onContentChange }) => {
  return comments.map((comment) => {
    return (
      <Comment
        onContentChange={onContentChange}
        key={comment.id}
        comment={comment}
      />
    );
  });
};

export default CommentsList;
