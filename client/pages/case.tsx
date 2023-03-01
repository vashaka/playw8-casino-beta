import React, { useState, useEffect, useRef, useContext } from "react";
import CryptoJS from "crypto-js";
import styles from "../styles/CaseOpening.module.css";
import { AppContext } from "../context/appContext";
import Login from "@/components/Login";
import axios from "axios";

const data = [
  {
    id: 1,
    title: "biggest prize",
    imageUrl:
      "https://www.csgodatabase.com/images/skins/webp/CZ75-Auto_Victoria.webp",
    // weight: 1,
    percentage: 10,
  },
  {
    id: 2,
    title: "2nd prize",
    imageUrl: "https://www.csgodatabase.com/images/skins/webp/AWP_Asiimov.webp",
    // weight: 3,
    percentage: 20,
  },
  {
    id: 3,
    title: "3rd prize",
    imageUrl: "https://www.csgodatabase.com/images/skins/webp/AWP_Asiimov.webp",
    // weight: 5,
    percentage: 20,
  },
  {
    id: 4,
    title: "nothing",
    imageUrl: "https://www.csgodatabase.com/images/skins/wep/AWP_Asiimov.webp",
    // weight: 10,
    percentage: 75,
  },

  // Add more items as needed
];
const CasePage = () => {
  const { openAuth, setOpenAuth, user, setUser, mongodbUser }: any =
    useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState<null | string | any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [latestWonItem, setLatestWonItem] = useState<any>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getLatestClick = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/button-click/latest",
          { params: { userId: user?.id } }
        );
        if (response.status === 200) {
          const lastClick = new Date(response.data.timestamp);
          if (new Date() - lastClick >= 24 * 60 * 60 * 1000) {
            setDisabled(false);
          } else {
            setErrorMessage(
              `You have to wait until ${new Date(
                lastClick.getTime() + 24 * 60 * 60 * 1000
              ).toLocaleString()} before you can click again.`
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.id) {
      getLatestClick();
    }
  }, [user]);

  useEffect(() => {
    if (selectedItem) {
      axios
        .patch("http://localhost:3001/postPrize", {
          user: mongodbUser,
          prize: selectedItem,
        })
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedItem, mongodbUser]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/postLatestPrize", {
        user: mongodbUser,
      })
      .then((resp) => resp.data)
      .then((userDoc) => {
        console.log(userDoc, "userDoc");
        setLatestWonItem(userDoc);
      })
      .catch((err) => console.log(err));
  }, [mongodbUser]);

  // console.log(selectedItem);
  const handleClick = async () => {
    // if (disabled && !errorMessage) {
    //   window.location.reload();
    // }
    if (errorMessage) {
      alert(errorMessage);
      window.location.reload();
    } else if (!user) {
      setOpenAuth(true);
    } else if (!mongodbUser) {
      alert("Try again");
      window.location.reload();
    } else if (user && !disabled) {
      // const items = data.map((d) => d.title);
      // const weights = data.map((d) => d.weight);
      // const totalWeight = weights.reduce((prev, curr) => prev + curr);
      // const randomNum = Math.random() * totalWeight;
      // let weightSum = 0;
      // for (let i = 0; i < items.length; i++) {
      //   weightSum += weights[i];
      //   if (randomNum <= weightSum) {
      //     setSelectedItem(items[i]);
      //     break;
      //   }
      // }
      const items = data.map((d) => d.title);
      const percentages = data.map((d) => d.percentage);
      const totalPercentage = percentages.reduce((prev, curr) => prev + curr);
      const randomNum = Math.random() * totalPercentage;
      let percentageSum = 0;
      for (let i = 0; i < items.length; i++) {
        percentageSum += percentages[i];
        if (randomNum <= percentageSum) {
          setSelectedItem(items[i]);
          break;
        }
      }
      // const index = Math.floor(Math.random() * items.length);
      // alert(index);
      // setSelectedItem(items[index]);

      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);

      const timestamp = new Date().toISOString();
      try {
        const response = await axios.post(
          "http://localhost:3001/api/button-click",
          {
            userId: user.id,
            timestamp,
          }
        );
        if (response.status === 201) {
          setDisabled(true);
        }
      } catch (error: any) {
        console.log(error);
        // if (error.response.status === 403) {
        //   setErrorMessage(error.response.data.message);
        // } else {
        //   console.error(error);
        // }
      }
    } else {
      alert("Unexpected Server Error 500, Try Logging in again");
      window.location.reload();
    }
  };

  return (
    <>
      <div className="relative h-full md:flex justify-center">
        {/* <div className="w-[700px] bg-[hsl(222,17%,13%)] relative flex overflow-hidden h-[200px]"> */}
        <div
          // style={{ transform: "translate(-50%, 50%)" }}

          className={`${styles.case} absolute md:w-[600px] max-w-[600px]`}
        >
          <div className={`${styles.caseTop} ${isOpen ? styles.opening : ""}`}>
            <div className={styles.caseTitle}>Case</div>
            <button className="caseTopButton" onClick={handleClick}>
              Open Case
            </button>
          </div>
          <div
            className={`${styles.caseBottom} ${isOpen ? styles.opening : ""}`}
          >
            {data.map((item) => (
              <div
                key={item.id}
                className={`${styles.item} ${
                  selectedItem === item.title ? styles.selected : ""
                }`}
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            whiteSpace: "nowrap",
          }}
          className="absolute -bottom-40 text-center text-red-400"
        >
          {errorMessage && <p>{errorMessage}</p>}
          <button className="caseTopButton mt-4 mb-4">
            Contact us on Discord
          </button>
          {latestWonItem && user && (
            <h1 className="text-sm">
              Your latest won item is{" "}
              {latestWonItem.prize.map((item: any) => (
                <span className="text-red-500"> {item} </span>
              ))}
              <span className="text-red-500"> {selectedItem} </span>, text us in
              discord to receive it
            </h1>
          )}
          <h2>text us on discord to receive prize</h2>
        </div>

        {/* </div> */}
      </div>
      {openAuth && <Login />}
    </>
  );
};

export default CasePage;