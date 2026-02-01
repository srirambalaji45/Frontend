import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserCircle } from "lucide-react";
import "./navFarmer.scss";


function NavFarmer() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <nav className="nav-farmer">
            <div className="nav-left">
                <div className="nav-item" onClick={() => navigate("/farmer-dashboard")}>
                    <span>{t("nav_farmer.dashboard")}</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/my-listings")}>
                    <span>{t("nav_farmer.my_listings")}</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/add-crop")}>
                    <span>{t("nav_farmer.add_crop")}</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/mandi-prices")}>
                    <span>{t("nav_farmer.mandi_prices")}</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/ai-insights")}>
                    <span>{t("nav_farmer.ai_insights")}</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/live-auctions")}>
                    <span>{t("nav_farmer.live_auctions")}</span>
                </div>
            </div>
            <div className="nav-right">
                <UserCircle
                    className="profile-icon"
                    size={32}
                    onClick={() => setOpen(!open)}
                />
                {open && (
                    <div className="profile-dropdown">
                        <button onClick={() => navigate("/edit-profile")}>
                            {t("nav_farmer.edit_profile")}
                        </button>
                        <button onClick={() => navigate("/farmer-preferences")}>
                            {t("nav_farmer.edit_preferences")}
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="logout-btn" onClick={() => navigate("/")}>
                            {t("nav_farmer.logout")}
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
export default NavFarmer;
