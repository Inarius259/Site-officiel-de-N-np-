import { supabase } from "./supabase.js";

let rating = 0;

/* ⭐ ÉTOILES */
const stars = document.querySelectorAll("#stars span");

if (stars.length > 0) {
  stars.forEach(star => {
    star.addEventListener("click", () => {
      rating = Number(star.dataset.value);
      console.log("rating =", rating);
    });
  });
}

/* 💬 FORMULAIRE */
const form = document.getElementById("formulaire-avis");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.querySelector("input").value;
    const message = form.querySelector("textarea").value;

    console.log("ENVOI CLICK");
    console.log({ username, message, rating });

    const { error } = await supabase
      .from("commentaires")
      .insert([
        {
          username,
          message,
          rating
        }
      ]);

    if (error) {
      console.log("ERREUR SUPABASE:", error);
      return;
    }

    form.reset();
    loadComments();
  });
}

/* 👀 AFFICHAGE COMMENTAIRES */
async function loadComments() {
  const { data, error } = await supabase
    .from("commentaires")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("LOAD ERROR:", error);
    return;
  }

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

/* 🚀 CHARGEMENT INITIAL */
loadComments();
