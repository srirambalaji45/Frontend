import { Tractor, Handshake } from "lucide-react";
import Backbtn from "./Backbtn";
import Accessibility from "./Accessibility";
import "./roleselection.scss";
import { useTranslation } from "react-i18next";

function Roleselection() {
  const { t } = useTranslation();

  return (
    <div className="roleselection-wrapper">
      <Backbtn />
      <Accessibility />

      <div className="two-btn">
        <h2>{t("role.select_role")}</h2>

        <button className="tractor">
          <Tractor className="icon" />
          <div className="tractor-content">
            <h3>{t("role.farmer_title")}</h3>
            <p className="para">{t("role.farmer_desc")}</p>
          </div>
        </button>

        <button className="handshake">
          <Handshake className="icon" />
          <div className="handshake-content">
            <h3>{t("role.buyer_title")}</h3>
            <p className="para">{t("role.buyer_desc")}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Roleselection;
