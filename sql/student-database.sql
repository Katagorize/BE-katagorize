DROP DATABASE IF EXISTS student_database;

CREATE DATABASE student_database;

\c student_database;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  user_password VARCHAR
);

CREATE TABLE katas (
  id SERIAL PRIMARY KEY,
  kata_name VARCHAR
);

CREATE TABLE test_scores (
  id SERIAL PRIMARY KEY,
  test_score INT NOT NULL,
  kata_id INT NOT NULL,
  student_id INT NOT NULL,
  FOREIGN KEY (kata_id) REFERENCES katas(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);



INSERT INTO katas (kata_name) VALUES
('pigLatin'), ('calculateDivisors');

INSERT INTO students (username, user_password) VALUES
('Northcoder1', 'password123'), ('Northcoder2', 'password123');

INSERT INTO test_scores (test_score, kata_id, student_id) VALUES
(0,1,1), (20,2,1), (40,1,2), (60,2,2);


SELECT kata_name, test_scores.test_score,students.username FROM katas 
JOIN test_scores ON katas.id = test_scores.kata_id
JOIN students ON students.id = test_scores.student_id;




SELECT * FROM katas;
SELECT * FROM students;
SELECT * FROM test_scores;