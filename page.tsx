import CarHero from "./components/CarHero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <CarHero />
      <div className="after-section">
        🚗 &nbsp; The road ahead is green.
      </div>
    </main>
  );
}
