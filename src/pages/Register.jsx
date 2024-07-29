import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const backend = process.env.REACT_APP__BACKEND_URL;
// const backend = "http://localhost:4000";

const Register = () => {
  const params = useParams();
  const { sub_id_1, sub_id_2 } = params;
  const [redirectUrl, setRedirectUrl] = useState("");

  const userIdL = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;
  const [userId, setUserId] = useState(userIdL);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  console.log({ params });
  console.log({ userId });
  console.log({ redirectUrl });
  console.log({ errorMessage });

  const registrationPageEvent = () => {
    window.fbq("track", "RegistrationPage");
  };

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 300);
  });

  useEffect(() => {
    if (!isLoading) {
      signUp();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  async function signUp() {
    let newUrl = "";

    if (sub_id_1 && sub_id_2) {
      newUrl = `${backend}/register/?sub_id_1=${sub_id_1}&sub_id_2=${sub_id_1}`;
    }
    if (sub_id_1 && !sub_id_2) {
      newUrl = `${backend}/register/?sub_id_1=${sub_id_1}`;
    }

    if (!sub_id_1 && !sub_id_2) {
      newUrl = `${backend}/register`;
    }

    console.log({ newUrl });
    try {
      const response = await axios.get(newUrl);

      if (response.data) {
        // registration successful
        registrationPageEvent(); // facebook event
        setUserId(response.data.userId);
        setRedirectUrl(response.data.url);
      }
    } catch (error) {
      // alert("Lead error");
      console.log({ error });
      setErrorMessage({ "Lead error": error });
    }
  }

  useEffect(() => {
    redirectUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUrl]);

  async function redirectUser() {
    if (userId && redirectUrl) {
      // store user to local storage
      window.location.replace(redirectUrl);
    }
  }

  return (
    <div className="main-container">
      {isLoading && !userId && !redirectUrl && (
        <button className="button">Registration in progress ...</button>
      )}

      {!isLoading && userId && !redirectUrl && (
        <button className="button">something went wrong ...</button>
      )}
      {isLoading && !userId && !redirectUrl && (
        <button className="button">processing ...</button>
      )}
    </div>
  );
};

export default Register;
