"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DashboardPage = () => {
  const { user } = useUser();
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`/api/getLogos?userId=${user.id}`)
      .then(({ data }) => {
        setLogos(data.logos);
      })
      .catch(console.error);
  }, [user]);

  const handleDownload = (imageSrc) => {
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = "logo.png";
    a.click();
    toast.success("Logo downloaded successfully");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Your Logos</h1>
      {logos.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {logos.map((logo, index) => (
            <div key={index} className="flex flex-col gap-4">
              <img src={logo} className="h-80 rounded-2xl" />
              <Button
                onClick={() => handleDownload(logo)}
                className="cursor-pointer"
              >
                Download <Download />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No logos generated yet.</p>
      )}
    </div>
  );
};

export default DashboardPage;
