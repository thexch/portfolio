'use client';
import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmblaCarousel from './js/EmblaCarousel'
import './css/embla.css'

interface Project {
  title: string;
  image: string;
  description: string;
  images: string[];
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Création d'un site de réservation en ligne pour un restaurant",
      image: "", // Chemin d'image vide
      description: "BLABLABLABLABLA TEST TEST TEST",
      images: ["", ""], // Chemins d'images vides
    },
    {
      title: "Création d'un site vitrine portfolio",
      image: "", // Chemin d'image vide
      description: "BLABLABLABLABLA TEST TEST TEST",
      images: ["", ""], // Chemins d'images vides
    },
    {
      title: "Création d'une application dekstop",
      image: "", // Chemin d'image vide
      description: "BLABLABLABLABLA TEST TEST TEST",
      images: ["", ""], // Chemins d'images vides
    },
    {
      title: "Projet 4",
      image: "", // Chemin d'image vide
      description: "BLABLABLABLABLA TEST TEST TEST",
      images: ["", ""], // Chemins d'images vides
    },
  ];

  const slides = projects.map((project, index) => ({
    key: `slide-${index}`,
    title: project.title,
    description: project.description,
    images: project.images,
  }));

  return (
    <div className="dark">
      <Head>
        <title>Portfolio | CHECLER Théo</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-navbar-background shadow z-50 backdrop-blur-md bg-opacity-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Théo CHECLER</h1>
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-primary text-foreground">À propos</a></li>
            <li><a href="#projects" className="hover:text-primary text-foreground">Mes projets</a></li>
            <li><a href="#skills" className="hover:text-primary text-foreground">Compétences</a></li>
            <li><a href="#tech-watch" className="hover:text-primary text-foreground">Veille technologique</a></li>
          </ul>
        </nav>
      </header>

      {/* Sections */}
      <main className="pt-20">
        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto flex items-center">
            <img src="/images/avatar.png" alt="Avatar" className="w-32 h-32 rounded-full mb-4" />
            <div className="flex flex-col mx-4">
              <p className="text-foreground mb-4">
                Je suis un étudiant en BTS SIO passionné par le développement web et logiciel. Bienvenue sur mon portfolio !
              </p>
              <div className="flex space-x-4 mt-auto">
                <button className="flex items-center bg-gray-800 text-white px-4 py-2 rounded w-32">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <a href="/path/to/cv.pdf" className="text-white">Mon CV</a>
                </button>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded w-32">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.38-.02-3.16-1.93-3.16-1.93 0-2.23 1.51-2.23 3.06v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                  </svg>
                  <a href="https://www.linkedin.com/in/monprofil" className="text-white">LinkedIn</a>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Mes projets</h2>
            <EmblaCarousel slides={slides} options={{ loop: true }} onSelectProject={setSelectedProject} />
          </div>
        </section>

        {/* Exp Section */}
        <section id="exp" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Expériences professionnels</h2>
            <p className="text-foreground">[Liste de vos exp pro]</p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Compétences</h2>
            <p className="text-foreground">[Liste de vos compétences ici]</p>
          </div>
        </section>

        {/* Tech Watch Section */}
        <section id="tech-watch" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Veille technologique</h2>
            <p className="text-foreground">[Détails de votre veille technologique ici]</p>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background p-8 rounded shadow-lg max-w-lg w-full relative text-foreground"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <div className="flex space-x-4 overflow-x-auto">
                {selectedProject.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/path/to/placeholder.jpg"}
                    alt={`${selectedProject.title} ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
              <p className="mt-4">{selectedProject.description}</p>
              <button
                className="mt-4 bg-primary text-white px-4 py-2 rounded"
                onClick={() => setSelectedProject(null)}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}