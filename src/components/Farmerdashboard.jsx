import CropListingForm from "./CropListingForm";
import { useTranslation } from "react-i18next";
import NavFarmer from "./NavFarmer";


function Farmerdashboard() {
  const { t } = useTranslation();

  return (
    <div>
      <NavFarmer/>
    </div>
  );
}

export default Farmerdashboard;
