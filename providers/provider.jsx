"use client";

import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

const Provider = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-h-[80vh] h-max py-8 px-8">{children}</div>
      <Footer />
    </>
  );
};

export default Provider;
