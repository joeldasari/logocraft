"use client";

import { Input } from "@/components/ui/input";
import { lookup } from "@/data/lookup";

const LogoTitle = ({ title, handleChange }) => {
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">{lookup.logoTitleHeading}</h1>
        <p className="text-sm text-gray-300 font-medium">
          {lookup.logoTitleSubHeading}
        </p>
      </div>
      <Input
        className="h-10 w-full mt-4"
        type="text"
        placeholder="Title of your logo"
        value={title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
    </div>
  );
};

export default LogoTitle;
