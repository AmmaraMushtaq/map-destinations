"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faPalette,
  faLandmark,
  faChild,
  faTree,
  faHiking,
  faShoppingCart,
  faSpa,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./categories.module.css";

const categories = [
  {
    title: "Adventure",
    icon: faMountain,
    subcategories: [
      "Adrenaline",
      "Camping",
      "Golfing",
      "Hiking",
      "Skiing",
      "Water Sports",
      "Cycling & Mountain Biking",
    ],
  },
  {
    title: "Art & Culture",
    icon: faPalette,
    subcategories: [
      "Comedy",
      "Concerts",
      "Galleries & Museums",
      "Indigenous Tourism",
      "Performing Arts",
    ],
  },
  {
    title: "Attractions",
    icon: faLandmark,
    subcategories: ["Landmarks", "Monuments", "Parks"],
  },
  {
    title: "Family & Kids",
    icon: faChild,
    subcategories: ["Amusement Parks", "Playgrounds", "Zoos"],
  },
  {
    title: "Nature & Sightseeing",
    icon: faTree,
    subcategories: ["Parks", "Wildlife Tours", "Scenic Drives"],
  },
  {
    title: "Outdoor Tours",
    icon: faHiking,
    subcategories: ["Hiking", "Biking", "Guided Tours"],
  },
  {
    title: "Shopping & Entertainment",
    icon: faShoppingCart,
    subcategories: ["Malls", "Cinemas", "Theaters"],
  },
  {
    title: "Wellbeing",
    icon: faSpa,
    subcategories: ["Spas", "Yoga", "Meditation"],
  },
  {
    title: "Search",
    icon: faSearch,
    subcategories: [],
  },
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleDropdown = (index) => {
    setActiveCategory((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <div
          key={index}
          className={styles.categoryItem}
          onClick={() => toggleDropdown(index)}
        >
          <div className={styles.categoryHeader}>
            <FontAwesomeIcon icon={category.icon} className={styles.icon} />
            <span className={styles.title}>{category.title}</span>
          </div>
          {/* Subcategories Popup */}
          {activeCategory === index && category.subcategories.length > 0 && (
            <div className={styles.subcategoriesPopup}>
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className={styles.subcategoryItem}>
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
