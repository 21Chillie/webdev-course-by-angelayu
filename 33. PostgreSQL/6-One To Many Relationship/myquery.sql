CREATE TABLE homework_submission (
id SERIAL PRIMARY KEY.
mark INTEGER,
student_id INTEGER REFERENCES student(id)
);

INSERT
    INTO
    homework_submission (
        mark,
        student_id
    )
VALUES (
    98,
    1
),
(
    87,
    1
),
(
    88,
    1
)

SELECT
    s.id,
    s.first_name,
    s.last_name,
    hs.mark
FROM
    student s
JOIN homework_submission hs
ON
    s.id = hs.student_id;
