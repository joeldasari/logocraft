import { Button } from "@/components/ui/button";
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
      <Link href="/create">
        <Button className="cursor-pointer h-10">
          Sign In <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default Header;
