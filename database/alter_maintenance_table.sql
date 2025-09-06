ALTER TABLE maintenance ADD COLUMN IF NOT EXISTS message TEXT DEFAULT '';
ALTER TABLE maintenance ADD COLUMN IF NOT EXISTS estimated_time TEXT DEFAULT '';
UPDATE maintenance SET message = '' WHERE message IS NULL OR message = '';
UPDATE maintenance SET estimated_time = '' WHERE estimated_time IS NULL OR estimated_time = '';