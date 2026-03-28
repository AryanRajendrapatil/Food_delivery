const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'frontend/src/assets/frontend_assets/assets.js');

let content = fs.readFileSync(targetFile, 'utf8');

// The new header image
const newHeader = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80";

// Some high-quality food mappings
const UnsplashImages = [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", // Salad
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800", // Veg
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800", // Pasta
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800", // Noodles
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", // Rolls
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800", // Sandwich
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800", // Cake
    "https://plus.unsplash.com/premium_photo-1678897753173-05f3377dd9f7?w=800", // Desert
];

// Regex replace imports of menu and food
content = content.replace(/import menu_\d+ from '\.\/menu_\d+\.png'/g, "");
content = content.replace(/import food_\d+ from '\.\/food_\d+\.png'/g, "");

content = content.replace(/header_img/g, `"${newHeader}"`);

for (let i = 1; i <= 32; i++) {
    let img = UnsplashImages[i % 8];
    content = content.replace(new RegExp(`\\bfood_${i}\\b`, 'g'), `"${img}"`);
}
for (let i = 1; i <= 8; i++) {
    let img = UnsplashImages[i - 1];
    content = content.replace(new RegExp(`\\bmenu_${i}\\b`, 'g'), `"${img}"`);
}

fs.writeFileSync(targetFile, content);
console.log("Assets updated successfully.");
