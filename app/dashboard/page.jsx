"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
  const { user } = useUser();
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLogos = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const response = await axios.get(`/api/getLogos?userId=${user.id}`);
        setLogos(response.data.logos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [user]);

  const handleDownload = (imageSrc) => {
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = "logo.png";
    a.click();
    toast.success("Logo downloaded successfully");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 padding">
      <h1 className="text-xl font-bold">Your Logos</h1>

      {!loading && logos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {logos.map((logo, index) => (
            <div key={index} className="flex flex-col gap-4">
              <img src={logo} className="rounded-2xl border-2" />
              <Button
                onClick={() => handleDownload(logo)}
                className="cursor-pointer"
              >
                Download <Download />
              </Button>
            </div>
          ))}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <p>No logos generated yet.</p>
      )}
    </div>
  );
};

export default DashboardPage;
