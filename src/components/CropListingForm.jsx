import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./CropListingForm.scss";
const cropData = {
    "Food Grains / Cereals": ["Mushk Budji Rice", "Amaranth Seed", "Arhar", "Arhar Dal Split", "Bajra", "Barley", "Barnyard Millet", "Basmati rice", "Broken Rice", "Browntop Millet", "Buck Wheat", "Chakhao Or Black Rice", "Chana Dal Split", "Chana whole", "Foxtail Millet", "Horse Gram", "Jowar", "Kabuli Chana Whole", "Katarni Rice", "Khesari Dal", "Kodo Millet", "Little Millet", "Lobia", "Maize", "Marcha Rice", "Masoor whole", "Moong Dal Split", "Moong whole", "Moth", "Oats Raw", "Paddy", "Proso Millet", "Ragi", "Rajma", "Urad Dal Split", "Urad whole", "Wheat", "White Peas"],
    "Oilseeds": ["Castor seed", "Cotton Seed", "Kusum seed", "Linseed", "Mustard seed", "Neem Seeds", "Nigar Seed", "Peanut kernel", "Pongam seeds", "Rapeseed", "Sal Seed", "Sesame seed", "Soyabean", "Sunflower seed"],
    "Fruits": ["Amla", "Apple", "Apricot", "Avocado", "Baji Banana", "Banana", "Ber", "Bilimbi", "Breadfruit", "Cherry Red / Black", "Custard apple", "DRAGON FRUIT", "Garcinia", "Grapefruit", "Grapes", "Guava", "Jackfruit", "Jamun", "Kinnow", "Kiwi", "Lady Finger Banana", "Lemon", "Litchi", "Mango", "Mangosteen", "Mootty Fruit", "Musk melon", "Mysore Banana", "Orange", "Papaya", "Papaya Raw", "Passion Fruit", "Peach", "Pear", "Pineapple", "Plum", "Pomegranate", "Rambutan", "Raw Mango", "Red Banana", "Sapota", "Sarda", "Shahi Litchi", "Soursop", "Stawberries", "Sweet orange", "Watermelon", "Zardalu Mango"],
    "Vegetables": ["Aloe Vera", "Arrowroot", "Banana Raw", "Beetroot", "Bhindi/Okra", "Bitter gourd", "Bottle gourd", "Brinjal", "Broccoli/Calabrese", "Button Mushroom", "Cabbage", "Capsicum", "Carrots", "Cauliflower", "Cluster beans", "Colocasia vegetable", "Coriander leaves", "Cucumber", "Curry Leaves", "Drumstick", "Fenugreek Leaves", "Garlic", "Gherkin", "Ginger", "Green Amaranthus", "Green chillies", "Ivy gourd", "Jimikand (Suran)", "Lesser yam", "Lobia Pods", "Lotus Stem", "Mint Leaves", "Mustard leaf", "Onion", "Oyster Mushroom", "Pea", "Pointed gourd", "Potato", "Pumpkin", "Raw Turmeric", "Red Amaranthus", "Reddish", "Ribbed celery", "Ridge Gourd", "Round chilli", "Safed Petha", "Sem", "Snake Guard", "Snow Mountain Garlic", "Spinach", "Sponge Gourd", "Spring Onion", "Sugar Snap Peas", "Sweet Corn", "Sweet potato", "Tapioca", "Tinda", "Tomato", "Winged bean"],
    "Spices": ["Ajwain", "ASAFOETIDA (HING)", "Black Pepper Whole", "Cardamoms Whole", "Cloves Whole", "Coriander whole", "Cumin", "Dried Raw Mango Slices", "Dry Ginger", "Fennel seed", "Fenugreek seed", "Large cardamom", "Mace Whole", "Poppy Seed", "Red chilli", "Tejpata", "Turmeric"]
};
function CropListingForm() {
    const { t } = useTranslation();
    const [category, setCategory] = useState("");
    const [crop, setCrop] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCrop("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ category, crop, quantity, price });
        setCategory("");
        setCrop("");
        setQuantity("");
        setPrice("");
    };
    return (
        <div className="crop-listing-page">
            <div className="crop-listing-card">
                <h2 className="listing-title">{t("listing.add_crop_listings")}</h2>
                <form onSubmit={handleSubmit} className="crop-listing-vertical-form">
                    <div className="input-group">
                        <select value={category} onChange={handleCategoryChange} required className="listing-select">
                            <option value="">{t("listing.select_category")}</option>
                            {Object.keys(cropData).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            required
                            disabled={!category}
                            className="listing-select"
                        >
                            <option value="">{t("listing.select_crop")}</option>
                            {category &&
                                cropData[category].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            placeholder={t("listing.quantity")}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            className="listing-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="number"
                            placeholder={t("listing.price")}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="listing-input"
                        />
                    </div>
                    <button type="submit" className="listing-add-btn">
                        {t("listing.add")}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default CropListingForm;
