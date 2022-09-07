import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewCommentForm from "../Components/Forms/NewCommentForm";
import CommentsList from "../Components/CommentsList";
import PostUpdateForm from "../Components/Forms/PostUpdateForm";
import Loading from "../Components/Loading";
import { deletePost, getPostById, updatePost } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import AuthContext from "../store/auth-context";
import { useTranslation } from "react-i18next";

const PostPage = (props) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostUpdated, setIsPostUpdated] = useState(false);
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onPostUpdate = (updatedContent, formikHelpers) => {
    setTimeout(() => {
      updatePost(
        { id: post.id, content: updatedContent.content },
        authCtx.token
      )
        .then(() => {
          // console.log("Post updated");
          setIsPostUpdated(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    }, 1000);
  };

  const onPostDelete = () => {
    setIsDeletingPost(true);
    setTimeout(() => {
      deletePost(post.id, authCtx.token)
        .then(() => {
          setIsPostDeleted(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsDeletingPost(false);
        });
    }, 1000);
  };

  const fetchPostById = () => {
    setIsLoading(true);
    getPostById(id)
      .then((post) => {
        setPost(post);
        setComments(post.comments);
      })
      .catch((error) => {
        // console.log(Error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (isPostUpdated) {
        setIsPostUpdated(false);
        fetchPostById();
      }
      if (isPostDeleted) {
        setIsPostDeleted(false);
        navigate("/");
      }
    }, 1000);
  }, [isPostUpdated, isPostDeleted]);

  useEffect(() => {
    setTimeout(() => {
      fetchPostById();
    }, 1000);
  }, []);

  let content = <Loading />;

  if (error) {
    content = <Banner className="text-danger border-danger" message={error} />;
  }
  if (!isLoading && !error) {
    content = (
      <Col className="d-flex flex-column justify-content-center">
        <PostUpdateForm
          onSubmit={onPostUpdate}
          onPostDelete={onPostDelete}
          isDeletingPost={isDeletingPost}
          isPostDeleted={isPostDeleted}
          post={post}
        />
        {isPostUpdated && (
          <Banner
            className="text-success border-success mt-4"
            message={`${t("updatedBy", { type: "post" })} ${authCtx.userName}`}
          />
        )}
        {isPostDeleted && (
          <Banner
            className="text-danger border-danger mt-4"
            message={`${t("deleteBy", { type: "post" })} ${authCtx.userName}`}
          />
        )}

        {(authCtx.isLoggedIn || comments.length > 0) && (
          <div className="ms-2 mt-3 mb-2">
            <h5>{t("comments")}</h5>
          </div>
        )}

        {authCtx.isLoggedIn && (
          <NewCommentForm onContentChange={fetchPostById} postId={post.id} />
        )}
        <CommentsList onContentChange={fetchPostById} comments={comments} />
      </Col>
    );
  }

  return (
    <Container>
      <Row
        className="pt-4 d-flex justify-content-center"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        {content}
      </Row>
    </Container>
  );
};

export default PostPage;
