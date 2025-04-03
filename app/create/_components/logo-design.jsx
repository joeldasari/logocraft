import { logoDesigns, lookup } from "@/data/lookup";

const LogoDesign = ({ design: defaultDesign, handleChange }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">{lookup.LogoDesignHeading}</h1>
      <p className="text-sm text-gray-300 font-medium">
        {lookup.LogoDesignSubHeading}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
        {logoDesigns.map((design, index) => (
          <div
            key={index}
            className={`${
              design.name === defaultDesign
                ? "border-4 border-accent-foreground"
                : "border-4"
            } flex flex-col items-center gap-2 p-2 border rounded-2xl cursor-pointer`}
            onClick={() => handleChange("design", design.name)}
          >
            <img
              src={design.image}
              alt={design.name}
              className="w-24 h-24 rounded-2xl border"
            />
            <p className="text-sm">{design.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDesign;
