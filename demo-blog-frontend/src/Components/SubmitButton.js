import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SubmitButton = ({
  isSubmitting,
  isSubmitted,
  isDisabled,
  name,
  variant,
  type,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-end">
      <Button
        variant={variant || "outline-primary"}
        className={`${isSubmitting ? "disabled button" : "button"} ms-1`}
        type={type || "submit"}
        disabled={isSubmitting || isSubmitted || isDisabled}
        onClick={onClick}
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className={`${!isSubmitting && "visually-hidden"}`}
        />
        <span className="ms-1">{!isSubmitting ? name : t("submitting")}</span>
      </Button>
    </div>
  );
};

export default SubmitButton;
