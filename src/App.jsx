import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Mentorships from "./components/Mentorships";
import Contributions from "./components/Contributions";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

function App() {
  return (
    <div className="bg-background text-text-primary selection:bg-accent selection:text-background relative overflow-hidden">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Mentorships />
        <Contributions />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
