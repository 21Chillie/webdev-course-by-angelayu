-- Create a table to store available classes
CREATE TABLE class (
    id SERIAL PRIMARY KEY,   -- unique identifier for each class
    title VARCHAR(50)        -- class title (e.g., "Maths", "Physics")
);

-- Create an enrollment table to link students and classes (many-to-many relationship)
CREATE TABLE enrollment (
    student_id INTEGER REFERENCES student(id), -- foreign key referencing student table
    class_id INTEGER REFERENCES class(id),     -- foreign key referencing class table
    PRIMARY KEY (student_id, class_id)         -- composite primary key prevents duplicate enrollments
);

-- Insert a student (example: Jack Bauer)
INSERT INTO student (first_name, last_name)
VALUES ('Jack', 'Bauer');

-- Insert some classes into the class table
INSERT INTO class (title)
VALUES ('English Literature'), ('Maths'), ('Physics');

-- Enroll student with ID 1 (Jack Bauer) into English Literature (class_id 1) and Maths (class_id 2)
INSERT INTO enrollment (student_id, class_id)
VALUES (1, 1), (1, 2);

-- Enroll student with ID 2 into Maths (class_id 2) and Physics (class_id 3)
INSERT INTO enrollment (student_id, class_id)
VALUES (2, 2), (2, 3);

-- Select query to display enrollments with student and class details
SELECT
    e.student_id,    -- student ID from enrollment
    s.first_name,    -- student first name
    s.last_name,     -- student last name
    e.class_id,      -- class ID from enrollment
    c.title          -- class title
FROM
    enrollment e
JOIN student s ON
    s.id = e.student_id        -- join enrollment with student table
JOIN "class" c ON
    c.id = e.class_id;         -- join enrollment with class table
