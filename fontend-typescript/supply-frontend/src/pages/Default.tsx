import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLink } from "../hooks/useLink";

export const Default = () => {
  const navigator = useNavigate();
  const links = useLink();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || !token || token === "") {
      navigator(links.login());
    } else {
      navigator(links.home());
    }
  }, []);
  return <Fragment></Fragment>;
};
