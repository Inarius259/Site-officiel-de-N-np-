import { supabase } from "./supabase.js";

// Ajouter un commentaire
export async function addComment(username, message) {
  const { error } = await supabase
    .from("commentaires")
    .insert([
      {
        username,
        message
      }
    ]);

  if (error) {
    console.log(error);
    return "Erreur";
  }

  return "OK";
}


export async function getComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}
