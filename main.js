import { supabase } from "./supabase.js";

const form = document.getElementById("formulaire-avis");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    const { error } = await supabase
      .from("comments")
      .insert([
        {
          username,
          message
        }
      ]);

    if (error) {
      console.log("Erreur Supabase :", error);
      return;
    }

    console.log("Commentaire enregistré ✅");

    form.reset();
  });
}
