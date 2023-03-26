DROP TABLE IF EXISTS arranged_flowers CASCADE;

CREATE TABLE arranged_flowers (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  arrangement_id INT REFERENCES arrangements(id) ON DELETE CASCADE,
  flower_id INT REFERENCES flowers(id) ON DELETE CASCADE,
  stem_quantity INT NOT NULL
);

