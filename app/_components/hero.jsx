"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [logoTitle, setLogoTitle] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-full text-center">
      <h1 className="hero-heading p-1">An AI-Powered Logo Generator</h1>
      <p className="hero-subheading">Generate Logos in Seconds - Try Now!</p>
      <Link href="/create">
        <Button className="cursor-pointer h-10">
          Get Started
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
