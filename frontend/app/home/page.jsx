"use client";

import { useState, useEffect, useRef } from "react";
import { fetchCharacters } from "../api/characters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CustomCharacters from "./customCharacters";
import CharacterDetails from "../../components/characterDetails";

export default function Home() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("default"); // default chars or custom chars
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const timeoutRef = useRef(null);

  // Fetch characters based on page and search query
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters(page, search);
        setCharacters(data.characters);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    if (viewMode === "default") {
      getCharacters();
    }
  }, [page, search, viewMode]); // Re-fetch when page, search, or viewMode changes

  // Handle search change with debounce
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);

    clearTimeout(timeoutRef.current);

    // Set a new timeout to update search after 500ms delay
    timeoutRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

  // Handle pagination
  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-transparent p-4 text-center">
        <img
          src="/ram.png"
          alt="Rick and Morty"
          width={300}
          height={300}
          className="mx-auto mb-6"
        />
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-6 flex justify-center mb-8">
          <Input
            type="text"
            placeholder="Search characters"
            value={search}
            onChange={handleSearchChange}
            className="w-1/2 p-2 bg-gray-700 text-white"
          />
        </div>

        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setViewMode("default")}
            className="mx-2 border border-transparent hover:border-white hover:bg-transparent focus:border-white focus:bg-transparent bg-transparent"
          >
            Default Characters
          </Button>
          <Button
            onClick={() => setViewMode("custom")}
            className="mx-2 border border-transparent hover:border-white hover:bg-transparent focus:border-white focus:bg-transparent bg-transparent"
          >
            My Characters
          </Button>
        </div>

        {viewMode === "default" ? (
          <div>
            {/* Default characters section */}
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {characters.map((character) => (
                <Card
                key={character.id}
                className="p-2 bg-gray-800 text-white border-none cursor-pointer"
                onClick={() => setSelectedCharacter({
                  name: character.name,
                  image: character.image,
                  status: character.status,
                  species: character.species,
                  origin: character.origin.name,
                  location: character.location.name,
                })}
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

            <div className="flex justify-center mt-6">
              {/* Pagination */}
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
          </div>
        ) : (
          <CustomCharacters />
        )}
      </div>

      {selectedCharacter && (
  <CharacterDetails
    character={selectedCharacter}
    onClose={() => setSelectedCharacter(null)}
  />
)}

    </div>
  );
}