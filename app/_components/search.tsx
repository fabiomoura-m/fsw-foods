"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Buscar restaurantes"
          className="border-none"
          onChange={handleChange}
          value={search}
        />
        <Button size="icon" className="aspect-square" type="submit">
          <SearchIcon size={18} />
        </Button>
      </form>
    </div>
  );
};

export default Search;
