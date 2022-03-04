import React from "react";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import Tabs from "src/components/tabs/Tabs";
import {ReactSVG} from "react-svg";
import DocumentationCard from "src/components/HomeCard/DocumentationCard";
import SearchList from "src/components/SearchList";
import Map from "src/components/Map/Map";

const Documentation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="xl:py-8 2xl:px-56 xl:px-48">
      <Banner
        title={t("docs.banner.title")}
        subtitle={t("docs.banner.subtitle")}
        image={'images/photos/bg_nmilk.jpeg'}
        containerClasses={"p-4 md:p-4"}
      />
      <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-2 mt-8 lg:px-16 xl:px-32 2xl:px-48 ">
        <a
          href={"www.newagro.com"}
          className="flex flex-row inline-block text-tiny px-2 leading-none border rounded-full md:px-0 w-full
           border-1 border-blue text-blue py-2 justify-around pointer md:border-2 md:text-lg lg:px-4"
        >
          {t("docs.buttons.doc_tech")}
          <ReactSVG
            src={"icons/arrow.svg"}
            beforeInjection={(svg) => {
              svg.classList.add('fill-blue');
              svg.classList.add('text-tiny');
              svg.classList.add('lg:w-4');
              svg.classList.add('lg:h-4');
              svg.classList.add('-rotate-[135deg]');
            }}
          />
        </a>
        <a
          href={"www.newagro.com"}
          className="flex flex-row inline-block text-tiny px-2 leading-none border rounded-full md:px-0 w-full
           border-1 border-blue text-blue py-2 justify-around pointer md:border-2 md:text-lg lg:px-4"
        >
          {t("docs.buttons.page_inst")}
          <ReactSVG
            src={"icons/arrow.svg"}
            beforeInjection={(svg) => {
              svg.classList.add('fill-blue');
              svg.classList.add('text-tiny');
              svg.classList.add('lg:w-4');
              svg.classList.add('lg:h-4');
              svg.classList.add('-rotate-[135deg]');
            }}
          />
        </a>
      </div>
      <div className="w-full justify-center flex my-8">
        <Tabs
          tabs={[
            {name: 'New Milk', selected: true},
            {name: 'New Beef', disabled: true},
            {name: 'New Land', disabled: true}
          ]}
          containerClass="max-w-xl"
        />
      </div>
      <div className="w-full grid grid-cols-1 mt-8">
        <DocumentationCard
          title={t("docs.cards.card1_title")}
          subtitle={t("docs.cards.card1_subtitle")}
          linkText={t("docs.cards.see_docs")}
          link={"#"}
          component={() =>  <SearchList listItems={[
            { name: "Busqueda ", link: "example.com"},
            { name: "Remito-Salida-Leche-1-cod:2345-03/12/2021 ", link: "example.com"},
            { name: "Remito-Salida-Leche-1-cod:2346-04/12/2021", link: "example.com"},
            { name: "Remito-Salida-Leche-1-cod:2347-05/12/2021", link: "example.com"},
            { name: "Remito-Salida-Leche-1-cod:2348-06/12/2021", link: "example.com"},
          ]}
          />
          }
        />
        <br />
        <DocumentationCard
          title={t("docs.cards.card2_title")}
          component={() =>  <Map />}
        />
        <br />
        <DocumentationCard
          title={t("docs.cards.card3_title")}
          subtitle={t("docs.cards.card3_subtitle")}
          linkText={t("docs.cards.see_docs")}
          link={"#"}
        />
        <br />
        <DocumentationCard
          title={t("docs.cards.card4_title")}
          subtitle={t("docs.cards.card4_subtitle")}
          linkText={t("docs.cards.see_docs")}
          link={"#"}
        />
        <br />
      </div>
    </div>
  );
};

export default Documentation;
