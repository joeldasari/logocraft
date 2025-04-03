import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Alfa_Slab_One } from "next/font/google";
import Link from "next/link";

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa-slab-one",
  subsets: ["latin"],
  weight: "400",
});

const Header = () => {
  return (
    <div className="header padding">
      <Link href="/">
        <h1 className="flex items-center">
          <img src="/favicon.png" className="size-6 xl:size-7" alt="logo" />

          <span className={`${alfaSlabOne.className} header-text`}>
            logocraft
          </span>
        </h1>
      </Link>
      <SignedOut>
        <Button className="cursor-pointer" asChild>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button className="cursor-pointer">Dashboard</Button>
          </Link>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "36px", // Adjust size
                  height: "36px",
                },
              },
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
