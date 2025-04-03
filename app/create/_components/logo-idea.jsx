import { Input } from "@/components/ui/input";
import { lookup } from "@/data/lookup";

const LogoIdea = ({ idea, handleChange }) => {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-xl font-bold">{lookup.LogoIdeaHeading}</h1>
        <p className="text-sm text-gray-300 font-medium">
          {lookup.LogoIdeaSubHeading}
        </p>
      </div>
      <Input
        className="h-10 w-full mt-4"
        type="text"
        placeholder="Describe how you want your logo to look like..."
        value={idea}
        onChange={(e) => handleChange("idea", e.target.value)}
      />
    </div>
  );
};

export default LogoIdea;
