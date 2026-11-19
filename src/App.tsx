import ScrollVideo from './components/ScrollVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Order from './components/Order';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="relative">
      <ScrollVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <div aria-hidden="true" className="h-[40vh]" />
          <About />
          <div aria-hidden="true" className="h-[30vh]" />
          <Work />
          <div aria-hidden="true" className="h-[24vh]" />
          <Order />
          <div aria-hidden="true" className="h-[24vh]" />
          <Contact />
        </main>
      </div>
    </div>
  );
}
