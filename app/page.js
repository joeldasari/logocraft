"use client";
import Hero from "@/app/_components/hero";
import { examples } from "@/data/lookup";
const Home = () => {
  return (
    <div className="padding flex flex-col items-start gap-4">
      <Hero />
      <h1 className="text-sm xl:text-xl mt-8 font-bold underline decoration-2 underline-offset-8">
        Example Logos
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {examples.map((example, index) => (
          <img
            className="rounded-2xl border-2"
            key={index}
            src={example}
            alt={`example-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
