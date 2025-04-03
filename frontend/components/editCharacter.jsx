"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateCustomCharacter } from "./../app/api/customCharacters.js";
import { Trash2 } from "lucide-react";

const EditCharacter = ({ character, onClose, onUpdate, onDelete }) => {
  const [editedCharacter, setEditedCharacter] = useState({ ...character });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter({
      ...editedCharacter,
      [name]: value,
    });
  };

  // Handle charcter update
  const handleSubmit = async () => {
    if (Object.values(editedCharacter).includes("")) {
      alert("All fields are required");
      return;
    }
    try {
      await updateCustomCharacter(character._id, editedCharacter);
      onUpdate({ ...editedCharacter, _id: character._id });
      onClose();
    } catch (error) {
      console.error("Error updating custom character", error);
    }
  };

  // Handle character deletion
  const handleDelete = () => {
    onDelete(character._id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl">Edit Character</h2>

          <button
            onClick={() => handleDelete()}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={editedCharacter.name}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
          <input
            type="text"
            name="species"
            value={editedCharacter.species}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
          <input
            type="text"
            name="status"
            value={editedCharacter.status}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
          <input
            type="text"
            name="gender"
            value={editedCharacter.gender}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
          <input
            type="text"
            name="origin"
            value={editedCharacter.origin}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
          <input
            type="text"
            name="image"
            value={editedCharacter.image}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
          <textarea
            name="backstory"
            value={editedCharacter.backstory}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />

          <div className="flex justify-between mt-4">
            <Button
              onClick={onClose}
              className="mx-2 border hover:border-white hover:bg-transparent focus:border-white focus:bg-transparent bg-transparent hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="mx-2 border hover:border-white hover:bg-transparent focus:border-white focus:bg-transparent bg-transparent hover:cursor-pointer"
            >
              Update Character
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCharacter;
