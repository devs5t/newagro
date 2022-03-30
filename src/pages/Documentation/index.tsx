import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Banner from "src/components/Banner/Banner";
import Tabs from "src/components/tabs/Tabs";
import {ReactSVG} from "react-svg";
import DocumentationCard from "src/components/cards/DocumentationCard";
import SearchList from "src/components/SearchList";
import Map from "src/components/Map/Map";
import {useGoogleApi} from "react-gapi";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Documentation: React.FC = () => {
  const { t } = useTranslation();
  const [filesCardOne, setFilesCardOne] = useState([]);
  const [filesCardFour, setFilesCardFour] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<'nmilk' | 'nland' | 'nbeef'>('nmilk');

  useEffect(() => {
    setFilesCardOne([]);
    setFilesCardFour([]);
  }, [selectedToken])

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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

  const getFiles = (folderId, files, setFiles): void => {
    const req = gapi?.client?.drive?.files.list({
      'q': `'${folderId}' in parents and mimeType='application/pdf'`
    });

    files.length === 0 && req?.execute(response =>
      response.code > 299 ?
        setOpen(true) :
        setFiles(response.files)
    );
  }

  const onDownload = async (item) => {
    console.debug(item);
    const res = await gapi?.client?.drive?.files
      ?.get({
        fileId: item.id,
        alt: "media",
      })
      .then((r: { body: any; }) => {
        console.debug("ressss", r);

        const binaryString = r.body;
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: item.mimeType });

        const link = document.createElement("a");

        link.href = window.URL.createObjectURL(blob);
        link.download = item.name;

        link.click();
      });

    res.execute(function (resp: any) {
      console.debug("resp", resp);
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-3xl w-full">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {t("error.generic")}
          </Alert>
        </Snackbar>
        <Banner
          title={t("docs.banner.title")}
          subtitle={t("docs.banner.subtitle")}
          image={'images/photos/bg_nmilk.jpeg'}
          containerClasses={"p-4 md:p-4"}
        />
        <div className="w-full flex justify-between max-w-xl mt-6 mx-auto">
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
        <div className="w-full justify-center flex my-8">
          <Tabs
            tabs={[
              {name: 'New Milk', selected: selectedToken === 'nmilk', onClick: () => setSelectedToken('nmilk')},
              {name: 'New Land', selected: selectedToken === 'nland', onClick: () => setSelectedToken('nland')},
              {name: 'New Beef', selected: selectedToken === 'nbeef', onClick: () => setSelectedToken('nbeef'), disabled: true},
            ]}
            containerClass="max-w-md"
          />
        </div>
        <div className="w-full grid grid-cols-1 mt-8">
          <DocumentationCard
            title={t(selectedToken === "nmilk" ? "docs.cards.card1_title" : "docs.cards.card1_title2")}
            subtitle={filesCardOne.length ? t("docs.cards.card1_subtitle", {filesLength: filesCardOne.length}) : ""}
            linkText={t("docs.cards.see_docs")}
            link={"#"}
            signIn={() => {
              if (!auth?.isSignedIn.get()) {
                auth?.signIn();
              }
            }}
            allowOpen={!!auth?.isSignedIn.get()}
            onClick={() => auth?.isSignedIn.get() && getFiles(selectedToken === "nmilk" ? "1MLS5Heqo8-J0z5QYq-hE47O-gm1hHNKB" : "1Zrfz0LdeoGlrNBIZKqdClNK6rhmMi6xg", filesCardOne, setFilesCardOne)}
            component={<SearchList listItems={filesCardOne} onDownload={onDownload} />}
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
            subtitle={t("docs.cards.card3_subtitle")}
            linkText={t("docs.cards.card3_goto")}
            link={"#"}
          />
          <br />
          <DocumentationCard
            title={t(selectedToken === "nmilk" ? "docs.cards.card4_title" : "docs.cards.card4_title2")}
            subtitle={filesCardFour.length ? t("docs.cards.card1_subtitle", {filesLength: filesCardFour.length}) : ""}
            linkText={t("docs.cards.see_docs")}
            link={"#"}
            signIn={() => {
              if (!auth?.isSignedIn.get()) {
                auth?.signIn();
              }
            }}
            allowOpen={!!auth?.isSignedIn.get()}
            onClick={() => auth?.isSignedIn.get() && getFiles(selectedToken === "nmilk" ? "1XHotEJkiwW5i-AEsC86oen343Q_G9oWm" : "1oqTfZY-8X4eL0iqvM4ugGYnspo64GNpW", filesCardFour, setFilesCardFour)}
            component={<SearchList listItems={filesCardFour} onDownload={onDownload} />}
            currentToken={selectedToken}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Documentation;
