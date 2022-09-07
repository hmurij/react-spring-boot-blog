# Simple BLOG - Spring boot REST API

Simple demo blog with basic functionality such as JWT authentication, create/retrieve/update/delete
posts and comments.

## API Usage

You can query the Blog backend through a REST API.
This can be used for various operations such as creating new users,
signing in existing ones and creating, editing or deleting users posts and comments.

## Endpoints

### Sign in with username / email / password

You can sign in a user with an email and password by issuing an
HTTP `POST` request to the Auth `signup` endpoint.\
Method: `POST`\
Content-Type: `application/json`\
Endpoint: `http://localhost:8080/api/auth/signup` \
Request Body Payload sample

```
{
  "userName": "John Doe",
  "email": "john.doe@mail.com",
  "password": "12345"
}
```

A successful request is indicated by a `200 OK` HTTP status code.\
Error code: `422 Unprocessable Entity` HTTP status code on invalid username.

### Login with username and password

You can login in with an username and password by issuing an
HTTP `POST` request to the `login` endpoint.\
Method: `POST`\
Content-Type: `application/json`\
Endpoint: `http://localhost:8080/api/auth/login` \
Request Body Payload sample

```
{
  "userName": "John Doe",
  "password": "12345"
}
```

A successful request is indicated by a `200 OK` HTTP status code.\
Error code: `422 Unprocessable Entity` HTTP status code on invalid username or password.

### Get all posts

You can get all posts by issuing an
HTTP `GET` request to the `posts` endpoint.\
Method: `GET`\
Endpoint: `http://localhost:8080/api/posts` \
A successful request is indicated by a `200 OK` HTTP status code.

### Get post by id

You can get all post by id by issuing an
HTTP `GET` request to the `posts` endpoint.\
Method: `GET`\
Endpoint: `http://localhost:8080/api/posts/{id}` \
A successful request is indicated by a `200 OK` HTTP status code.\
Error code: `404 Not Found` HTTP status code if post not found.

### Create new post

You can create new post by issuing an
HTTP `POST` request to the `posts` endpoint. Authentication required.\
Method: `POST`\
Endpoint: `http://localhost:8080/api/posts` \
Request Body Payload sample

```
{
  "title": "New Post",
  "content": "Dummy text."
}
```

A successful request is indicated by a `201 Created` HTTP status code.

### Update post

You can update post by issuing an
HTTP `PUT` request to the `posts` endpoint. Authentication required.\
Method: `PUT`\
Endpoint: `http://localhost:8080/api/posts` \
Request Body Payload sample

```
{
  "title": "New Post",
  "content": "Dummy text."
}
```

A successful request is indicated by a `200 OK` HTTP status code.\
Error code: `404 Not Found` HTTP status code if post not found.

### Delete post by id

You can delete post by id by issuing an
HTTP `DELETE` request to the `posts` endpoint. Authentication required.\
Method: `DELETE`\
Endpoint: `http://localhost:8080/api/posts/{id}` \
A successful request is indicated by a `204 No Content` HTTP status code.

### Create new comment

You can create new comment by issuing an
HTTP `POST` request to the `comments` endpoint. Authentication required.\
Method: `POST`\
Endpoint: `http://localhost:8080/api/comments` \
Request Body Payload sample

```
{
  "id": 31,
  "content": "New comment"
}
```

A successful request is indicated by a `201 Created` HTTP status code.

### Update comment

You can update comments by issuing an
HTTP `PUT` request to the `comments` endpoint. Authentication required.\
Method: `PUT`\
Endpoint: `http://localhost:8080/api/comments` \
Request Body Payload sample

```
{
  "id": 208,
  "content": "Comment update"
}
```

A successful request is indicated by a `200 OK` HTTP status code.\
Error code: `404 Not Found` HTTP status code if comment not found.

### Delete comment by id

You can delete comment by id by issuing an
HTTP `DELETE` request to the `comments` endpoint. Authentication required.\
Method: `DELETE`\
Endpoint: `http://localhost:8080/api/comments/{id}` \
A successful request is indicated by a `204 No Content` HTTP status code.
