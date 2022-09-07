import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PostThumbnail = (props) => {
  const { t } = useTranslation();

  return (
    <Link
      to={"/post/" + props.post.id}
      as={NavLink}
      className="thumbnail text-decoration-none text-black"
    >
      <Card className="h-100 boxShadow">
        <Card.Header className="fst-italic">{props.post.blogUser}</Card.Header>
        <Card.Body>
          <Card.Title className="fst-italic">{props.post.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.post.content.slice(0, 200) + " . . ."}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex text-muted">
          <div className="me-auto">{`${t("posted")}: ${
            props.post.createdOn
          }`}</div>
          <div>{`${t("edited")}: ${props.post.updatedOn}`}</div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default PostThumbnail;
