import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://qmzjrcqcikgrrrsfxdab.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjMzNTRmNzcwLTNlYTgtNDBhYi1iNzgxLTdlYmRiNmNiMDk0NCJ9.eyJwcm9qZWN0SWQiOiJxbXpqcmNxY2lrZ3JycnNmeGRhYiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1ODM3MzI1LCJleHAiOjIwOTExOTczMjUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.vslj148H44RlVFpkWQ6MBIFM31cdr7keuGVFYj9-o6Y';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };