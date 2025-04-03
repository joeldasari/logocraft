"use client";

import { colorPalettes, lookup } from "@/data/lookup";
import { useState } from "react";

const LogoPalette = ({ palette: defaultPalette, handleChange }) => {
  const [selectedPalette, setSelectedPalette] = useState(defaultPalette);
  const handleClick = (palette) => {
    setSelectedPalette(palette);
    handleChange("palette", palette);
  };
  return (
    <div>
      <h1 className="text-xl font-bold">{lookup.LogoPaletteHeading}</h1>
      <p className="text-sm text-gray-300 font-medium">
        {lookup.LogoPaletteSubHeading}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {colorPalettes.map((palette, index) => (
          <div
            key={index}
            className={`${
              selectedPalette === palette.name
                ? "border-4 border-accent-foreground"
                : "border-4"
            } p-2 rounded-2xl  cursor-pointer`}
            onClick={() => handleClick(palette.name)}
          >
            <div className="flex items-center border-2 rounded-2xl overflow-hidden">
              {palette?.colors.map((color, index) => (
                <div
                  key={index}
                  className="h-16 w-full md:h-24"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <p className="text-center text-sm mt-2">{palette.name}</p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoPalette;
