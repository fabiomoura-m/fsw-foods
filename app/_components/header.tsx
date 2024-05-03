import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.png" alt="FSW Foods" height={30} width={100} />
      </Link>
      <Button variant="ghost" size="icon">
        <MenuIcon />
      </Button>
    </div>
  );
};

export default Header;
