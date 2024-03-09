"use client";
import { useLoadScript } from "@react-google-maps/api";
import SearchInput from "./components/SearchInput";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      Search Location <SearchInput />
    </div>
  );
}
