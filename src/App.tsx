import React, { useState } from "react";
import { UrlEdit } from "./pages/UrlEdit/UrlEdit";
import UrlEntry from "./pages/UrlEntry/UrlEntry";
import UrlList from "./pages/UrlList/UrlList";

import Grid from "@mui/material/Grid";
import Logo from "./components/Logo";
// Import CSS
import "./App.css";
import useScreenType from "./utils/useScreenType";
import SmallScreenNavbar from "./components/Navbar/Navbar";

const App = () => {
  const [currentPage, setCurrentPage] = useState("entry");
  const screenType: string = useScreenType();

  const renderPage = () => {
    if (currentPage === "entry") {
      return <UrlEntry />;
    } else if (currentPage === "list") {
      return <UrlList />;
    } else if (currentPage === "edit") {
      return <UrlEdit />;
    }
  };

  return (
    <Grid container className="App">
      <Grid
        container
        // width={1350}
        height={800}
        xs={12}
        lg={10}
        xl={8}
        bgcolor="#404040"
        borderRadius={"30px"}
      >
        <Grid className="logo-container" xs={12}>
          <Logo width={200} height={150} />
        </Grid>
        <Grid container xs={12} className="main-content">
          <Grid xs={12} lg={11} height={"100%"} bgcolor={"blue"}></Grid>
          <Grid xs={12} lg={1} height={"100%"} bgcolor={"red"}>
            <SmallScreenNavbar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default App;
