import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Banner from "src/components/Banner/Banner";
import Tabs from "src/components/tabs/Tabs";
import {ReactSVG} from "react-svg";
import DocumentationCard from "src/components/cards/DocumentationCard";
import SearchList from "src/components/SearchList";
import Map from "src/components/Map/Map";
import {Helmet} from "react-helmet-async";
import * as AWS from "@aws-sdk/client-s3";

const s3AccessKey = String(import.meta.env.VITE_APP_S3_KEY_ID);
const s3SecretAccessKey = String(import.meta.env.VITE_APP_S3_ACCESS_KEY);
const s3Region = String(import.meta.env.VITE_APP_S3_REGION);
const s3Bucket = String(import.meta.env.VITE_APP_S3_BUCKET);

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretAccessKey,
  },
  region: s3Region
});

export type S3FileType = {
  name: string;
  link: string;
}

const Documentation: React.FC = () => {
  const { t } = useTranslation();
  const [filesFirstFolder, setFilesFirstFolder] = useState<S3FileType[]>([]);
  const [filesSecondFolder, setFilesSecondFolder] = useState<S3FileType[]>([]);
  const [selectedToken, setSelectedToken] = useState<'nmilk' | 'nland' | 'nbeef'>('nland');

  useEffect(() => {
    loadFiles('first-folder', setFilesFirstFolder);
    loadFiles('second-folder', setFilesSecondFolder);
  }, [selectedToken]);

  const loadFiles = (folder: string, setterFunction: Function) => {
    s3.listObjects({
      Bucket: s3Bucket,
      Prefix: `${selectedToken}/${folder}/`
    }, function (error, data: any) {
      if (error) {
        console.error(error);
        return;
      }

      const files: S3FileType[] = (data.Contents || [])
        .filter((file: any) => file.Size > 0)
        .map((file: any) => ({
          name: file.Key.split("/").pop(),
          link: `https://${s3Bucket}.s3.amazonaws.com/${file.Key}`
        }));

      setterFunction(files);
    });
  };


  return (
    <div className="flex justify-center mt-8">
      <Helmet defer={false}>
        <title>{`${t('navbar.transparency')} - New Agro Coin`}</title>
      </Helmet>
      <div className="max-w-3xl w-full">
        <Banner
          title={t("docs.banner.title")}
          subtitle={t("docs.banner.subtitle")}
          image={'images/photos/bg_nmilk.jpeg'}
          containerClasses={"p-4 md:p-4"}
        />
        <div className="w-full flex justify-between max-w-xl mt-6 mx-auto">
          {[
            {link: "https://newagrocoin.gitbook.io/whitepaper", label: t("docs.buttons.doc_tech")},
            {link: "https://www.newagrocoin.com", label: t("docs.buttons.page_inst")}
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
        <div className="w-full justify-center flex my-8">
          <Tabs
            tabs={[
              {name: 'New Land', selected: selectedToken === 'nland', onClick: () => setSelectedToken('nland')},
              {name: 'New Milk', selected: selectedToken === 'nmilk', onClick: () => setSelectedToken('nmilk')},
              {name: 'New Beef', selected: selectedToken === 'nbeef', onClick: () => setSelectedToken('nbeef'), disabled: true},
            ]}
            containerClass="max-w-md"
          />
        </div>
        <div className="w-full grid grid-cols-1 mt-8">
          <DocumentationCard
            title={t(selectedToken === "nmilk" ? "docs.cards.card1_title" : "docs.cards.card1_title2")}
            subtitle={t("docs.cards.card1_subtitle", {filesLength: filesFirstFolder.length})}
            linkText={t("docs.cards.see_docs")}
            link={"#"}
            component={filesFirstFolder.length ? <SearchList listItems={filesFirstFolder} /> : null}
            currentToken={selectedToken}
          />
          <br />
          <DocumentationCard
            title={t("docs.cards.card2_title")}
            component={<Map />}
          />
          <br />
          <DocumentationCard
            title={t("docs.cards.card3_title")}
            linkText={t("docs.cards.card3_goto")}
            link="https://www.twitch.tv/newagrocoin"
            linkTarget="_blank"
          />
          <br />
          <DocumentationCard
            title={t(selectedToken === "nmilk" ? "docs.cards.card4_title" : "docs.cards.card4_title2")}
            subtitle={t("docs.cards.card1_subtitle", {filesLength: filesSecondFolder.length})}
            linkText={t("docs.cards.see_docs")}
            link={"#"}
            component={filesSecondFolder.length ? <SearchList listItems={filesSecondFolder} /> : null}
            currentToken={selectedToken}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Documentation;
