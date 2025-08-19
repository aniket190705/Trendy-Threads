import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import Card from "../../components/HomeSectionCard/Card";
import { mens_kurta } from "../../../data/mensKurta";

const HomePage = () => {
  return (
    <>
      <div>{/* <MainCarousel clasName="-z-1" /> */}</div>

      <div>
        <HomeSectionCarousel data={mens_kurta} sectionName={"MENS"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"MEN'S SHOES"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"MEN'S SHIRT"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"WOMEN'S SAREE"} />
        <HomeSectionCarousel data={mens_kurta} sectionName={"WOMEN'S DRESS"} />
      </div>
    </>
  );
};

export default HomePage;
