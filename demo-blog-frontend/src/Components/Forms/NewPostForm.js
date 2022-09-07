import React, { useContext, useEffect, useRef } from "react";
import { Card, Col, Form } from "react-bootstrap";
import SubmitButton from "../SubmitButton";
import AuthContext from "../../store/auth-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const NewPostForm = ({ onSubmit, isSubmitted }) => {
  const textAreaRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    textAreaRef.current.style.height = "300px";
  });
  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, t("validation:atLeast", { number: 3 }))
          .max(30, t("validation:lessThan", { number: 30 }))
          .required(t("validation:required")),
        content: Yup.string()
          .min(250, t("validation:atLeast", { number: 250 }))
          .max(5000, t("validation:lessThan", { number: 5000 }))
          .required(t("validation:required")),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Col>
          <Card className="boxShadow">
            <Card.Header className="fst-italic">{`${t("newPostBy")} ${
              authCtx.userName
            }`}</Card.Header>
            <Card.Body className="m-2 pb-3 border rounded-3">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>{t("title")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("enterNewPostHere")}
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    disabled={isSubmitted}
                    isValid={
                      formik.touched.title &&
                      !formik.errors.title &&
                      formik.values.title
                    }
                    isInvalid={formik.touched.title && formik.errors.title}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="my-2" controlId="content">
                  <Form.Label>{t("content")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    disabled={isSubmitted}
                    isValid={
                      formik.touched.content &&
                      !formik.errors.content &&
                      formik.values.content
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
                <div className="d-flex justify-content-end">
                  <SubmitButton
                    isSubmitted={isSubmitted}
                    isSubmitting={formik.isSubmitting}
                    name={t("addNewPost")}
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default NewPostForm;
