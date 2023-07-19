import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lozfjvoroskysrzsfrxa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvemZqdm9yb3NreXNyenNmcnhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3MzY2NzAsImV4cCI6MjAwNTMxMjY3MH0.OYwf258o-qtdBVQ8Cg5FMcmi6wAH9DW9JEK9IMTwQ3Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
