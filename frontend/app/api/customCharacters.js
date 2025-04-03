const apiUrl = "http://localhost:5001/api/custom-character"; 

// Auth Store
import useAuthStore from "../store/authStore";

const getToken = () => {
  const token = useAuthStore.getState().token;
  return token;
};


// Create a new custom character
export const createCustomCharacter = async (characterData) => {
    try {
      const token = getToken();  
      const response = await fetch(`${apiUrl}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify(characterData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create character");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creating character", error);
      throw error;
    }
  };

// Get all custom characters
export const getAllCustomCharacters = async () => {
    try {
      const token = getToken();  
      const response = await fetch(`${apiUrl}/`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching characters", error);
      throw error;
    }
  };
  

// Get a custom character by id
export const getCustomCharacter = async (id) => {
    try {
      const token = getToken();  
      const response = await fetch(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching character", error);
      throw error;
    }
};
  

// Update an existing custom character
export const updateCustomCharacter = async (id, characterData) => {
    try {
      const token = getToken();  
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify(characterData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update character");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error updating character", error);
      throw error;
    }
  };
  

// Delete a custom character
export const deleteCustomCharacter = async (id) => {
    try {
      const token = getToken(); 
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete character");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting character", error);
      throw error;
    }
  };
  
