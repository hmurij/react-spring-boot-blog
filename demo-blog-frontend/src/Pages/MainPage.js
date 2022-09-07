import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import PostThumbnailsList from "../Components/PostThumbnailsList";
import Loading from "../Components/Loading";
import { getAllPosts } from "../lib/api";

const MainPage = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getAllPosts().then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  return (
    <Container>
      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4 pb-4 justify-content-center"
        style={{
          marginTop: props.headerHeight,
          marginBottom: props.footerHeight,
        }}
      >
        {isLoading && <Loading />}
        {!isLoading && <PostThumbnailsList posts={posts} />}
      </Row>
    </Container>
  );
};

export default MainPage;
