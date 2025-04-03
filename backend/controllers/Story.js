

export const generateStory = async (req, res) => {
  const { name, species, origin, traits } = req.body;

  if (!name || !species || !origin) {
    return res.status(400).json({ error: "Missing required character details" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Generate a unique backstory based on the given information. Keep it concise and immersive.",
          },
          {
            role: "user",
            content: `Character Details:\n- Name: ${name}\n- Species: ${species}\n- Origin: ${origin}\n- Traits: ${traits || "Unknown"}.`,
          },
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    console.log("data:", data)
    const story = data.choices?.[0]?.message?.content || "No story generated.";

    res.status(200).json({ story });
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: "Failed to generate story" });
  }
};
