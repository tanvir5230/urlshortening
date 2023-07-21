import React, { createContext, useEffect, useState } from "react";
import { UrlEdit } from "./pages/UrlEdit/UrlEdit";
import UrlEntry from "./pages/UrlEntry/UrlEntry";
import UrlList from "./pages/UrlList/UrlList";

import Grid from "@mui/material/Grid";
import Logo from "./components/Logo";
// Import CSS
import "./App.css";
import useScreenType from "./utils/useScreenType";
import Navbar from "./components/Navbar/Navbar";

export type GlobalData = {
  urls: Array<object>;
  setUrls: React.Dispatch<React.SetStateAction<Array<object>>>;
};

export const DataContext = createContext<GlobalData>({
  urls: [],
  setUrls: () => {},
});

const App = () => {
  const [urls, setUrls] = useState<Array<object>>([]);
  const [currentPage, setCurrentPage] = useState<string>("enter");
  const screenType: string = useScreenType();

  const renderPage = (screenType: string) => {
    if (currentPage === "enter") {
      return <UrlEntry screenType={screenType} />;
    } else if (currentPage === "list") {
      return <UrlList />;
    } else if (currentPage === "edit") {
      return <UrlEdit />;
    }
  };

  useEffect(() => {
    try {
      const storedDataJson: string | null = localStorage.getItem("savedUrls");
      let storedData: Array<object> = [];
      if (storedDataJson !== null) {
        storedData = JSON.parse(storedDataJson);
        setUrls(storedData);
      } else {
        const arrToSave = JSON.stringify([]);
        localStorage.setItem("savedUrls", arrToSave);
      }
    } catch (e) {}
  }, []);

  return (
    <DataContext.Provider value={{ urls, setUrls }}>
      <Grid container className="App">
        <Grid
          container
          item
          xs={12}
          lg={10}
          xl={8}
          bgcolor="#404040"
          borderRadius={screenType !== "small" ? "30px" : 0}
          padding={screenType !== "small" ? "50px" : "0px"}
          height={screenType !== "small" ? "auto" : "100%"}
        >
          {screenType !== "small" && (
            <Grid className="logo-container" item xs={12}>
              <Logo width={200} height={150} />
            </Grid>
          )}
          {screenType === "small" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Logo width={130} height={100} />
            </div>
          )}
          <Grid
            container
            item
            spacing={2}
            xs={12}
            paddingX={screenType !== "small" ? "50px" : "0"}
            style={{
              height: screenType !== "small" ? "100%" : "90%",
              width: "100%",
              transform: screenType !== "small" ? "translateY(-75px)" : "",
            }}
          >
            <Grid
              container
              item
              xs={12}
              lg={11}
              height={"100%"}
              alignContent={"start"}
            >
              {renderPage(screenType)}
            </Grid>
            <Grid
              container
              item
              xs={12}
              lg={1}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Navbar
                currentPage={currentPage}
                size={screenType}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DataContext.Provider>
  );
};
export default App;
