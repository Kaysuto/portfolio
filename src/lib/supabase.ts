import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://100.79.95.114:8000'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzU1NjM3OTQ4LCJleHAiOjIwNzA5OTc5NDh9.ooNByjZ-M9a6fvLuVKM2nQwsKxAKfFpMNvD413L5f6E'

// Client Supabase principal
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Fonction pour récupérer les projets
export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error.message)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error.message)
    throw error
  }
}

// Fonction de diagnostic
export async function diagnoseSupabase() {
  try {
    // Test de connectivité basique
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // Test avec authentification
    const { data, error } = await supabase
      .from('projects')
      .select('count', { count: 'exact', head: true })

    if (error) {
      return { success: false, error: error.message, status: response.status }
    }

    return { success: true, count: data, status: response.status }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
