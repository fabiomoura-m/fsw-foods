"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();

  const handleLoginClick = () => {
    signIn();
  };

  const handleLogoutClick = () => {
    signOut();
  };
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.png" alt="FSW Foods" height={30} width={100} />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {status === "authenticated" && data.user ? (
            <div className="pt-6">
              <div className="flex items-center gap-2">
                <Avatar>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                  <AvatarFallback>
                    {data.user?.name?.split(" ")[0][0]}
                    {data.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="font-semibold">{data.user?.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {data.user?.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-6">
              <h2 className="font-semibold">Olá. Faça seu login!</h2>
              <Button size="icon" onClick={handleLoginClick}>
                <LogInIcon />
              </Button>
            </div>
          )}
          <div className="py-6">
            <Separator />
          </div>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              Início
            </Button>
            {status === "authenticated" && data.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    Meus pedidos
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    Restaurantes favoritos
                  </Link>
                </Button>
              </>
            )}
          </div>
          <div className="py-6">
            <Separator />
          </div>
          {status === "authenticated" && data.user && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full text-sm font-normal"
                onClick={handleLogoutClick}
              >
                <LogOutIcon size={16} />
                Sair da conta
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
