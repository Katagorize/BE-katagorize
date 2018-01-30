DROP DATABASE IF EXISTS dfojj8di17q21p;

CREATE DATABASE dfojj8di17q21p;

\c dfojj8di17q21p;

CREATE EXTENSION pgcrypto;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  user_password VARCHAR NOT NULL,
  user_image VARCHAR
);

CREATE TABLE katas (
  id SERIAL PRIMARY KEY,
  kata_name VARCHAR,
  release_date DATE
);

CREATE TABLE test_scores (
  id SERIAL PRIMARY KEY,
  test_score INT NOT NULL,
  kata_id INT NOT NULL,
  student_id INT NOT NULL,
  test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (kata_id) REFERENCES katas(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);



INSERT INTO katas (kata_name) VALUES
('pigLatin'), ('calculateDivisors');

INSERT INTO students (username, user_password) VALUES
('katagorize-student', crypt('password1', gen_salt('bf', 8))), ('Christopher-Peers', crypt('passFSGRDword1', gen_salt('bf', 8)));

INSERT INTO test_scores (test_score, kata_id, student_id) VALUES
(0,1,1), (20,2,1), (40,1,2), (60,2,2);

-- Get all students with kata name and score
SELECT students.username, kata_name, test_scores.test_score FROM katas 
JOIN test_scores ON katas.id = test_scores.kata_id
JOIN students ON students.id = test_scores.student_id; 
-- Get an individual's kata's and scores
SELECT students.username, kata_name, test_scores.test_score FROM katas 
JOIN test_scores ON katas.id = test_scores.kata_id
JOIN students ON students.id = test_scores.student_id 
WHERE students.username = 'Christopher-Peers';


SELECT * FROM students;
SELECT * FROM katas;
SELECT * FROM test_scores;
