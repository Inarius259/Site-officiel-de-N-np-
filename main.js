import { supabase } from "./supabase.js";

const form = document.getElementById("formulaire-avis");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = form.querySelector("input").value;
  const message = form.querySelector("textarea").value;

  const { error } = await supabase
    .from("comments")
    .insert([
      {
        username,
        message
      }
    ]);

  if (error) {
    console.log(error);
    return;
  }

  form.reset();
  loadComments();
});

// afficher commentaires
async function loadComments() {
  const { data } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  const container = document.getElementById("comments");
  container.innerHTML = "";

  data.forEach(c => {
    container.innerHTML += `
      <div>
        <b>${c.username}</b>: ${c.message}
      </div>
    `;
  });
}

loadComments();
