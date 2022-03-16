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
    <div className="flex justify-center mt-8">
      <div className="max-w-3xl w-full">
        <Banner
          title={t("docs.banner.title")}
          subtitle={t("docs.banner.subtitle")}
          image={'images/photos/bg_nmilk.jpeg'}
          containerClasses={"p-10"}
        />

        <div className="flex justify-center">
          <div className="w-full flex justify-between max-w-xl mt-6">
            {[
              {link: "https://newagrocoin.gitbook.io/whitepaper", label: t("docs.buttons.doc_tech")},
              {link: "https://newagro.com.ar", label: t("docs.buttons.page_inst")}
            ].map((button, key) => (
              <a
                key={key}
                href={button.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center px-4 py-2 md:py-0 border rounded-full md:px-0 w-full border-1 border-blue text-blue justify-around pointer md:border-2 text-sm mx-3"
              >
                {button.label}
                <ReactSVG
                  src={"icons/arrow.svg"}
                  beforeInjection={(svg) => {
                    svg.classList.add('fill-blue');
                    svg.classList.add('w-2');
                    svg.classList.add('lg:w-4');
                    svg.classList.add('-rotate-[135deg]');
                  }}
                />
              </a>
            ))}
          </div>
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
            component={<SearchList listItems={[
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
            component={<Map />}
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
    </div>
  );
};

export default Documentation;
