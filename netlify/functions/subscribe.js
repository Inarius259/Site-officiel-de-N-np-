export default async (req) => {
  const { email } = await req.json();

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

  if (response.ok) {
    return new Response(JSON.stringify({ message: "Inscription réussie 🚀" }), { status: 200 });
  }

  return new Response(JSON.stringify({ message: "Erreur serveur" }), { status: 500 });
};
