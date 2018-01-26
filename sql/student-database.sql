DROP DATABASE IF EXISTS student_database;

CREATE DATABASE student_database;

\c student_database;

CREATE EXTENSION pgcrypto;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  user_password VARCHAR,
  user_image VARCHAR
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
('Northcoder1', crypt('password1', gen_salt('bf', 8))), ('Northcoder', crypt('passFSGRDword1', gen_salt('bf', 8)));

INSERT INTO test_scores (test_score, kata_id, student_id) VALUES
(0,1,1), (20,2,1), (40,1,2), (60,2,2);



-- Get all students with kata name and score
-- SELECT students.username, kata_name, test_scores.test_score FROM katas 
-- JOIN test_scores ON katas.id = test_scores.kata_id
-- JOIN students ON students.id = test_scores.student_id;


-- Get an individual's kata's and scores
-- SELECT students.username, kata_name, test_scores.test_score FROM katas 
-- JOIN test_scores ON katas.id = test_scores.kata_id
-- JOIN students ON students.id = test_scores.student_id 
-- WHERE students.username = 'Northcoder'; 


-- update an individual kata score
-- UPDATE test_scores SET test_score = 100 FROM (SELECT students.username, kata_name, test_scores.test_score FROM katas 
-- JOIN test_scores ON katas.id = test_scores.kata_id
-- JOIN students ON students.id = test_scores.student_id 
-- WHERE students.id = 1) AS test_score WHERE id = 1;


-- authenticate the password for a user
-- SELECT * FROM students WHERE 
--     username='Northcoder' AND 
--     user_password = crypt('passFSGRDword1', user_password);


SELECT * FROM students;
SELECT * FROM katas;
SELECT * FROM test_scores;

-- table when incorrect password input
-- SELECT * FROM students WHERE 
--     username='Northcoder' AND 
--     user_password = crypt('padfsssFSGRDword1', user_password);