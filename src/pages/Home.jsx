import React, { useState, useEffect } from "react";
import axios from "axios";

// testing redirect
//production build: yarn preview
//ttp://localhost:4173/

const backend = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  //============={Local state variables}=============================
  const redirectUrlL = localStorage.getItem("redirectUrl")
    ? JSON.parse(localStorage.getItem("redirectUrl"))
    : null;

  const userIdL = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;

  //============={ state variables}=============================
  const [redirectUrl, setRedirectUrl] = useState(redirectUrlL);
  const [userId, setUserId] = useState(userIdL);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (redirectUrl) {
      localStorage.setItem("redirectUrl", JSON.stringify(redirectUrl));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUrl]);

  console.log({ userId });
  console.log({ redirectUrl });
  console.log({ errorMessage });

 

  const landingPageEvent = () => {
    window.fbq("track", "HomePage");
  };

  useEffect(() => {
    landingPageEvent();
  }, []);


  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 300);
  });

  //https://1xlite-567488.top/en
  //https://1xlite-567488.top/en/registration?type=fast
  //bg-[#205583]

  async function logIn() {
    let newUrl = backend;
    if (userId && userId !== "1") {
      newUrl = `${backend}/?user_id=${userId}`;
    }
    console.log({ newUrl });
    try {
      const response = await axios.get(newUrl);

      if (response.data) {
        // registration successful
        setUserId(response.data.userId);
        setRedirectUrl(response.data.url);
        setIsLoading(false);
      }
    } catch (error) {
      console.log({ error });
      setErrorMessage({ "Lead error": error });
    }
  }

  useEffect(() => {
    logIn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function redirectUser() {
    if (redirectUrl || redirectUrlL) {
      const url = redirectUrl ? redirectUrl : redirectUrlL;
      window.location.replace(url);
    }
  }

  return (
    <div className="main-container">
      {/* ==============={on component mount}====================== */}

      {!userId && !redirectUrl && !redirectUrlL && (
        <button className="button">loading ...</button>
      )}

      {!userId && !redirectUrl && redirectUrlL && (
        <button className="button" onClick={redirectUser}>
          Launch
        </button>
      )}
      {/* ==============={Server delay}====================== */}

      {userId && !redirectUrl && (
        <button className="button" onClick={logIn}>
          Connecting
        </button>
      )}
      {/* ==============={First time user}====================== */}
      {!userId && redirectUrl && (
        <button className="button" onClick={redirectUser}>
          Launch
        </button>
      )}
      {/* ==============={Existing time user}====================== */}

      {userId && redirectUrl && (
        <button className="button" onClick={redirectUser}>
          Launch
        </button>
      )}
    </div>
  );
};

export default Home;
