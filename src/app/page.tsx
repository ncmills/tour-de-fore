import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  return (
    <>
      <Nav />
      <div id="main-content">
        <HomeClient />
      </div>
      <Footer />
    </>
  );
}
