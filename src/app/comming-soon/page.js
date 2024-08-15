"use client"
// pages/coming-soon.js
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function ComingSoon() {
  useEffect(() => {
    gsap.to(".coming-soon", {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power3.out",
      delay: 0.5,
    });

    gsap.to(".subtext", {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-10  text-white">
        <img src='https://res.cloudinary.com/dwc3gwskl/image/upload/v1723719124/raithan/fkreua5v1tjhvzx08yzz.gif'  />
      <div className="text-center">
        <h1 className="coming-soon text-6xl text-violet-600 opacity-0 transform translate-y-12">
          Coming Soon
        </h1>
        <p className="subtext text-xl mt-4 opacity-0 transform translate-y-12">
          Stay tuned for something amazing!
        </p>
      </div>
    </div>
  );
}
