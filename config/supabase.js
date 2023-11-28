import { createClient } from '@supabase/supabase-js'



const supabseUrl = 'https://kghwmldisvmmpecedajb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnaHdtbGRpc3ZtbXBlY2VkYWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMTc5MDMsImV4cCI6MjAxNjY5MzkwM30.CvfyM9Yhh-HGjka7hSNUpxtqqOuC_yiUMw54MJ1fzYY';

export const supabase = createClient(supabseUrl, supabaseAnonKey) 
    