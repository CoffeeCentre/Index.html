import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Events from "@/pages/Events";
import Membership from "@/pages/Membership";
import Gallery from "@/pages/Gallery";
import Faq from "@/pages/Faq";
import Shop from "@/pages/Shop";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="events" element={<Events />} />
        <Route path="membership" element={<Membership />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="faq" element={<Faq />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
