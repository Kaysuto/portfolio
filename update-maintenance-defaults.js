import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://100.79.95.114:8000';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzU1NjM3OTQ4LCJleHAiOjIwNzA5OTc5NDh9.ooNByjZ-M9a6fvLuVKM2nQwsKxAKfFpMNvD413L5f6E';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function updateDefaults() {
  console.log('Mise à jour des valeurs par défaut pour message et estimated_time...\n');

  try {
    const { error } = await supabase
      .from('maintenance')
      .update({ 
        message: '',
        estimated_time: ''
      })
      .eq('id', 1);

    if (error) {
      throw new Error(`Erreur lors de la mise à jour : ${error.message}`);
    }

    console.log('✅ Valeurs par défaut mises à jour avec succès!');

  } catch (error) {
    console.error('\n💥 Erreur critique lors de la mise à jour:', error.message);
    process.exit(1);
  }
}

updateDefaults();