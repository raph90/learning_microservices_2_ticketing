import React from "react";
import axios from "axios";
function LandingPage({ currentUser }) {
  console.log("current user", currentUser)
  axios.get("/api/users/currentuser");
  return <h1>Landing PAge</h1>;
}

LandingPage.getInitialProps = async () => {
  if (typeof window === "undefined") {
    // we're on the server
    console.log("on the server");
    const hostHeader = { Host: "ticketing.dev" };
    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      { headers: hostHeader }
    );
    return response.data
    
  }

};

export default LandingPage;
