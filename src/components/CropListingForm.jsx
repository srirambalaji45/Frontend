import {useState} from "react";

const cropData = {
    "Food Grains / Cereals": ["Mushk Budji Rice","Amaranth Seed","Arhar","Arhar Dal Split","Bajra","Barley","Barnyard Millet","Basmati rice","Broken Rice","Browntop Millet","Buck Wheat","Chakhao Or Black Rice","Chana Dal Split","Chana whole","Foxtail Millet","Horse Gram","Jowar","Kabuli Chana Whole","Katarni Rice","Khesari Dal","Kodo Millet","Little Millet","Lobia","Maize","Marcha Rice","Masoor whole","Moong Dal Split","Moong whole","Moth","Oats Raw","Paddy","Proso Millet","Ragi","Rajma","Urad Dal Split","Urad whole","Wheat","White Peas"],
     "Oilseeds": ["Castor seed","Cotton Seed","Kusum seed","Linseed","Mustard seed","Neem Seeds","Nigar Seed","Peanut kernel","Pongam seeds","Rapeseed","Sal Seed","Sesame seed","Soyabean","Sunflower seed"],
     "Fruits": ["Amla","Apple","Apricot","Avocado","Baji Banana","Banana","Ber","Bilimbi","Breadfruit","Cherry Red / Black","Custard apple","DRAGON FRUIT","Garcinia","Grapefruit","Grapes","Guava","Jackfruit","Jamun","Kinnow","Kiwi","Lady Finger Banana","Lemon","Litchi","Mango","Mangosteen","Mootty Fruit","Musk melon","Mysore Banana","Orange","Papaya","Papaya Raw","Passion Fruit","Peach","Pear","Pineapple","Plum","Pomegranate","Rambutan","Raw Mango","Red Banana","Sapota","Sarda","Shahi Litchi","Soursop","Stawberries","Sweet orange","Watermelon","Zardalu Mango"],
     "Vegetables": ["Aloe Vera","Arrowroot","Banana Raw","Beetroot","Bhindi/Okra","Bitter gourd","Bottle gourd","Brinjal","Broccoli/Calabrese","Button Mushroom","Cabbage","Capsicum","Carrots","Cauliflower","Cluster beans","Colocasia vegetable","Coriander leaves","Cucumber","Curry Leaves","Drumstick","Fenugreek Leaves","Garlic","Gherkin","Ginger","Green Amaranthus","Green chillies","Ivy gourd","Jimikand (Suran)","Lesser yam","Lobia Pods","Lotus Stem","Mint Leaves","Mustard leaf","Onion","Oyster Mushroom","Pea","Pointed gourd","Potato","Pumpkin","Raw Turmeric","Red Amaranthus","Reddish","Ribbed celery","Ridge Gourd","Round chilli","Safed Petha","Sem","Snake Guard","Snow Mountain Garlic","Spinach","Sponge Gourd","Spring Onion","Sugar Snap Peas","Sweet Corn","Sweet potato","Tapioca","Tinda","Tomato","Winged bean"],
     "Spices": ["Ajwain","ASAFOETIDA (HING)","Black Pepper Whole","Cardamoms Whole","Cloves Whole","Coriander whole","Cumin","Dried Raw Mango Slices","Dry Ginger","Fennel seed","Fenugreek seed","Large cardamom","Mace Whole","Poppy Seed","Red chilli","Tejpata","Turmeric"]

};

function CropListingForm(){
    const [category , SetCategory] = useState("");
    const [crop , SetCrop] = useState("");
    const [quantity , SetQuantity] = useState("");
    const [price , SetPrice] = useState("");

    const handleCategoryChange = (e) => {
        SetCategory(e.target.value);
        SetCrop("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        SetCategory("");
        SetCrop("");
        SetQuantity("");
        SetPrice("");

    };

    return (
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px" }}>
      
      <select value={category} onChange={handleCategoryChange} required>
        <option value="">Select Category</option>
        {Object.keys(cropData).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={crop}
        onChange={(e) => SetCrop(e.target.value)}
        required
        disabled={!category}
      >
        <option value="">Select Crop</option>
        {category &&
          cropData[category].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
      </select>

      <input
        type="number"
        placeholder="Quantity (kg)"
        value={quantity}
        onChange={(e) => SetQuantity(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price (₹/kg)"
        value={price}
        onChange={(e) => SetPrice(e.target.value)}
        required
      />

      <button type="submit">Add</button>
    </form>

    );
}

export default CropListingForm;