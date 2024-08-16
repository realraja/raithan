"use client";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SocialMediaSection } from '../page'; // Assume this component is created
import { StudyCards, StudyImages } from '@/utils/UserStudyPage';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.user);



  useState(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % StudyImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4">
      {/* Student Name */}
      <header className="py-1">
        <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
      </header>

      {/* Auto Sliding Images */}
      <section className="overflow-hidden py-2">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {StudyImages.map((src, index) => (
            <div key={index} className="min-w-full">
              <img src={src} alt={`Slide ${index}`}  className=" h-56 sm:h-64 xl:h-80 2xl:h-96 w-full object-cover" />
            </div>
          ))}
        </div>
      </section>


      {/* Cards */}
      <section className="py-1 grid grid-cols-3 gap-2 mt-5">
        {StudyCards.map((card, index) => (
          <Link key={index} href={card.link} className="bg-gray-800 p-2 rounded text-center shadow-lg hover:bg-gray-700 transition">
            <div className="flex justify-center mb-2">
              <img src={card.icon} alt={`${card.title} icon`} className="w-12 h-12 object-cover"/>
            </div>
            <h3 >{card.title}</h3>
          </Link>
        ))}
      </section>

      {/* Course Details */}
      <SocialMediaSection />
    </div>
  );
}



function ImageSlider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={1000}>
      {StudyImages.map((src, index) => (
              <img src={src} alt={`Slide ${index}`}  className="h-full object-cover" />
                  ))}
        
      </Carousel>
    </div>
  );
}