import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./farmerPreferences.scss";
import { useTranslation } from "react-i18next";

const cropData = {
  "Food Grains / Cereals": [
    "Mushk Budji Rice","Amaranth Seed","Arhar","Arhar Dal Split","Bajra","Barley","Barnyard Millet","Basmati rice","Broken Rice","Browntop Millet","Buck Wheat","Chakhao Or Black Rice","Chana Dal Split","Chana whole","Foxtail Millet","Horse Gram","Jowar","Kabuli Chana Whole","Katarni Rice","Khesari Dal","Kodo Millet","Little Millet","Lobia","Maize","Marcha Rice","Masoor whole","Moong Dal Split","Moong whole","Moth","Oats Raw","Paddy","Proso Millet","Ragi","Rajma","Urad Dal Split","Urad whole","Wheat","White Peas"
  ],
  "Oilseeds": [
    "Castor seed","Cotton Seed","Kusum seed","Linseed","Mustard seed","Neem Seeds","Nigar Seed","Peanut kernel","Pongam seeds","Rapeseed","Sal Seed","Sesame seed","Soyabean","Sunflower seed"
  ],
  "Fruits": [
    "Amla","Apple","Apricot","Avocado","Baji Banana","Banana","Ber","Bilimbi","Breadfruit","Cherry Red / Black","Custard apple","DRAGON FRUIT","Garcinia","Grapefruit","Grapes","Guava","Jackfruit","Jamun","Kinnow","Kiwi","Lady Finger Banana","Lemon","Litchi","Mango","Mangosteen","Mootty Fruit","Musk melon","Mysore Banana","Orange","Papaya","Papaya Raw","Passion Fruit","Peach","Pear","Pineapple","Plum","Pomegranate","Rambutan","Raw Mango","Red Banana","Sapota","Sarda","Shahi Litchi","Soursop","Stawberries","Sweet orange","Watermelon","Zardalu Mango"
  ],
  "Vegetables": [
    "Aloe Vera","Arrowroot","Banana Raw","Beetroot","Bhindi/Okra","Bitter gourd","Bottle gourd","Brinjal","Broccoli/Calabrese","Button Mushroom","Cabbage","Capsicum","Carrots","Cauliflower","Cluster beans","Colocasia vegetable","Coriander leaves","Cucumber","Curry Leaves","Drumstick","Fenugreek Leaves","Garlic","Gherkin","Ginger","Green Amaranthus","Green chillies","Ivy gourd","Jimikand (Suran)","Lesser yam","Lobia Pods","Lotus Stem","Mint Leaves","Mustard leaf","Onion","Oyster Mushroom","Pea","Pointed gourd","Potato","Pumpkin","Raw Turmeric","Red Amaranthus","Reddish","Ribbed celery","Ridge Gourd","Round chilli","Safed Petha","Sem","Snake Guard","Snow Mountain Garlic","Spinach","Sponge Gourd","Spring Onion","Sugar Snap Peas","Sweet Corn","Sweet potato","Tapioca","Tinda","Tomato","Winged bean"
  ],
  "Spices": [
    "Ajwain","ASAFOETIDA (HING)","Black Pepper Whole","Cardamoms Whole","Cloves Whole","Coriander whole","Cumin","Dried Raw Mango Slices","Dry Ginger","Fennel seed","Fenugreek seed","Large cardamom","Mace Whole","Poppy Seed","Red chilli","Tejpata","Turmeric"
  ]
};

function FarmerPreferences() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState([]);
  const [category, setCategory] = useState("");
  const [crop, setCrop] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCrop("");
  };

  const addPreference = () => {
    if (!category || !crop) return;
    setPreferences([...preferences, { category, crop }]);
    setCategory("");
    setCrop("");
  };

  const removePreference = (index) => {
    setPreferences(preferences.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    console.log("Saved preferences:", preferences);
    navigate("/farmer-dashboard");
  };

  return (
    <div className="preferences-page">
      <div className="preferences-wrapper">
        <h2 className="preferences-heading">
          {t("prefs.title")} 🌿
        </h2>

        <div className="preferences-form">
          <select value={category} onChange={handleCategoryChange}>
            <option value="">{t("prefs.select_category")}</option>
            {Object.keys(cropData).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            disabled={!category}
          >
            <option value="">{t("prefs.select_crop")}</option>
            {category &&
              cropData[category].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

          <button onClick={addPreference} className="add-btn">
            {t("prefs.add_preference")}
          </button>
        </div>

        <h2 className="preferences-heading">{t("prefs.preferred_crops")}</h2>

        <div className="table-wrapper">
          {preferences.length > 0 && (
            <table className="preferences-table">
              <thead>
                <tr>
                  <th>{t("prefs.category")}</th>
                  <th>{t("prefs.crop")}</th>
                  <th>{t("prefs.action")}</th>
                </tr>
              </thead>

              <tbody>
                {preferences.map((pref, index) => (
                  <tr key={index}>
                    <td>{pref.category}</td>
                    <td>{pref.crop}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removePreference(index)}
                      >
                        {t("prefs.remove")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="continue-wrapper">
          <button
            onClick={handleContinue}
            disabled={preferences.length === 0}
            className="continue-btn"
          >
            {t("prefs.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmerPreferences;
