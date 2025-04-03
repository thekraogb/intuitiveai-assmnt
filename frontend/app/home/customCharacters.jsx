"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  createCustomCharacter,
  getAllCustomCharacters,
  deleteCustomCharacter,
} from "../api/customCharacters";
import EditCharacter from "@/components/editCharacter";

export default function CustomCharacters() {
  // Set up pop up component state to add a new charater
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [customChar, setCustomChar] = useState({
    name: "",
    species: "",
    status: "",
    gender: "",
    origin: "",
    image: "",
    backstory: "",
  });
  const [customCharacters, setCustomCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Set up paginition
  const [page, setPage] = useState(1);
  const charactersPerPage = 20;
  const totalPages = Math.ceil(customCharacters.length / charactersPerPage);

  const handlePaginationChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  // Fetch custom characters
  useEffect(() => {
    const fetchCustomCharacters = async () => {
      try {
        const characters = await getAllCustomCharacters();
        setCustomCharacters(characters);
      } catch (error) {
        console.error("Error fetching custom characters", error);
      }
    };

    fetchCustomCharacters();
  }, []);

  // Handle add charcter form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomChar({
      ...customChar,
      [name]: value,
    });
  };

  // Handle add character form submission
  const handleSubmit = async () => {
    if (Object.values(customChar).includes("")) {
      alert("All fields are required");
      return;
    }

    try {
      const data = await createCustomCharacter(customChar);
      console.log(data);
      // Refetch the custom characters state
      const characters = await getAllCustomCharacters();
      setCustomCharacters(characters);
      setShowPopup(false);
      setCustomChar({
        name: "",
        species: "",
        status: "",
        gender: "",
        origin: "",
        image: "",
        backstory: "",
      });
    } catch (error) {
      console.error("Error creating custom character", error);
    }
  };

  const handleEditClick = (character) => {
    setSelectedCharacter(character);
    setShowEditPopup(true);
  };

  // Handle edit character functionality
  const handleUpdateCharacter = (updatedCharacter) => {
    console.log(updatedCharacter);
    setCustomCharacters((prev) =>
      prev.map((character) =>
        character._id === updatedCharacter._id
          ? { ...character, ...updatedCharacter }
          : character
      )
    );
  };

  const handleDeleteCharacter = async (characterId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this character?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCustomCharacter(characterId);
      setCustomCharacters((prev) =>
        prev.filter((character) => character._id !== characterId)
      );
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error deleting character", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center mt-5">
        <Button
          className="flex justify-center items-center w-15 h-15 rounded-md bg-transparent text-white border-2 border-gray-400 hover:bg-gray-700 focus:outline-none mt-5 mb-5"
          onClick={() => setShowPopup(true)}
        >
          <span className="text-4xl m-px p-px">+</span>
        </Button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
          <div className="bg-gray-800 p-8 rounded-lg w-96">
            <h2 className="text-white text-2xl mb-4">Add Custom Character</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={customChar.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
              <input
                type="text"
                name="species"
                placeholder="Species"
                value={customChar.species}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={customChar.status}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={customChar.gender}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
              <input
                type="text"
                name="origin"
                placeholder="Origin"
                value={customChar.origin}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={customChar.image}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />
              <textarea
                name="backstory"
                placeholder="Backstory"
                value={customChar.backstory}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
              />

              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => setShowPopup(false)}
                  className="mx-2 border hover:border-white hover:bg-transparent focus:border-white focus:bg-transparent bg-transparent hover:cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="mx-2 border hover:border-white hover:bg-transparent focus:border-white focus:bg-transparent bg-transparent hover:cursor-pointer"
                >
                  Add Character
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Characters Display */}
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {customCharacters
          .slice((page - 1) * charactersPerPage, page * charactersPerPage)
          .map((character, index) => (
            <Card
              onClick={() => handleEditClick(character)}
              key={index}
              className="p-2 bg-gray-800 text-white border-none hover:cursor-pointer"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-auto rounded-md"
              />
              <div className="p-4 mt-0 pt-0">
                <h3 className="text-lg font-semibold">{character.name}</h3>
                <p className="text-gray-400 mt-0">{character.status}</p>
                <p>{character.species}</p>
              </div>
            </Card>
          ))}
      </div>
      {/* Pagination */}
      {customCharacters.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={() => handlePaginationChange(page - 1)}
            disabled={page === 1}
            className="mx-2"
          >
            Previous
          </Button>
          <span className="mx-2">
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => handlePaginationChange(page + 1)}
            disabled={page === totalPages}
            className="mx-2"
          >
            Next
          </Button>
        </div>
      )}

      {/* Display edit charcter component */}
      {showEditPopup && (
        <EditCharacter
          character={selectedCharacter}
          onClose={() => setShowEditPopup(false)}
          onUpdate={handleUpdateCharacter}
          onDelete={handleDeleteCharacter}
        />
      )}
    </div>
  );
}
