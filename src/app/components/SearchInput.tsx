"use client";

import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (window.google && !autocompleteService.current) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }
  }, []);

  function handleSearch(term: string) {
    if (term && autocompleteService.current) {
      const request: google.maps.places.AutocompletionRequest = {
        input: term,
        // Specify other options here
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus,
        ) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        },
      );
    } else {
      setSuggestions([]);
    }
  }

  return (
    <div>
      <form>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </form>
      {suggestions.length > 0 && (
        <ul className="menu w-52 rounded-box bg-base-100 p-2 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="hover:bg-base-200"
              onClick={() => {
                setInput(suggestion.description);
                setSuggestions([]);
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
