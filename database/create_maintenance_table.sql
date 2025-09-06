CREATE TABLE maintenance (
  id SERIAL PRIMARY KEY,
  is_enabled BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO maintenance (is_enabled) VALUES (FALSE);