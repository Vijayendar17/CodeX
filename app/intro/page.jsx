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

  const importanceItems = [
    {
      title: "Skill Growth",
      desc: "Daily problem-solving improves logical thinking and coding speed.",
    },
    {
      title: "Recognition",
      desc: "Top performers gain recognition from department staff and HOD.",
    },
    {
      title: "Career Value",
      desc: "Great for resume-building and securing internships or placements.",
    },
  ];

  const contributors = ["L.Vijay", "Ch.Jashwanth", "Ch.Ganesh", "Ch.Charan"];

  return (
    <div className="bg-black text-white font-sans">
      <Head>
        <title>Code X | Challenge Platform</title>
        <meta name="description" content="Practice competitive coding and grow with Code X." />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="w-full p-4 bg-black flex items-center" role="banner">
        <h1 className="text-xl font-bold text-white tracking-widest ml-4">
          CODE
          <strong className="text-blue-300 text-2xl">
            X<sup className="text-sm align-super">2</sup>
          </strong>
        </h1>
      </header>

      {/* Page 1: Intro */}
      <section
        id="intro"
        className="px-6 md:px-20 min-h-screen flex items-center justify-center flex-col gap-20"
        data-aos="fade-up"
      >
        <video
          src="https://res.cloudinary.com/dl2dd2gyl/video/upload/v1746524429/codex_ga6teh.mp4"
          autoPlay
          muted
          loop
          className="rounded-lg shadow-xl w-full max-w-3xl"
          poster="/fallback.jpg"
        ></video>

        <h1
          className="text-[100px] font-bold text-center"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          data-aos="zoom-in"
        >
          Code X
          <sup className="inline-block ml-3 text-blue-600 animate-rotate-x origin-center">2</sup>
        </h1>
      </section>

      {/* Page 2: Importance */}
      <section
        id="importance"
        className="bg-black px-6 md:px-20 min-h-screen flex items-center justify-center flex-col"
        data-aos="fade-up"
      >
        <div className="max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Why Code X?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {importanceItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-700 p-8 rounded-2xl shadow hover:scale-105 transition"
              >
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-gray-400 text-lg max-w-4xl mx-auto">
            <p>
              With structured contests and a leaderboard, Code X brings out the best in every coder
              while preparing them for real-world tech roles.
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
      <section
        id="credits"
        className="px-6 md:px-20 bg-black min-h-screen flex items-center justify-center flex-col"
        data-aos="fade-up"
      >
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="w-60 h-60 bg-blue-400 rounded-full border-8 border-blue-600 shadow-xl mb-10 overflow-hidden">
            <img
              src="https://res.cloudinary.com/dzsjqo68q/image/upload/v1746176484/rvinpmzy7d8klkhjlzwn.png"
              alt="Supporters"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Special Thanks to Our HOD Ma'am</h2>
          <p className="text-lg text-gray-300 mb-10 text-center">
            We thank our HOD and the entire teaching faculty for encouraging innovation and
            technical excellence among students.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400 text-sm">
            {contributors.map((name, idx) => (
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

        @keyframes rotateXPower {
          0% {
            transform: perspective(400px) rotateX(0deg) scale(1);
          }
          50% {
            transform: perspective(400px) rotateX(180deg) scale(1.3);
          }
          100% {
            transform: perspective(400px) rotateX(360deg) scale(1);
          }
        }

        .animate-rotate-x {
          display: inline-block;
          animation: rotateXPower 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default Page;
