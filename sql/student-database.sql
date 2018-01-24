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
(0), (20);

INSERT INTO students (username, user_password) VALUES
('Northcoder', 'password123');

SELECT kata_id, kata_name, test_scores.test_score FROM katas JOIN test_scores ON katas.kata_id = test_scores_id;


SELECT * FROM katas;
SELECT * FROM test_scores;
SELECT * FROM students;