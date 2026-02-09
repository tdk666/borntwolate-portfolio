-- Enable RLS on the table
ALTER TABLE art_stocks ENABLE ROW LEVEL SECURITY;

-- Policy: Public Read Access (Everyone can see stock)
CREATE POLICY "Public Read Access"
ON art_stocks
FOR SELECT
TO public
USING (true);

-- Policy: Admin Write Access (Only Authenticated/Service Role can update)
-- Assuming you use Supabase Auth and have an 'admin' role or just restrict to authenticated
-- For simple projects without complex auth, restricting to 'service_role' or authenticated users is a good start.
-- If you strictly want only the service_role (backend) to write:
CREATE POLICY "Service Role Update"
ON art_stocks
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- If you want authenticated users (e.g. if you log in as admin):
CREATE POLICY "Authenticated Update"
ON art_stocks
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: No Delete (Safety)
-- We simply DO NOT create a DELETE policy. By default, operations are denied if no policy exists.
-- Explicitly denying is not standard RLS syntax (it's whitelist based), so just NOT adding a DELETE policy covers it.
