import { supabase } from "./supabase.js";

let rating = 0;

/* ⭐ étoiles */
document.querySelectorAll("#stars span").forEach(star => {
  star.addEventListener("click", () => {
    rating = Number(star.dataset.value);
  });
});

/* 💬 formulaire */
const form = document.getElementById("formulaire-avis");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = form.querySelector("input").value;
  const message = form.querySelector("textarea").value;

  const { error } = await supabase
    .from("commentaires")
    .insert([
      {
        username,
        message,
        rating
      }
    ]);

  if (!error) {
    form.reset();
    loadComments();
  } else {
    console.log(error);
  }
});

/* 👀 afficher commentaires */
async function loadComments() {
  const { data } = await supabase
    .from("commentaires")
    .select("*")
    .order("created_at", { ascending: false });

  const top = document.getElementById("topComments");
  const bottom = document.getElementById("comments");

  if (!top || !bottom) return;

  top.innerHTML = "";
  bottom.innerHTML = "";

  data.forEach(c => {
    const box = document.createElement("div");

    box.innerHTML = `
      <b>${c.username}</b><br>
      ${c.message}<br>
      ⭐ ${c.rating ?? 0}/5
    `;

    box.style.padding = "10px";
    box.style.margin = "5px";
    box.style.borderRadius = "10px";
    box.style.background = "#222";
    box.style.color = "white";

    if (c.message.length < 50) {
      top.appendChild(box);

      setTimeout(() => {
        box.remove();
      }, 5000);
    } else {
      bottom.appendChild(box);
    }
  });
}

loadComments();
