import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../SubmitButton";
import Banner from "../Banner";
import AuthContext from "../../store/auth-context";
import { submitNewComment } from "../../lib/api";
import { useTranslation } from "react-i18next";

const NewCommentForm = ({ postId, onContentChange }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const authCtx = useContext(AuthContext);
  const textAreaRef = useRef(null);
  const { t } = useTranslation();

  const onSubmit = (comment, formikHelpers) => {
    setTimeout(() => {
      submitNewComment({ id: postId, ...comment }, authCtx.token)
        .then(() => {
          formikHelpers.resetForm();
          setIsSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          formikHelpers.setSubmitting(false);
        });
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isSubmitted) {
        setIsSubmitted(false);
        onContentChange();
      }
    }, 2000);
  }, [isSubmitted]);

  useEffect(() => {
    textAreaRef.current.style.height = "100px";
  });

  return (
    <Formik
      initialValues={{
        content: "",
      }}
      validationSchema={Yup.object({
        content: Yup.string()
          .min(5, t("validation:atLeast", { number: 5 }))
          .max(1000, t("validation:lessThan", { number: 1000 }))
          .required(t("validation:required")),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <Card className="mb-4 py-2 px-3 bg-light boxShadow">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-2" controlId="content">
                <FloatingLabel label={t("addNewComment")}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="content"
                    ref={textAreaRef}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    isValid={
                      formik.touched.content &&
                      !formik.errors.content &&
                      formik.values.content
                    }
                    isInvalid={formik.touched.content && formik.errors.content}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.content}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <div className="d-flex mb-2 justify-content-end">
                <SubmitButton
                  // isSubmitted={isSubmitted}
                  isSubmitting={formik.isSubmitting}
                  name={t("addNewComment")}
                />
              </div>
            </Form>
          </Card>
          {isSubmitted && (
            <Banner
              className="text-success border-success mb-4"
              message={`${t("addedBy", { type: "comment" })} ${
                authCtx.userName
              }`}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default NewCommentForm;
