'use client';
import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmblaCarousel from './js/EmblaCarousel';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './css/embla.css';

interface Project {
  title: string;
  image: string;
  description: string;
  images: string[];
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const projects: Project[] = [
    {
      title: "Création d'un site de réservation en ligne pour restaurant",
      image: "/images/resto.png",
      description: "Création d'un site pour un restaurant factice avec formulaire de réservation et page de gestion des réservations. Avec une gestion admin des réservations et des utilisateurs.",
      images: ["/images/resto.png", "/images/resa.png", "/images/resa2.png", "/images/gestionresa.png", "/images/gestionuser.png", "/images/profil.png", "/images/bdd.png"],
    },
    {
      title: "Création d'un site vitrine portfolio",
      image: "/images/portfolio.png",
      description: "Création d'un site vitrine pour mon portfolio pour l'épreuve E5 du BTS SIO.",
      images: ["/images/portfolio.png"],
    },
    {
      title: "Création d'une application dekstop de suivi de film/série",
      image: "",
      description: "Création d'une application de suivi de film et série en C# avec une base de donnée en local qui permet de sauvegarder et catégoriser les films/séries en trois catégories : à voir, en cours et vu.",
      images: ["", ""],
    },
    {
      title: "Mise en place de la biométrie sur le réseau CEBFC",
      image: "/images/biometrie.png",
      description: "Projet en entreprise visant à mettre en place la biométrie pour l'authentification sur ordinateur de tous les utilisateurs de la Caisse d'Epargne de Bourgogne Franche Comté.",
      images: ["/images/biometrie.png"],
    },
    {
      title: "Brassage d'une baie",
      image: "/images/baie-de-brassage.jpg",
      description: "Brassage de certaines baies lors du déménagement du siège de la CEBFC dans le nouveau bâtiment à Dijon Valmy.",
      images: ["/images/baie-de-brassage.jpg", "/images/baie-de-brassage.jpg"],
    },
  ];

  const slides = projects.map((project, index) => ({
    key: `slide-${index}`,
    title: project.title,
    description: project.description,
    images: project.images,
  }));

  const preloadImages = (images: string[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  const handleImageClick = (index: number, images: string[]) => {
    preloadImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
            <li><a href="#exp" className="hover:text-primary text-foreground">Expérience professionnels</a></li>
            <li><a href="#tech-watch" className="hover:text-primary text-foreground">Veille technologique</a></li>
          </ul>
        </nav>
      </header>

      {/* Sections */}
      <main className="pt-20">
        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Colonne gauche - Photo et info principale */}
              <div className="text-center md:text-left space-y-6">
                <div className="relative inline-block">
                  <img
                    src="/images/avatar.png"
                    alt="Avatar"
                    className="w-64 h-64 rounded-full border-4 border-primary shadow-xl hover:scale-105 transition-transform duration-300 border-yellow-500"
                  />
                  
                </div>
                <h2 className="text-4xl font-bold text-foreground">Théo CHECLER</h2>
                <p className="text-xl text-gray-400">Étudiant en alternance - Développeur Junior</p>
              </div>

              {/* Colonne droite - Description et boutons */}
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-primary border-yellow-500">
                  <p className="text-foreground text-lg leading-relaxed">
                    Je suis un étudiant en BTS SIO passionné par le développement web et logiciel.
                    Actuellement en alternance à la Caisse d&apos;Epargne de Bourgogne Franche Comté, j&apos;aimerais continuer mes études pour aller vers un Bachelor en développement.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Statistiques */}
                  <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                    <div className="text-3xl font-bold text-primary">2</div>
                    <div className="text-sm text-gray-400">Années d&apos;expérience</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                    <div className="text-3xl font-bold text-primary">5+</div>
                    <div className="text-sm text-gray-400">Projets réalisés</div>
                  </div>
                </div>

                {/* Boutons avec hover effects */}
                <div className="flex space-x-4">
                  <button className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg w-1/2 hover:bg-gray-700 transition-colors group">
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <a href="/CV_CHECLER_Théo.pdf" className="text-white">Mon CV</a>
                  </button>
                  <button className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg w-1/2 hover:bg-blue-700 transition-colors group">
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.38-.02-3.16-1.93-3.16-1.93 0-2.23 1.51-2.23 3.06v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                    </svg>
                    <a href="https://www.linkedin.com/in/théo-checler-328bb0268/" target="_blank" className="text-white">LinkedIn</a>
                  </button>
                </div>
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
            <h2 className="text-4xl font-bold mb-4 text-foreground">Expériences professionnelles</h2>
            <div className="text-foreground mb-8">
              Durant mon alternance à la Caisse d&apos;Epargne de Bourgogne Franche Comté (CEBFC), j&apos;ai eu l&apos;opportunité de travailler sur divers projets et missions, validant ainsi plusieurs compétences requises pour le BTS SIO.
            </div>
            <div className="text-left space-y-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Configuration & Déploiement</h3>
                <p className="text-foreground mb-2">
                  Préparation et déploiement sur site du matériel informatique. Gestion des mobilités (arrivées, départs...).
                </p>
                <p className="text-sm text-gray-400 font-mono">Compétences validées : Gérer le patrimoine informatique, Mettre à disposition des utilisateurs un service informatique</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Maintenance</h3>
                <p className="text-foreground mb-2">
                  Gestion du parc et stock informatique de la CEBFC. Surveillance & maintenance des équipements réseaux/informatiques de la région.
                </p>
                <p className="text-sm text-gray-400 font-mono">Compétences validées : Gérer le patrimoine informatique, Répondre aux incidents et aux demandes d’assistance et d’évolution</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Support & Assistance</h3>
                <p className="text-foreground mb-2">
                  Gestion des tickets et des incidents informatiques. Assistance et accompagnement des collaborateurs.
                </p>
                <p className="text-sm text-gray-400 font-mono">Compétences validées : Répondre aux incidents et aux demandes d’assistance et d’évolution, Mettre à disposition des utilisateurs un service informatique</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Téléphonie</h3>
                <p className="text-foreground mb-2">
                  Gestion des lignes téléphoniques. Gestion du parc de téléphonie mobile.
                </p>
                <p className="text-sm text-gray-400 font-mono">Compétences validées : Gérer le patrimoine informatique</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-2xl font-semibold text-foreground mb-2">Projet</h3>
                <p className="text-foreground mb-2">
                  Mise en place de la biométrie pour l&apos;authentification sur ordinateur de tous les utilisateurs de la Caisse d&apos;Epargne de Bourgogne Franche Comté.
                </p>
                <p className="text-sm text-gray-400 font-mono">Compétences validées : Travailler en mode projet</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Watch Section */}
        <section id="tech-watch" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-foreground text-center">Veille technologique</h2>
            <h3 className="text-2xl font-semibold mb-6 text-primary">L&apos;Intelligence Artificielle en 2024</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4 text-foreground">Avancées Majeures</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <img src="/images/fleche.webp" alt="GPT Icon" className="w-6 h-6 mt-1" />
                    <div>
                      <span className="font-semibold text-primary">Modèles de langage (GPT-4)</span>
                      <p className="text-gray-300">Interactions plus naturelles, amélioration de la compréhension et génération de texte</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <img src="/images/fleche.webp" alt="Multimodal Icon" className="w-6 h-6 mt-1" />
                    <div>
                      <span className="font-semibold text-primary">Systèmes multimodaux</span>
                      <p className="text-gray-300">Traitement simultané de texte, images et audio (Google Lens, Tesla)</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <img src="/images/fleche.webp" alt="Sora Icon" className="w-6 h-6 mt-1" />
                    <div>
                      <span className="font-semibold text-primary">IA générative</span>
                      <p className="text-gray-300">Création d&apos;images et contenus multimédia (Sora, Midjourney)</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4 text-foreground">Focus sur l&apos;AI Act</h4>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Réglementation européenne entrée en vigueur le 1er août 2024, classifiant les IA selon leurs risques :
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span>Risque inacceptable : Interdiction totale</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span>Risque élevé : Exigences strictes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span>Risque limité : Information obligatoire</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span>Risque minimal : Pas de restriction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h4 className="text-xl font-semibold mb-4 text-foreground">Étude de cas : Le Système de Crédit Social Chinois</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-300 mb-4">
                    Système de surveillance et d&apos;évaluation des comportements citoyens utilisant l&apos;IA pour :
                  </p>
                  <ul className="space-y-2 text-gray-300 list-disc list-inside">
                    <li>Analyser les données comportementales</li>
                    <li>Attribuer des scores sociaux</li>
                    <li>Automatiser les sanctions et récompenses</li>
                    <li>Influencer les comportements sociaux</li>
                  </ul>
                </div>
                <div className="flex justify-center items-center">
                  <img src="/images/creditsocial.png" alt="Social Credit System" className="max-w-full h-auto rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
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
              className="bg-background p-8 rounded-lg shadow-lg max-w-3xl w-full relative text-foreground" // Agrandir la fenêtre du modal et arrondir les coins
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96"> {/* Utiliser une grille pour les images */}
                {selectedProject.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/path/to/placeholder.jpg"}
                    alt={`${selectedProject.title} ${index + 1}`}
                    className="w-full h-auto object-cover rounded cursor-pointer"
                    onClick={() => handleImageClick(index, selectedProject.images)}
                  />
                ))}
              </div>
              <p className="mt-4 text-justify">{selectedProject.description}</p> {/* Justifier le texte de description */}
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

      {/* Lightbox */}
      {lightboxOpen && selectedProject && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={selectedProject.images.map(src => ({ src }))}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}
    </div>
  );
}