"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { WhatsApp } from "@mui/icons-material";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col text-white ">
      <header className="pt-8">
        <div className="container mx-auto flex justify-center">
          <Image
            src={"/Logo_Design_Template-removebg-preview.png"}
            alt="Raithan Classes Logo"
            width={300}
            height={300}
          />
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 text-center">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl font-bold mb-4"
            >
              Welcome to Raithan Classes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg mb-8"
            >
              We teach all subjects related to agriculture with the best
              curriculum and experienced faculty.
            </motion.p>
            <motion.a
              href="#courses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
            >
              Start Now
            </motion.a>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Our Achievements</h3>
            <div className="flex justify-around gap-3 flex-wrap">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-100 text-green-600 p-8 rounded-lg shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">73%</h4>
                <p className="text-lg">Average Score</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-green-100 text-green-600 p-8 rounded-lg shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">12</h4>
                <p className="text-lg">Exams Taken</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-green-100 text-green-600 p-8 rounded-lg shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">85%</h4>
                <p className="text-lg">Pass Rate</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-800 py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">About Us</h3>
            <p className="text-lg">
              Raithan Classes is dedicated to providing top-notch education in
              agriculture. Our courses are designed to give students a deep
              understanding of agricultural practices, technology, and
              sustainability.
            </p>
          </div>
        </section>

        <section id="courses" className="py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">Our Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white text-black p-8 rounded-lg shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">Soil Science</h4>
                <p className="text-lg">
                  Learn about the composition and properties of soil.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white text-black p-8 rounded-lg shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">Crop Production</h4>
                <p className="text-lg">
                  Understand the techniques and methods of growing crops.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white text-black p-8 rounded-lg shadow-lg"
              >
                <h4 className="text-2xl font-bold mb-2">
                  Agricultural Engineering
                </h4>
                <p className="text-lg">
                  Explore the use of technology in agriculture.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

       <TestemonialSection />

        <SocialMediaSection />
        <ContactUsSection />
      </main>

      <footer className="bg-gray-900 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Raithan Classes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

const SocialMediaSection = () => {
  return (
    <section id="social-media" className="py-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Follow Us on Social Media</h3>
        <div className="flex justify-center gap-8">
          <motion.a
            href="https://twitter.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl hover:text-blue-400 transition"
          >
            <i className="fab fa-twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fff"
                  d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                ></path>
                <path
                  fill="#fff"
                  d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                ></path>
                <path
                  fill="#cfd8dc"
                  d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                ></path>
                <path
                  fill="#40c351"
                  d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                ></path>
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </i>
          </motion.a>
          <motion.a
            href="https://instagram.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl hover:text-pink-500 transition"
          >
            <i className="fab fa-instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                  cx="19.38"
                  cy="42.035"
                  r="44.899"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#fd5"></stop>
                  <stop offset=".328" stop-color="#ff543f"></stop>
                  <stop offset=".348" stop-color="#fc5245"></stop>
                  <stop offset=".504" stop-color="#e64771"></stop>
                  <stop offset=".643" stop-color="#d53e91"></stop>
                  <stop offset=".761" stop-color="#cc39a4"></stop>
                  <stop offset=".841" stop-color="#c837ab"></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                  cx="11.786"
                  cy="5.54"
                  r="29.813"
                  gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#4168c9"></stop>
                  <stop
                    offset=".999"
                    stop-color="#4168c9"
                    stop-opacity="0"
                  ></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                ></path>
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                ></path>
              </svg>
            </i>
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-3xl hover:text-rose-700 transition"
          >
            <i className="fab fa-youtube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                ></path>
                <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
              </svg>
            </i>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
const TestemonialSection = () => {
  return (
    <section id="testimonials" className="bg-gray-800 py-20">
    <div className="container mx-auto text-center">
      <h3 className="text-3xl font-bold mb-8">Testimonials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-black p-8 rounded-lg shadow-lg"
        >
          <p className="mb-4">
            &quot;Raithan Classes has provided me with an in-depth
            understanding of agriculture that I could not have gotten
            anywhere else. The faculty is incredibly knowledgeable and
            supportive.&quot;
          </p>
          <p className="font-bold">- Student A</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white text-black p-8 rounded-lg shadow-lg"
        >
          <p className="mb-4">
            &quot;The curriculum is well-structured and the teaching methods
            are very effective. I feel well-prepared for a career in
            agriculture.&quot;
          </p>
          <p className="font-bold">- Student B</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white text-black p-8 rounded-lg shadow-lg"
        >
          <p className="mb-4">
            &quot;The practical knowledge and hands-on experience I&apos;ve gained
            here have been invaluable. I highly recommend Raithan Classes
            to anyone interested in agriculture.&quot;
          </p>
          <p className="font-bold">- Student C</p>
        </motion.div>
      </div>
    </div>
  </section>
  );
};
const ContactUsSection = () => {
  return (
    <section id="contact" className="bg-green-600 text-black py-20">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Contact Us</h3>
        <p className="text-lg mb-4">
          Get in touch with us for more information about our courses and
          programs.
        </p>
        <motion.a
          href="mailto:info@raithanclasses.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white text-green-600 px-6 py-3 mt-8 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Email Us
        </motion.a>
        <form className="mt-8 flex justify-center items-center flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-centers">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg focus:outline-none w-full max-sm:w-[90%]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg focus:outline-none w-full max-sm:w-[90%]"
            />
          </div>
          <textarea
            placeholder="Your Message"
            className="p-3 mt-4 rounded-lg focus:outline-none w-full max-sm:w-[90%]"
            rows="4"
          ></textarea>
          <motion.button
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white text-green-600 px-6 py-3 mt-4 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
};
