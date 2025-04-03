import CustomCharacter from "../models/CustomCharacter.js";

// Create a new character
export const createCharacter = async (req, res) => {
    try {
      const { name, species, status, gender, origin, image, backstory } = req.body;
      const character = new CustomCharacter({
        name,
        species,
        status,
        gender,
        origin,
        image,
        backstory,
        userId: req.user._id, 
      });
  
      await character.save();
      res.json({ message: "Character created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating character", error: error.message });
    }
  };
  

// Get all characters
export const getAllCharacters = async (req, res) => {
    try {
      const characters = await CustomCharacter.find({ userId: req.user._id }); 
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Error fetching characters", error: error.message });
    }
  };
  

// Get a single character by id
export const getCharacter = async (req, res) => {
    try {
      const character = await CustomCharacter.findById(req.params.id);
  
      if (!character) return res.status(404).json({ message: "Character not found" });
      if (character.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
      }
  
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Error fetching character", error: error.message });
    }
  };
  

// Update a character
export const updateCharacter = async (req, res) => {
    try {
      const character = await CustomCharacter.findById(req.params.id);
  
      if (!character) return res.status(404).json({ message: "Character not found" });
  
      if (character.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not authorized to update this character" });
      }
  
      const updatedCharacter = await CustomCharacter.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ message: "Character updated successfully", updatedCharacter });
    } catch (error) {
      res.status(500).json({ message: "Error updating character", error: error.message });
    }
  };
  
  // Delete a character
  export const deleteCharacter = async (req, res) => {
    try {
      const character = await CustomCharacter.findById(req.params.id);
  
      if (!character) return res.status(404).json({ message: "Character not found" });
  
      if (character.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this character" });
      }
  
      await CustomCharacter.findByIdAndDelete(req.params.id);
      res.json({ message: "Character deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting character", error: error.message });
    }
  };
  

