import React from "react";
import axios from "axios";
function LandingPage({ currentUser }) {
  axios.get("/api/users/currentuser");
  return <h1>Landing PAge</h1>;
}

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    // we're on the server
    const { data } = await axios.get(
      // ! STUCK HERE!
      "http://172.17.0.7/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );
    console.log(data);
    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser");
  }

  return data;
};

export default LandingPage;
