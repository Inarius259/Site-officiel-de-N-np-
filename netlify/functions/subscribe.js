export default async (event) => {
  try {
    const { email } = await event.json();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email requis" }), { status: 400 });
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        listIds: [1],
        updateEnabled: true
      })
    });

    const data = await response.text();

    if (!response.ok) {
      console.log(data);
      return new Response(JSON.stringify({ message: "Erreur Brevo" }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Inscription réussie 🚀" }), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Erreur serveur Netlify" }), { status: 500 });
  }
};
