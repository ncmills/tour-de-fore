import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";

export const metadata = {
  title: "Shop | Tour de Fore",
  description: "Official Tour de Fore gear and swag.",
};

export default function ShopPage() {
  return (
    <>
      <Nav />
      <div id="main-content">
        <ShopClient />
      </div>
      <Footer />
    </>
  );
}
