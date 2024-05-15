"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SearchDesktop = () => {
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
    <div className="rounded-lg bg-white p-6">
      <form className="flex" onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Buscar restaurantes"
          className="border-none bg-[#F4F4F5] text-black focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleChange}
          value={search}
        />
        <Button
          size="icon"
          variant="default"
          className="aspect-square bg-[#FFB100]"
          type="submit"
        >
          <SearchIcon size={18} />
        </Button>
      </form>
    </div>
  );
};

export default SearchDesktop;
