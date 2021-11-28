CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE categories ADD COLUMN created_date DATE;
UPDATE categories SET created_date = CURRENT_DATE;
ALTER TABLE categories ALTER COLUMN created_date SET DEFAULT CURRENT_DATE;
ALTER TABLE categories ALTER COLUMN created_date SET NOT NULL;

ALTER TABLE questions ADD COLUMN created_date DATE;
UPDATE questions SET created_date = CURRENT_DATE;
ALTER TABLE questions ALTER COLUMN created_date SET DEFAULT CURRENT_DATE;
ALTER TABLE questions ALTER COLUMN created_date SET NOT NULL;

ALTER TABLE categories ADD COLUMN user_id UUID;
UPDATE categories SET user_id = uuid_generate_v4();
ALTER TABLE categories ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE questions ADD COLUMN user_id UUID;
UPDATE questions SET user_id = uuid_generate_v4();
ALTER TABLE questions ALTER COLUMN user_id SET NOT NULL;
