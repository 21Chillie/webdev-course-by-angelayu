CREATE TABLE world_food (
id SERIAL PRIMARY KEY,
country VARCHAR(50),
rice_production FLOAT,
wheat_production FLOAT
);

SELECT
    wf.id,
    wf.country
FROM
    world_food wf
WHERE
    wf.country LIKE '%a'
