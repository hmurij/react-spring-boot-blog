import React, { useContext, useEffect, useRef } from "react";
import { Card, Form } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../SubmitButton";
import { useTranslation } from "react-i18next";

const PostUpdateForm = ({
  post,
  onSubmit,
  onPostDelete,
  isDeletingPost,
  isPostDeleted,
}) => {
  const textAreaRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  });

  return (
    <Formik
      initialValues={{
        content: post.content,
      }}
      validationSchema={Yup.object({
        content: Yup.string()
          .min(250, t("validation:atLeast", { number: 250 }))
          .max(5000, t("validation:lessThan", { number: 5000 }))
          .required(t("validation:required")),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Card className="boxShadow">
          <Card.Header className="fst-italic">{post.blogUser}</Card.Header>
          <Card.Body>
            <Card.Title className="fst-italic">{post.title}</Card.Title>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="my-2" controlId="content">
                <Form.Control
                  type="text"
                  name="content"
                  className="bg-white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                  disabled={
                    formik.isSubmitting || isDeletingPost || isPostDeleted
                  }
                  readOnly={
                    !(
                      authCtx.isLoggedIn &&
                      (authCtx.userName === post.blogUser ||
                        authCtx.authorities === authCtx.ROLES.admin)
                    )
                  }
                  isValid={
                    formik.touched.content &&
                    !formik.errors.content &&
                    formik.values.content &&
                    authCtx.isLoggedIn &&
                    (authCtx.userName === post.blogUser ||
                      authCtx.authorities === authCtx.ROLES.admin)
                  }
                  isInvalid={formik.touched.content && formik.errors.content}
                  ref={textAreaRef}
                  as="textarea"
                  style={{ overflow: "hidden" }}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.content}
                </Form.Control.Feedback>
              </Form.Group>

              {authCtx.isLoggedIn &&
                (authCtx.userName === post.blogUser ||
                  authCtx.authorities === authCtx.ROLES.admin) && (
                  <div className="d-flex mt-2 justify-content-end">
                    <SubmitButton
                      isSubmitting={formik.isSubmitting}
                      isDisabled={isDeletingPost || isPostDeleted}
                      name={t("update")}
                    />
                    <SubmitButton
                      variant="outline-danger"
                      type="button"
                      onClick={onPostDelete}
                      isSubmitting={isDeletingPost}
                      isDisabled={formik.isSubmitting || isPostDeleted}
                      name={t("delete")}
                    />
                  </div>
                )}
            </Form>
          </Card.Body>
          <Card.Footer className="d-flex text-muted">
            <div className="me-auto">{`${t("posted")}: ${post.createdOn}`}</div>
            <div>{`${t("edited")}: ${post.updatedOn}`}</div>
          </Card.Footer>
        </Card>
      )}
    </Formik>
  );
};

export default PostUpdateForm;
