import React from "react";
import { useTranslation } from "react-i18next";
import Tabs from "src/components/tabs/Tabs";
import AdminCard from "src/components/cards/AdminCard";
import AdminCardTable from "src/components/cards/AdminCardTable";

const Admin: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-3xl w-full">
        <div className="w-full justify-center flex">
          <Tabs
            tabs={[
              {name: 'New Milk', selected: true},
              {name: 'New Beef', disabled: true},
              {name: 'New Land', disabled: true}
            ]}
            containerClass="max-w-md"
          />
        </div>
        <div className="w-full grid grid-cols-1 mt-8">
          <div className="w-full flex justify-around">
            <h3 className="w-2/3 text-blue font-semibold md:font-bold text-sm">Fondos disponibles en el Fondo de Liquidez: </h3>
            <div className="w-1/3 text-right">
              <h3 className="text-green font-bold text-base text-sm">458.948 USDT</h3>
              <h3 className="text-green font-bold text-base underline text-sm">0XJFHSUFNS</h3>
            </div>
          </div>

          <br />
          <AdminCard
            title={t("Emisión de NAC por 30 días para el pool del tambo ")}
            quantity={48}
          />
          <br/>
          <br/>
          <AdminCardTable
            title={t("Minter / Generación de Tokens NMILK")}
            quantity={48}
            data={[
              { quanitity: 56,  link1: "example.com", link2: "example.com", },
              { quanitity: 102, link1: "example.com", link2: "example.com", link3: "example.com"},
              { quanitity: 104, link1: "example.com", link2: "example.com", link3: "example.com"},
              { quanitity: 312, link1: "example.com", link2: "example.com", link3: "example.com"},
              { quanitity: 23,  link1: "example.com", link2: "example.com", link3: "example.com"},
            ]}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Admin;
