'use client';
import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmblaCarousel from './js/EmblaCarousel';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import './css/embla.css';
import React from 'react';

interface Project {
  title: string;
  image: string;
  description: string;
  images: string[];
  technologies: string[];
}
const techLogos: { [key: string]: React.ReactElement } = {
  "React": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#61DAFB">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      <path d="M12 21.35a51.57 51.57 0 0 1-6.28-7.27 11.5 11.5 0 0 1-2.5-5.88 4.76 4.76 0 0 1 1.39-3.85A4.92 4.92 0 0 1 8.1 3C9.76 3 11.28 3.91 12 5.3c.72-1.39 2.24-2.3 3.9-2.3a4.92 4.92 0 0 1 3.49 1.35 4.76 4.76 0 0 1 1.39 3.85c-.04 2.12-.91 4.16-2.5 5.88A51.57 51.57 0 0 1 12 21.35Z" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  ),
  "PHP": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#777BB4">
      <path d="M12 5.5C5.271 5.5 0 8.355 0 12s5.271 6.5 12 6.5 12-2.855 12-6.5-5.271-6.5-12-6.5zm-1.246 2h1.31l-.416 2h1.17c.779 0 1.357.154 1.674.47.311.301.416.752.32 1.361l-.495 2.47h-1.337l.468-2.344c.055-.279.035-.485-.067-.617-.101-.132-.332-.198-.675-.198h-1.049l-.61 3.159h-1.309l1.006-5.301zm-3.494 0h2.579c1.391 0 2.027.673 1.92 1.873-.035.394-.167.773-.382 1.114-.244.388-.59.693-.988.876-.399.183-.934.27-1.586.27h-1.214l-.279 1.473H6.982l1.278-5.606zm8.741 0h1.31l-1.006 5.301h-1.31l1.006-5.301zm-7.847 1.171l-.409 2.159h1.062c.381 0 .692-.082.943-.245.251-.164.42-.401.505-.712.076-.276.071-.494-.02-.646-.09-.152-.288-.245-.586-.245H8.154v-.311z" />
    </svg>
  ),
  "TailwindCSS": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#06B6D4">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  "Laravel": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF2D20">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034h.001L5.377.32a.376.376 0 01.377 0L10.5 2.969l4.875-2.649a.378.378 0 01.377 0l4.875 2.649a.379.379 0 01.189.326v.374l3.398-1.96a.378.378 0 01.377 0l4.323 2.489c.088.05.142.143.142.244zm-7.781 8.039l-4.875 2.649a.38.38 0 01-.377 0L5.024 13.29v4.896l4.126 2.372v-5.534a.378.378 0 01.188-.326l4.323-2.49V5.604l-4.126 2.374v1.181a.378.378 0 01-.188.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L.533 21.429l4.126 2.374 4.875-2.649 4.875 2.649 4.126-2.374-4.323-2.489v-4.934a.378.378 0 01.188-.326l4.323-2.49v-1.181l-4.126-2.374v4.895l4.323 2.49v5.534l4.126-2.372V13.29l-4.875 2.649a.38.38 0 01-.377 0zm7.78-.528v-4.896l-4.127 2.374v4.896l4.127-2.374zm-4.893-2.841l4.127-2.374-4.127-2.374-4.127 2.374 4.127 2.374z" />
    </svg>
  ),
  "Blade": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF2D20">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm0 4.68L19.695 9 12 13.32 4.305 9 12 4.68zM4.2 11.32l7.2 4.16v7.040l-7.2-4.16v-7.040zm15.6 0v7.04l-7.2 4.16v-7.040l7.2-4.16z" />
    </svg>
  ),
  "MySQL": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#4479A1">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.976-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z" />
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3178C6">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  "C#": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#239120">
      <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zM9.426 7.12a5.55 5.55 0 011.985.38v1.181a4.5 4.5 0 00-2.25-.566 3.439 3.439 0 00-2.625 1.087 4.099 4.099 0 00-1.012 2.906 3.9 3.9 0 00.945 2.754 3.217 3.217 0 002.482 1.023 4.657 4.657 0 002.464-.634l-.004 1.08a5.543 5.543 0 01-2.625.555 4.211 4.211 0 01-3.228-1.297 4.793 4.793 0 01-1.212-3.409 5.021 5.021 0 011.365-3.663 4.631 4.631 0 013.473-1.392 5.55 5.55 0 01.12-.004 5.55 5.55 0 01.122 0zm5.863.155h.836l-.555 2.652h1.661l.567-2.652h.81l-.555 2.652 1.732-.004-.15.697H17.91l-.412 1.98h1.852l-.176.698h-1.816l-.58 2.625h-.83l.567-2.625h-1.65l-.555 2.625h-.81l.555-2.625h-1.74l.131-.698h1.748l.401-1.976h-1.826l.138-.697h1.826zm.142 3.345L15 12.6h1.673l.423-1.98z" />
    </svg>
  ),
  "WPF": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#5C2D91">
      <path d="M3.785 3.636L8.382 12l-4.597 8.364h2.201L9.744 13.7c.099-.182.144-.317.165-.436h.032c.014.119.05.269.165.436l3.758 6.664h2.201L11.468 12l4.597-8.364h-2.201L10.106 10.3c-.099.182-.144.317-.165.436h-.032c-.014-.119-.05-.269-.165-.436L5.986 3.636Z" />
    </svg>
  ),
  "Windows": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0078D4">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  ),
  "PowerApps": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#742774">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z M9 8v8l7-4z" />
    </svg>
  ),
  "Excel": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#217346">
      <path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.35 2.66q-.07.14-.12.28h-.02q-.02-.1-.12-.28L4.47 8.27H2.4l2.34 3.81-2.36 3.86h2.08zM14.25 21v-3H7.5v3zm0-4.5v-3.75H7.5v3.75zm0-5.25V7.5H7.5v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z" />
    </svg>
  ),
  "SharePoint": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0078D4">
      <path d="M10.764 18.553a5.082 5.082 0 01-4.792-3.532 4.498 4.498 0 01-2.428.715 4.546 4.546 0 01.002-9.092c.93 0 1.796.283 2.518.767A5.082 5.082 0 0110.764 4a5.082 5.082 0 014.7 3.277 4.433 4.433 0 012.192-.584 4.546 4.546 0 010 9.092c-.843 0-1.628-.255-2.284-.694a5.082 5.082 0 01-4.608 3.462m0-12.553a3.082 3.082 0 100 6.165 3.082 3.082 0 000-6.165m-7.22 4.5a2.546 2.546 0 110-5.092 2.546 2.546 0 010 5.092m14.112 0a2.546 2.546 0 110-5.092 2.546 2.546 0 010 5.092" />
    </svg>
  ),
};
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
      technologies: ["PHP", "TailwindCSS", "Laravel", "Blade", "MySQL", "DBeaver"],
    },
    {
      title: "Création d'un site vitrine portfolio",
      image: "/images/portfolio.png",
      description: "Création d'un site vitrine pour mon portfolio pour l'épreuve E5 du BTS SIO.",
      images: ["/images/portfolio.png"],
      technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    },
    {
      title: "Création d'une application dekstop de suivi de film/série",
      image: ".",
      description: "Création d'une application de suivi de film et série en C# avec une base de donnée en local qui permet de sauvegarder et catégoriser les films/séries en trois catégories : à voir, en cours et vu.",
      images: [".", "."],
      technologies: ["C#", "WPF", "XAML", "MVVM", "API TmDb"],
    },
    {
      title: "Mise en place de la biométrie sur le réseau CEBFC",
      image: "/images/biometrie.png",
      description: "Projet en entreprise visant à mettre en place la biométrie pour l'authentification sur ordinateur de tous les utilisateurs de la Caisse d'Epargne de Bourgogne Franche Comté.",
      images: ["/images/biometrie.png"],
      technologies: ["Windows", "Biométrie"],
    },
    {
      title: "Brassage d'une baie",
      image: "/images/baie-de-brassage.jpg",
      description: "Brassage de certaines baies lors du déménagement du siège de la CEBFC dans le nouveau bâtiment à Dijon Valmy.",
      images: ["/images/baie-de-brassage.jpg"],
      technologies: ["Réseau", "Baie de brassage"],
    },
    {
      title: "Création d'une application PowerApps de gestion d'inventaire et des projets",
      image: "/images/powerapps.png",
      description: "Création d'une application PowerApps pour faciliter la gestion de l'inventaire des équipements informatiques répértioriés sur des Excels.",
      images: ["/images/powerapps2.png", "/images/powerapps.png", "/images/powerapps3.png", "/images/powerapps4.png"],
      technologies: ["PowerApps", "Excel", "SharePoint"],
    },
  ];

  const slides = projects.map((project, index) => ({
    key: `slide-${index}`,
    title: project.title,
    description: project.description,
    images: project.images,
    technologies: project.technologies,
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="dark">
      <Head>
        <title>Portfolio | CHECLER Théo</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-navbar-background shadow z-50 backdrop-blur-md bg-opacity-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Théo CHECLER</h1>

            {/* Bouton menu hamburger pour mobile */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Menu desktop */}
            <ul className="hidden md:flex space-x-6"> {/* Ajout de "hidden md:flex" */}
              {["À propos", "Parcours scolaire", "Mes projets", "Expériences professionnelles", "Veille technologique"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item === "À propos" ? "about" :
                      item === "Parcours scolaire" ? "education" :
                        item === "Mes projets" ? "projects" :
                          item === "Expériences professionnelles" ? "exp" : "tech-watch"}`}
                    className="group relative inline-block px-2 py-1 text-foreground transition-all duration-300 hover:text-yellow-500"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu mobile */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
            <ul className="flex flex-col space-y-4">
              {["À propos", "Parcours scolaire", "Mes projets", "Expériences professionnelles", "Veille technologique"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item === "À propos" ? "about" :
                      item === "Parcours scolaire" ? "education" :
                        item === "Mes projets" ? "projects" :
                          item === "Expériences professionnelles" ? "exp" : "tech-watch"}`}
                    className="block text-foreground hover:text-yellow-500 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Sections */}
      <main className="pt-20">
        {/* Section A propos */}
        <section id="about" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
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

              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-primary border-yellow-500">
                  <p className="text-foreground text-lg leading-relaxed">
                    Je suis un étudiant en BTS SIO passionné par le développement web et logiciel.
                    Actuellement en alternance à la Caisse d&apos;Epargne de Bourgogne Franche Comté, j&apos;aimerais continuer mes études pour aller vers un Bachelor en développement.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Stats */}
                  <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                    <div className="text-3xl font-bold text-primary">2</div>
                    <div className="text-sm text-gray-400">Années d&apos;expérience</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors">
                    <div className="text-3xl font-bold text-primary">5+</div>
                    <div className="text-sm text-gray-400">Projets réalisés</div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  {/* Bouton CV */}
                  <a href="/CV_CHECLER_Théo.pdf" target="_blank" className="w-1/2">
                    <button className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-700 transition-colors group">
                      <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      <span className="text-white">Mon CV</span>
                    </button>
                  </a>

                  {/* Bouton Linktree */}
                  <a href="https://linktr.ee/theochecler" target="_blank" className="w-1/2">
                    <button className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 transition-colors group">
                      <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v5.25c0 1.036-.84 1.875-1.875 1.875h-5.25c-1.036 0-1.875-.84-1.875-1.875v-5.25zm0 12c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v5.25c0 1.036-.84 1.875-1.875 1.875h-5.25c-1.036 0-1.875-.84-1.875-1.875v-5.25z" />
                      </svg>
                      <span className="text-white">Linktree</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section parcours scolaire */}
        <section id="education" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-foreground text-center">Parcours scolaire</h2>

            <div className="relative">
              {/* Ligne verticale centrale - cachée sur mobile */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-500 hidden md:block"></div>

              {/* Timeline content */}
              <div className="space-y-8">
                {/* BTS SIO */}
                <div className="flex flex-col md:flex-row justify-between items-center relative">
                  <div className="w-full md:w-5/12 md:order-2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-gray-800 hidden md:block"></div>
                  <div className="w-full md:w-5/12 bg-gray-800 p-6 rounded-lg shadow-md md:order-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-semibold text-foreground">BTS SIO SLAM</h3>
                      <span className="text-gray-400">2023 - 2025</span>
                    </div>
                    <p className="text-foreground mb-2">Dijon Formation, Quetigny</p>
                    <p className="text-gray-300">
                      BTS Services Informatiques aux Organisations option Solutions Logicielles et Applications Métiers.
                      Formation en alternance à la Caisse d&apos;Epargne de Bourgogne Franche-Comté.
                    </p>
                  </div>
                </div>

                {/* Bac Général */}
                <div className="flex flex-col md:flex-row justify-between items-center relative">
                  <div className="w-full md:w-5/12 md:order-2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full border-4 border-gray-800 hidden md:block"></div>
                  <div className="w-full md:w-5/12 bg-gray-800 p-6 rounded-lg shadow-md md:order-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-semibold text-foreground">Bac Général</h3>
                      <span className="text-gray-400">2018 - 2021</span>
                    </div>
                    <p className="text-foreground mb-2">Lycée Carnot, Dijon</p>
                    <p className="text-gray-300">
                      Baccalauréat Général, spécialité Physique-Chimie / S.V.T et option Mathématiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section projets */}
        <section id="projects" className="min-h-screen flex items-center bg-background shadow-lg border-b-4 border-gray-700">
          <div className="container mx-auto px-4 w-full max-w-[95%]"> {/* Augmenté à 95% */}
            <h2 className="text-4xl font-bold mb-8 text-foreground text-center">Mes projets</h2>
            <div className="w-full">
              <EmblaCarousel
                slides={slides}
                options={{
                  loop: true,
                  align: 'center',
                  slidesToScroll: 1,
                  containScroll: 'trimSnaps'
                }}
                onSelectProject={setSelectedProject}
              />
            </div>
          </div>
        </section>

        {/* Section Exp Pro */}
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

        {/* Section veile techno */}
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

      {/* Modal pour projet */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background p-8 rounded-lg shadow-lg max-w-3xl w-full relative text-foreground"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>

              {/* Section technologies */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-primary">Technologies utilisées :</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies && selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-200 flex items-center gap-2"
                    >
                      {techLogos[tech] && <div className="flex-shrink-0">{techLogos[tech]}</div>}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="max-h-[50vh] overflow-y-auto grid grid-cols-2 gap-4 my-4">
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