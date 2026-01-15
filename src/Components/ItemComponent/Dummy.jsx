import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dummy = () => {
  const navigate = useNavigate();
  const { pid } = useParams();

  useEffect(() => {
    if (pid === "1") {
      navigate("/LostItemEntry");
    } 
    else if (pid === "2") {
      navigate("/FoundItemEntry");
    } 
    else if (pid === "3") {
      navigate("/MatchItemSearch/1"); // example lostItemId
    }
  }, [navigate, pid]);

  return null;
};

export default Dummy;