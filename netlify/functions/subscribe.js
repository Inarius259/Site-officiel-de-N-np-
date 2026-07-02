exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email requis" })
      };
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true
      })
    });

    const data = await response.text();

    if (!response.ok) {
      console.log("Brevo error:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erreur Brevo", error: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Inscription réussie 🚀" })
    };

  } catch (error) {
    console.log("Server error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur serveur Netlify", error: error.message })
    };
  }
};
