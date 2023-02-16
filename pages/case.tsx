import React, { useState, useEffect, useRef } from "react";
import CryptoJS from "crypto-js";
import styles from "../styles/CaseOpening.module.css";

const items = [
  "https://www.csgodatabase.com/images/skins/webp/CZ75-Auto_Victoria.webp",
  "https://www.csgodatabase.com/images/skins/webp/AWP_Asiimov.webp",

  // Add more items as needed
];
const CasePage = () => {
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [lastClicked, setLastClicked] = useState<null | Date | number | any>(
    null
  );
  const [parsedData, setParsedData] = useState<any>();

  useEffect(() => {
    const storedLastClicked = localStorage.getItem("lastClicked");
    if (storedLastClicked) {
      const bytes = CryptoJS.AES.decrypt(storedLastClicked, "secret-key");
      try {
        setParsedData(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
        // do something with the parsed data
      } catch (error) {
        console.error("Error parsing JSON data", error);
      }

      const decryptedData = parsedData;
      setLastClicked(new Date(decryptedData));
    }
  }, [parsedData]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 5000);
    setLastClicked(new Date());
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(new Date()),
      "secret-key"
    ).toString();
    localStorage.setItem("lastClicked", encryptedData);

    setIsOpen(true);
    setTimeout(() => {
      const index = Math.floor(Math.random() * items.length);
      alert(index);
      setSelectedItem(items[index]);
      setIsOpen(false);
    }, 3000);
  };

  const newDate: number | any = new Date();

  const timeLeft: any = lastClicked
    ? 24 * 60 * 60 * 1000 - (newDate - lastClicked)
    : null;
  const hoursLeft: any = timeLeft
    ? Math.floor(timeLeft / (60 * 60 * 1000))
    : null;
  const minutesLeft = timeLeft
    ? Math.floor((timeLeft - hoursLeft * 60 * 60 * 1000) / (60 * 1000))
    : null;

  return (
    <div className="flex justify-center">
      {/* <div className="w-[700px] bg-[hsl(222,17%,13%)] relative flex overflow-hidden h-[200px]"> */}
      <div className="absolute h-[20px] w-[10px] bg-white left-[50%]"></div>
      <div className={styles.case}>
        {/* <div className={`${styles.caseTop} ${isOpen ? styles.opening : ""}`}>
          <div className={styles.caseTitle}>Case Name</div>
          <button>Open Case</button>
        </div> */}
        <div className={`${styles.caseBottom} ${isOpen ? styles.opening : ""}`}>
          {items.map((item) => (
            <div
              key={item}
              className={`${styles.item} ${
                selectedItem === item ? styles.selected : ""
              }`}
              style={{ backgroundImage: `url(${item})` }}
            />
          ))}
        </div>
      </div>

      {/* </div> */}
      <div className="flex justify-center items-center">
        <button
          className="btn-green"
          disabled={timeLeft && timeLeft > 0}
          onClick={handleClick}
        >
          {timeLeft && timeLeft > 0
            ? `Button will be available in ${hoursLeft} hours and ${minutesLeft} minutes`
            : "Open Case"}
        </button>
      </div>
    </div>
  );
};

export default CasePage;
