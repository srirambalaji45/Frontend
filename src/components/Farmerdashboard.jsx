import CropListingForm from "./CropListingForm";
import { useTranslation } from "react-i18next";


function Farmerdashboard() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("dashboard.farmer_dashboard")}</h1>
      <CropListingForm/>
    </div>
  );
}

export default Farmerdashboard;
