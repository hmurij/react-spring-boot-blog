import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "./SubmitButton";
import Banner from "./Banner";
import { deleteComment, updateComment } from "../lib/api";
import { useTranslation } from "react-i18next";

const Comment = ({ comment, onContentChange }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(null);
  const textAreaRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  });

  const updateHandler = (updatedComment, formikHelpers) => {
    setTimeout(() => {
      updateComment({ id: comment.id, ...updatedComment }, authCtx.token)
        .then(() => {
          setIsUpdated(true);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    }, 2000);
  };

  const deleteHandler = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteComment(comment.id, authCtx.token)
        .then(() => {
          setIsDeleted(true);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isDeleted) {
        setIsDeleted(false);
        onContentChange();
      }
      if (isUpdated) {
        setIsUpdated(false);
        onContentChange();
      }
      if (error) {
        setError(null);
      }
    }, 2000);
  }, [isDeleted, isUpdated, error]);

  return (
    <Formik
      initialValues={{
        content: comment.comment,
      }}
      validationSchema={Yup.object({
        content: Yup.string()
          .min(5, t("validation:atLeast", { number: 5 }))
          .max(1000, t("validation:lessThan", { number: 1000 }))
          .required(t("validation:required")),
      })}
      onSubmit={updateHandler}
    >
      {(formik) => (
        <>
          <Card className="mb-4 boxShadow">
            <Card.Header className=" d-flex justify-content-between">
              <div className="fst-italic">{comment.blogUser}</div>
              <div className="text-muted">{`${t("commented")}: ${
                comment.createdOn
              }`}</div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="my-2" controlId="content">
                  <Form.Control
                    ref={textAreaRef}
                    type="text"
                    name="content"
                    className="bg-white"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    disabled={
                      formik.isSubmitting ||
                      isDeleting ||
                      isDeleted ||
                      isUpdated
                    }
                    readOnly={
                      !(
                        authCtx.isLoggedIn &&
                        (authCtx.userName === comment.blogUser ||
                          authCtx.authorities === authCtx.ROLES.admin)
                      )
                    }
                    isValid={
                      formik.touched.content &&
                      !formik.errors.content &&
                      formik.values.content &&
                      authCtx.isLoggedIn &&
                      (authCtx.userName === comment.blogUser ||
                        authCtx.authorities === authCtx.ROLES.admin)
                    }
                    isInvalid={formik.touched.content && formik.errors.content}
                    as="textarea"
                    style={{ overflow: "hidden" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
                {authCtx.isLoggedIn &&
                  (authCtx.userName === comment.blogUser ||
                    authCtx.authorities === authCtx.ROLES.admin) && (
                    <div className="d-flex mt-2 justify-content-end">
                      <SubmitButton
                        isSubmitting={formik.isSubmitting}
                        isDisabled={isDeleting || isDeleted || isUpdated}
                        name={t("update")}
                      />
                      <SubmitButton
                        variant="outline-danger"
                        type="button"
                        onClick={deleteHandler}
                        isSubmitting={isDeleting}
                        isDisabled={
                          formik.isSubmitting || isUpdated || isDeleted
                        }
                        name={t("delete")}
                      />
                    </div>
                  )}
              </Form>
            </Card.Body>
          </Card>
          {isUpdated && (
            <Banner
              className="text-success border-success mb-4"
              message={`${t("updatedBy", { type: "comment" })} ${
                authCtx.userName
              }`}
            />
          )}
          {isDeleted && (
            <Banner
              className="text-danger border-danger mb-4"
              message={`${t("deleteBy", { type: "comment" })} ${
                authCtx.userName
              }`}
            />
          )}
          {error && (
            <Banner
              className="text-danger border-danger mb-4"
              message={`${error.message}`}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default Comment;
