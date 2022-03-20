import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Banner from "src/components/Banner/Banner";
import Tabs from "src/components/tabs/Tabs";
import {ReactSVG} from "react-svg";
import DocumentationCard from "src/components/HomeCard/DocumentationCard";
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
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);

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

  const getFiles = (fodlerId = "1zjAEMOvfzcl9JwbSxvbO0gObjIdcqs46"): void => {
    const req = gapi?.client?.drive?.files.list({
      'q': `'${fodlerId}' in parents and mimeType='application/pdf'`
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
        <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-2 mt-8 lg:px-16 xl:px-32 ">
          <a
            href="https://newagrocoin.gitbook.io/whitepaper"
            target="_blank"
            rel="noreferrer"
            className="flex flex-row inline-block text-tiny px-2 leading-none border rounded-full md:px-0 w-full
             border-1 border-blue text-blue py-2 justify-around pointer md:border-2 md:text-lg lg:px-4"
          >
            <p className="text-base">{t("docs.buttons.doc_tech")}</p>
            <ReactSVG
              src={"icons/arrow.svg"}
              beforeInjection={(svg) => {
                svg.classList.add('fill-blue');
                svg.classList.add('text-tiny');
                svg.classList.add('w-4');
                svg.classList.add('h-4');
                svg.classList.add('-rotate-[135deg]');
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
            <p className="text-base">{t("docs.buttons.page_inst")}</p>
            <ReactSVG
              src={"icons/arrow.svg"}
              beforeInjection={(svg) => {
                svg.classList.add('fill-blue');
                svg.classList.add('text-tiny');
                svg.classList.add('w-4');
                svg.classList.add('h-4');
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
            signIn={() => {
              if (!auth?.isSignedIn.get()) {
                auth?.signIn();
              }
            }}
            allowOpen={!!auth?.isSignedIn.get()}
            onClick={() => auth?.isSignedIn.get() && getFiles()}
            component={<SearchList listItems={files} onDownload={onDownload} />}
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
