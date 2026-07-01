const res = { json: async () => ({ message: "TEST OK (fake)" }) };
const data = await res.json();
alert(data.message);

exports.handler = async (event) => {
  const data = JSON.parse(event.body || "{}");

  const email = data.email;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email requis" })
    };
  }

  try {
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

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: result.message || "Erreur Brevo"
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email ajouté avec succès" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur Netlify" })
    };
  }
};