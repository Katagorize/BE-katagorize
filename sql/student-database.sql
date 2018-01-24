DROP DATABASE IF EXISTS student_database;

CREATE DATABASE student_database;

\c student_database;

CREATE TABLE katas (
  kata_id SERIAL PRIMARY KEY,
  kata_name VARCHAR
);

CREATE TABLE test_scores (
  test_scores_id SERIAL PRIMARY KEY,
  test_score INT DEFAULT 0
);


CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  username VARCHAR,
  user_password VARCHAR
);

INSERT INTO katas (kata_name) VALUES
('pigLatin'), ('calculateDivisors');

INSERT INTO test_scores (test_score) VALUES
(0), (0);

INSERT INTO students (username, user_password) VALUES
('Northcoder', 'password123');


SELECT * FROM katas;
SELECT * FROM test_scores;
SELECT * FROM students;