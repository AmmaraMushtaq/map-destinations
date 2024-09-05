"use client";

import { useState, useRef } from "react";
import styles from "./HomePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faSnowflake,
  faCloudSun,
  faLeaf,
  faUser,
  faUserFriends,
  faUsers,
  faUserTie,
  faTimes, // Importing the cross icon
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [isWhenPopupVisible, setIsWhenPopupVisible] = useState(false);
  const [isWhoPopupVisible, setIsWhoPopupVisible] = useState(false);
  const [isMorePopupVisible, setIsMorePopupVisible] = useState(false);
  const [activeSubPopup, setActiveSubPopup] = useState(null);
  const scrollContainerRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleWhenPopup = () => {
    setIsWhenPopupVisible(!isWhenPopupVisible);
    setActiveSubPopup(null);
  };

  const toggleWhoPopup = () => {
    setIsWhoPopupVisible(!isWhoPopupVisible);
  };

  const toggleMorePopup = () => {
    setIsMorePopupVisible(!isMorePopupVisible);
  };

  const handleSubPopup = (popup) => {
    setActiveSubPopup(popup === activeSubPopup ? null : popup);
  };

  const scrollDates = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const handleClick = (e, index) => {
    const target = e.target;
  
    // Toggle the "active" class
    if (target.classList.contains(styles.inactive)) {
      target.classList.remove(styles.inactive);
      target.classList.add(styles.active);
    } else {
      target.classList.remove(styles.active);
      target.classList.add(styles.inactive);
    }
  
    // Update selected options (for further processing if needed)
    setSelectedOptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // Deselect
        : [...prev, index] // Select
    );
  };

  const closePopup = () => {
    setIsWhenPopupVisible(false);
    setIsWhoPopupVisible(false);
    setIsMorePopupVisible(false);
  };

  const renderDatesForMonth = (month, days) => (
    <div className={styles.datesMonthBlock} key={month}>
      <div className={styles.monthName}>{month}</div>
      <div className={styles.datesGrid}>
        {days.map((day) => (
          <div key={day} className={styles.popupOption}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src="/images/6.jpeg"
          alt="Example Image"
          className={styles.image}
        />
        <div className={styles.overlayText}>
          Explore Our Destinations
          <div className={styles.optionsContainer}>
            {/* "When" Button */}
            <div className={styles.optionItem} onClick={toggleWhenPopup}>
              When
              {isWhenPopupVisible && (
                <div
                  className={`${styles.popupContainer} ${styles.show}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.closeIcon}
                    onClick={closePopup}
                  />
                  <div className={styles.popupOptionGroup}>
                    <div
                      className={styles.popupOption}
                      onClick={() => handleSubPopup("seasons")}
                    >
                      Seasons
                    </div>
                    <div
                      className={styles.popupOption}
                      onClick={() => handleSubPopup("months")}
                    >
                      Month
                    </div>
                    <div
                      className={styles.popupOption}
                      onClick={() => handleSubPopup("dates")}
                    >
                      Dates
                    </div>
                  </div>

                  {activeSubPopup === "seasons" && (
                    <div className={styles.subPopupContainer}>
                    <div className={`${styles.seasonOption} ${styles.spring}`}>
                      <FontAwesomeIcon icon={faSun} className={styles.icon} />
                      Spring
                    </div>
                    <div className={`${styles.seasonOption} ${styles.winter}`}>
                      <FontAwesomeIcon icon={faSnowflake} className={styles.icon} />
                      Winter
                    </div>
                    <div className={`${styles.seasonOption} ${styles.summer}`}>
                      <FontAwesomeIcon icon={faCloudSun} className={styles.icon} />
                      Summer
                    </div>
                    <div className={`${styles.seasonOption} ${styles.autumn}`}>
                      <FontAwesomeIcon icon={faLeaf} className={styles.icon} />
                      Autumn
                    </div>
                  </div>
                  
                  )}

                  {activeSubPopup === "months" && (
                    <div className={styles.subPopupContainer}>
                      {[
                        "Jan",
                        "Feb",
                        "March",
                        "Apr",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ].map((month) => (
                        <div key={month} className={styles.popupOption}>
                          {month}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSubPopup === "dates" && (
                    <div className={styles.datesScrollContainer}>
                      <button
                        className={`${styles.scrollButton} ${styles.left}`}
                        onClick={() => scrollDates("left")}
                      >
                        ◀
                      </button>
                      <div
                        ref={scrollContainerRef}
                        className={styles.datesScrollContent}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {[
                          { month: "January", days: 31 },
                          { month: "February", days: 28 },
                          { month: "March", days: 31 },
                          { month: "April", days: 30 },
                          { month: "May", days: 31 },
                          { month: "June", days: 30 },
                          { month: "July", days: 31 },
                          { month: "August", days: 31 },
                          { month: "September", days: 30 },
                          { month: "October", days: 31 },
                          { month: "November", days: 30 },
                          { month: "December", days: 31 },
                        ].map(({ month, days }) =>
                          renderDatesForMonth(
                            month,
                            Array.from({ length: days }, (_, i) => i + 1)
                          )
                        )}
                      </div>
                      <button
                        className={`${styles.scrollButton} ${styles.right}`}
                        onClick={() => scrollDates("right")}
                      >
                        ▶
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* "Who" Button */}
            <div className={styles.optionItem} onClick={toggleWhoPopup}>
              Who
              {isWhoPopupVisible && (
                <div
                  className={`${styles.popupContainer} ${styles.show}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.closeIcon}
                    onClick={closePopup}
                  />
                  <div className={styles.popupHeading}>
                    Choose Your Travellers
                  </div>
                  <div className={styles.subPopupContainer}>
                    <div className={styles.travellerOption}>
                      <FontAwesomeIcon icon={faUser} className={styles.icon4} />
                      Solo
                    </div>
                    <div className={styles.travellerOption}>
                      <FontAwesomeIcon
                        icon={faUserTie}
                        className={styles.icon4}
                      />
                      Couple
                    </div>
                    <div className={styles.travellerOption}>
                      <FontAwesomeIcon icon={faUsers} className={styles.icon4} />
                      Family
                    </div>
                    <div className={styles.travellerOption}>
                      <FontAwesomeIcon
                        icon={faUserFriends}
                        className={styles.icon4}
                      />
                      Friends
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* "More+" Button */}
            <div className={styles.optionItem} onClick={toggleMorePopup}>
              More+
              {isMorePopupVisible && (
                <div
                  className={`${styles.morePopup} ${styles.show}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.closeIcon}
                    onClick={closePopup}
                  />
                  <h3 className={styles.mainHeading}>Preferences</h3>

                  <div className={styles.section}>
                    <h4 className={styles.subHeading}>Explorer Type</h4>
                    <div className={styles.checkboxContainer}>
  {[
    "Foodie",
    "Outdoorsy",
    "Arts & Culture Fan",
    "Luxury Traveller",
    "Eco-conscious",
    "Adventurer",
    "2SLGBTQIA+",
    "Business Traveller",
    "Accessible Traveller",
    "Pet Owner",
    "Family Focused",
    "Romantic",
    "Hipster",
    "Cruise Traveller",
    "Day Tripper",
  ].map((option, index) => (
    <div
      key={option}
      className={`${styles.iconOption} ${styles.inactive}`} // Default state is inactive
      onClick={(e) => handleClick(e, index)} // Handle click event
    >
      {option}
    </div>
  ))}
</div>


                  </div>

                  <div className={styles.section}>
                    <h4 className={styles.subHeading}>Budget</h4>
                    <div className={styles.checkboxContainer}>
                      {["Free", "Low-cost", "Medium", "High"].map((option) => (
                        <label key={option} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h4 className={styles.subHeading}>Accessibility</h4>
                    <div className={styles.checkboxContainer}>
                      {[
                        "Wheelchair",
                        "Parking",
                        "Washroom",
                        "Braille Signage",
                        "Assistive Listening Devices",
                      ].map((option) => (
                        <label key={option} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h4 className={styles.subHeading}>Language Offered</h4>
                    <div className={styles.checkboxContainer}>
                      {[
                        "English",
                        "Spanish",
                        "Mandarin",
                        "French",
                        "Cantonese",
                      ].map((option) => (
                        <label key={option} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className={styles.updateButton}>Update Settings</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
