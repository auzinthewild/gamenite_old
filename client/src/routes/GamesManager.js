import React from "react";
import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";

export default function GamesManager() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  return (
    <div
      style={{
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2>You Joined {searchParams.get("groupName")}!</h2>
      </div>
      <div>
        <Button href={"/auth/login"}>Log In To Gamenite</Button>
      </div>
    </div>
  );
}
