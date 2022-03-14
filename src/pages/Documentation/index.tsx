import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Banner from "src/components/Banner/Banner";
import Tabs from "src/components/tabs/Tabs";
import { ReactSVG } from "react-svg";
import DocumentationCard from "src/components/HomeCard/DocumentationCard";
import SearchList from "src/components/SearchList";
import Map from "src/components/Map/Map";
import { useGoogleApi } from "react-gapi";

const Documentation: React.FC = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState();

  const gapi = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  const auth = gapi?.auth2.getAuthInstance();

  var req = gapi?.client?.drive?.files.list();

  !files &&
    req?.execute(function (resp) {
      // console.debug(resp)
      setFiles(
        resp.files.filter((file) => file.mimeType === "application/pdf")
      );
    });

  const onDownload = async (item) => {
    console.debug(item);
    const res = await gapi?.client?.drive?.files
      ?.get({
        fileId: item.id,
        alt: "media",
      })
      .then((r) => {
        console.debug("ressss", r);

        let binaryString = r.body;
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
          let ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }

        let blob = new Blob([bytes], { type: item.mimeType });

        let link = document.createElement("a");

        link.href = window.URL.createObjectURL(blob);
        link.download = item.name;

        link.click();
      });

    res.execute(function (resp) {
      console.debug("resp", resp);
    });
  };

  return (
    <div className="xl:py-8 2xl:px-56 xl:px-48">
      <Banner
        title={t("docs.banner.title")}
        subtitle={t("docs.banner.subtitle")}
        image={"images/photos/bg_nmilk.jpeg"}
        containerClasses={"p-4 md:p-4"}
      />
      <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-2 mt-8 lg:px-16 xl:px-32 2xl:px-48 ">
        <a
          href="https://newagrocoin.gitbook.io/whitepaper"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row inline-block text-tiny px-2 leading-none border rounded-full md:px-0 w-full
           border-1 border-blue text-blue py-2 justify-around pointer md:border-2 md:text-lg lg:px-4"
        >
          {t("docs.buttons.doc_tech")}
          <ReactSVG
            src={"icons/arrow.svg"}
            beforeInjection={(svg) => {
              svg.classList.add("fill-blue");
              svg.classList.add("text-tiny");
              svg.classList.add("lg:w-4");
              svg.classList.add("lg:h-4");
              svg.classList.add("-rotate-[135deg]");
            }}
          />
        </a>
        <a
          href="https://newagro.com.ar"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row inline-block text-tiny px-2 leading-none border rounded-full md:px-0 w-full
           border-1 border-blue text-blue py-2 justify-around pointer md:border-2 md:text-lg lg:px-4"
        >
          {t("docs.buttons.page_inst")}
          <ReactSVG
            src={"icons/arrow.svg"}
            beforeInjection={(svg) => {
              svg.classList.add("fill-blue");
              svg.classList.add("text-tiny");
              svg.classList.add("lg:w-4");
              svg.classList.add("lg:h-4");
              svg.classList.add("-rotate-[135deg]");
            }}
          />
        </a>
      </div>
      <div className="w-full justify-center flex my-8">
        <Tabs
          tabs={[
            { name: "New Milk", selected: true },
            { name: "New Beef", disabled: true },
            { name: "New Land", disabled: true },
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
          signIn={() => {
            if (!auth?.isSignedIn.get()) {
              auth?.signIn();
            }
          }}
          component={() => (
            <SearchList listItems={files || []} onDownload={onDownload} />
          )}
        />
        <br />
        <DocumentationCard
          title={t("docs.cards.card2_title")}
          component={() => <Map />}
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
