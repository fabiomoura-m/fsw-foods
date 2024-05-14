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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();

  const handleLoginGithubClick = () => {
    signIn("github");
  };

  const handleLoginGoogleClick = () => {
    signIn("google");
  };

  const handleLogoutClick = () => {
    signOut();
  };
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-base">
                      Faça login na plataforma!
                    </DialogTitle>
                    <DialogDescription>
                      Conecte-se usando sua conta do Google ou Github.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row items-center justify-center gap-3">
                    <Button
                      variant="ghost"
                      className="border border-solid border-primary text-sm font-semibold text-primary"
                      onClick={handleLoginGithubClick}
                    >
                      <FaGithub className="mr-2" />
                      Github
                    </Button>
                    <Button
                      variant="ghost"
                      className="border border-solid border-primary text-sm font-semibold text-primary"
                      onClick={handleLoginGoogleClick}
                    >
                      <FaGoogle className="mr-2" />
                      Google
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <div className="py-6">
            <Separator />
          </div>
          <div className="space-y-1">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full text-sm font-normal"
              >
                <HomeIcon size={16} />
                Início
              </Button>
            </Link>
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
