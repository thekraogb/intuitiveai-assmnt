
const apiUrl = "http://localhost:5001/api/story"; 

export const generateCharacterStory = async (characterData) => {
  try {
    const response = await fetch(`${apiUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterData),
    });

    if (!response.ok) {
      throw new Error("Failed to generate story");
    }

    const data = await response.json();
    return data.story;
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};

