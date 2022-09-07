import React from "react";
import * as Yup from "yup";
import { Card, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import SubmitButton from "../SubmitButton";
import { useTranslation } from "react-i18next";

const RegistrationForm = (props) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .min(3, t("validation:atLeast", { number: 3 }))
          .max(15, t("validation:lessThan", { number: 15 }))
          .required(t("validation:required")),
        email: Yup.string()
          .email(t("validation:invalidEmail"))
          .required(t("validation:required")),
        password: Yup.string()
          .min(5, t("validation:atLeast", { number: 5 }))
          .max(15, t("validation:lessThan", { number: 15 }))
          .required(t("validation:required")),
      })}
      onSubmit={props.onSubmit}
    >
      {(formik) => (
        <Col sm={10} md={8} lg={6}>
          <Card className="roundedBorder boxShadow">
            <Card.Header className="fst-italic">
              {t("registrationForm")}
            </Card.Header>
            <Form
              className="m-2 p-4 border rounded-3"
              onSubmit={formik.handleSubmit}
            >
              <Form.Group className="mb-3" controlId="userName">
                <Form.Label>{t("userName")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("enterUserName")}
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  disabled={props.isSubmitted}
                  isValid={
                    formik.touched.userName &&
                    !formik.errors.userName &&
                    formik.values.userName
                  }
                  isInvalid={
                    (formik.touched.userName && formik.errors.userName) ||
                    formik.errors.register
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.userName}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.register}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>{t("email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("enterEmail")}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={props.isSubmitted}
                  isValid={
                    formik.touched.email &&
                    !formik.errors.email &&
                    formik.values.email
                  }
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("password")}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  disabled={props.isSubmitted}
                  isValid={
                    formik.touched.password &&
                    !formik.errors.password &&
                    formik.values.password
                  }
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <SubmitButton
                isSubmitted={props.isSubmitted}
                isSubmitting={formik.isSubmitting}
                name={t("register")}
              />
            </Form>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default RegistrationForm;
