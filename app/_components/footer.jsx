import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <span>Made by</span>{" "}
      <Link
        href="https://github.com/joeldasari"
        target="_blank"
        className="font-bold"
      >
        Joel Dasari
      </Link>
    </div>
  );
};

export default Footer;
