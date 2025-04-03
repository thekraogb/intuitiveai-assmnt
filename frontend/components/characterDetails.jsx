"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateCharacterStory } from "./../app/api/story.js";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function CharacterDetails({ character, onClose }) {
  const [traits, setTraits] = useState("");
  const [story, setStory] = useState("");

  // Handle story generation
  const handleSubmit = async () => {
    const characterData = {
      name: character.name,
      status: character.status,
      species: character.species,
      origin: character.origin,
      location: character.location,
      traits,
    };

    try {
      const generatedStory = await generateCharacterStory(characterData);
      setStory(generatedStory);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-none max-w-md">
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-xl font-bold">
            {character.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <img
            src={character.image}
            alt={character.name}
            className="rounded-md w-40 h-40 border border-gray-700"
          />
          <p className="mt-2 text-gray-400">Status: {character.status}</p>
          <p className="text-gray-400">Species: {character.species}</p>
          <p className="text-gray-400">Origin: {character.origin}</p>
          <p className="text-gray-400">Location: {character.location}</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm text-gray-300 mb-1">
            Enter Character Traits
          </label>
          <Input
            type="text"
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
            placeholder="E.g., Brave, mysterious..."
            className="bg-gray-800 text-white border-gray-700"
          />
        </div>
        {story && (
          <div className="mt-4 text-gray-300">
            <h3 className="font-bold mb-2">Character Story:</h3>
            <p className="border border-gray-700 rounded-sm p-4 mt-4 h-48 overflow-y-auto">
              {story}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleSubmit}
            className="mx-2 border hover:border-white hover:bg-gray-700 focus:border-white focus:bg-transparent bg-transparent hover:cursor-pointer"
          >
            Generate a backstory
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
