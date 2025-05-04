"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import Head from "next/head";
import "aos/dist/aos.css";
import Link from "next/link";

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans">
      <Head>
        <title>Code X | Challenge Platform</title>
        <meta name="description" content="Practice competitive coding and grow with Code X." />
      </Head>

      {/* Header */}
      <header className="w-full p-4 bg-gray-900 flex items-center">
        {/* <img
          src=""
          alt="Code X Logo"
          className="h-10 w-auto"
        /> */}
        <h1 className="text-xl font-bold text-white tracking-widest ml-4">CODE <strong className="text-blue-300">X</strong></h1>
      </header>

      {/* Page 1: Intro */}
      <section id="intro" className="px-6 md:px-20 min-h-screen flex items-center justify-center flex-col gap-96" data-aos="fade-up">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          <img src="https://res.cloudinary.com/dl2dd2gyl/image/upload/v1746364201/ChatGPT_Image_May_4_2025_05_24_18_PM_fhdqfa.png" alt="Intro banner" className="rounded-xl shadow-lg w-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to Code X</h2>
            <p className="text-lg text-gray-300">
              Code X is a challenge-based platform designed for students to practice competitive coding, improve problem-solving skills, and showcase talent among peers and faculty.
            </p>
          </div>
        </div>
      </section>

      {/* Rotating X Logo */}
      <div className="w-full h-[40vh] flex items-center justify-center" data-aos="zoom-in">
        <h1
          className="text-[100px] font-bold"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Code
          <span className="inline-block ml-6 text-blue-400 animate-rotate-x origin-center">X</span>
        </h1>
      </div>

      {/* Page 2: Importance */}
      <section id="importance" className="bg-gray-800 px-6 md:px-20 min-h-screen flex items-center justify-center flex-col" data-aos="fade-up">
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Why Code X?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Skill Growth", desc: "Daily problem-solving improves logical thinking and coding speed." },
              { title: "Recognition", desc: "Top performers gain recognition from department staff and HOD." },
              { title: "Career Value", desc: "Great for resume-building and securing internships or placements." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-700 p-8 rounded-2xl shadow hover:scale-105 transition">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-gray-400 text-lg max-w-4xl mx-auto">
            <p>
              With structured contests and a leaderboard, Code X brings out the best in every coder while preparing them for real-world tech roles.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-block px-9 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg transform transition duration-500 hover:scale-110 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              data-aos="zoom-in"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Page 3: Credits */}
      <section id="credits" className="px-6 md:px-20 bg-gray-900 min-h-screen flex items-center justify-center flex-col" data-aos="fade-up">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="w-60 h-60 bg-blue-400 rounded-full border-8 border-blue-600 shadow-xl mb-10 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dzsjqo68q/image/upload/v1746176484/rvinpmzy7d8klkhjlzwn.png"
              alt="Supporters"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thanks to Our HOD  Mam</h2>
          <p className="text-lg text-gray-300 mb-10 text-center">
            We thank our HOD and the entire teaching faculty for encouraging innovation and technical excellence among students.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400 text-sm">
            {["L.Vijay", "Ch.Jashwanth", "Ch.Ganesh", "Ch.Charan"].map((name, idx) => (
              <div key={idx}>
                <strong>{name}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes rotateX {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-rotate-x {
          animation: rotateX 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Page;
