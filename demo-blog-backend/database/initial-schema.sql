--
-- Drop database and user if exists.
--
DROP DATABASE IF EXISTS "spring-mvc-blog";
DROP USER IF EXISTS admin;

--
-- Create database and setup user.
--
CREATE DATABASE "spring-mvc-blog";
CREATE USER admin WITH PASSWORD 'admin';
grant all privileges on database "spring-mvc-blog" to admin;

--
-- Select database
--
\connect spring-mvc-blog;



