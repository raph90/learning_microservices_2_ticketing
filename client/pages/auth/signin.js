import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: (successData) => {
      Router.push("/");
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
  };
  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {errors}
        <button className="btn btn-primary">Sign in</button>
      </form>
    </>
  );
};
