// src/components/Cards.js
"use client"; // Ensure the component can use React hooks if needed

import styles from "./cards.module.css";
import Map from "../components/Map"
const Cards = () => {
  return (
  
    <div className={styles.container}>
    {/* Cards Section */}
    <div className={styles.cardsSection}>
      {[...Array(6)].map((_, index) => (
        <div className={styles.card} key={index}>
          <img
            src={`/images/example${index + 1}.jpg`} // Replace with your image paths
            alt={`Example ${index + 1}`}
            className={styles.cardImage}
          />
          <div className={styles.cardText}>Card {index + 1} Title</div>
        </div>
      ))}
    </div>

    {/* Map Section */}
    <div className={styles.mapSection}>
      {/* Replace with your map component or iframe */}
      <div className={styles.mapPlaceholder}><Map/></div>
    </div>
  </div>
  );
};

export default Cards;
