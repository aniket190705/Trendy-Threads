"use client";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import SmartImage from "@/components/common/SmartImage";
import { homeCarouselData } from "./MainCarouselData";

const MainCarousel = () => {
  const items = homeCarouselData.map((item, index) => (
    <div key={`${item.image}-${index}`} className="relative h-[28rem] w-full">
      <SmartImage
        className="cursor-pointer object-cover"
        fill
        sizes="100vw"
        src={item.image}
        alt={`Carousel slide ${index + 1}`}
      />
    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={3000}
      infinite
    />
  );
};

export default MainCarousel;
