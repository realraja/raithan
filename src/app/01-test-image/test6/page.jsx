
"use client";

import { Carousel } from "flowbite-react";

export default function Component() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <img src="https://res.cloudinary.com/dwc3gwskl/image/upload/v1723717343/raithan/wlihusmlkpqa6gbxeh8a.gif" alt="..." />
        <img src="https://res.cloudinary.com/dwc3gwskl/image/upload/v1723717892/raithan/jv3q0t9wvfvelbujnotd.gif" alt="..." />
        <img src="https://res.cloudinary.com/dwc3gwskl/image/upload/v1723717130/raithan/sladmmyxkz4np2wwiuhq.gif" alt="..." />
        <img src="https://res.cloudinary.com/dwc3gwskl/image/upload/v1723718268/raithan/w3kwbb4vjxzizfchzz2f.gif" alt="..." />
        <img src="https://res.cloudinary.com/dwc3gwskl/image/upload/v1723718535/raithan/ega3kc17eiynl3zkp5mi.gif" alt="..." />
      </Carousel>
    </div>
  );
}
