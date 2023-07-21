import React, { useContext } from "react";
import Grid from "@mui/material/Grid/Grid";
import TextField from "@mui/material/TextField/TextField";
import MyDivider from "./MyDivider";
import ShowTextWithColor from "./ShowTextWithColor";
import EntryButton from "./EntryButton";
import generateShortUrl from "../../utils/generateShortUrl";
import { IconButton } from "@mui/material";
import { DataContext, UrlData } from "../../App";

const SHORT_URL_DEFAULT: string = "No generation yet.";

interface UrlEntryProps {
  screenType: string;
}

const UrlEntry: React.FC<UrlEntryProps> = ({ screenType }) => {
  const [longUrl, setLongUrl] = React.useState("");
  const [shortUrl, setShortUrl] = React.useState(SHORT_URL_DEFAULT);
  const [copied, setCopied] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const { urls, setUrls } = useContext(DataContext);
  const inputUrlRef = React.useRef<HTMLInputElement>(null);

  const handleValidateLongUrl = (url: string): boolean => {
    return url.length > 5;
  };

  const handleGenerate = (url: string) => {
    setShortUrl(generateShortUrl(url));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  const handleClear = () => {
    setLongUrl("");
    setShortUrl(SHORT_URL_DEFAULT);
    setCopied(false);
    setSaved(false);
  };

  const handleSave = (
    data: { shortUrl: string; longUrl: string },
    storedData: UrlData[]
  ) => {
    try {
      const newData = {
        id: storedData ? storedData.length + 1 : 1,
        ...data,
        created_at: new Date().toISOString(), // Convert date to ISO string
      };
      const updatedData = storedData ? [...storedData, newData] : [newData];
      localStorage.setItem("savedUrls", JSON.stringify(updatedData));
      setSaved(true);
      setUrls(updatedData);
    } catch (e) {
      alert(
        "Your local storage is not working. Couldn't perform the save operation."
      );
    }
  };

  return (
    <>
      <Grid
        item
        xs={12}
        paddingRight={screenType !== "small" ? "5px" : 0}
        paddingX={screenType !== "small" ? "0px" : "5px"}
        alignItems={"start"}
      >
        <TextField
          hiddenLabel
          fullWidth
          type="text"
          ref={inputUrlRef}
          value={longUrl}
          color={"warning"}
          style={{ backgroundColor: "white", borderRadius: "10px" }}
          id="outlined-basic"
          placeholder="Enter a long URL here"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ visibility: longUrl ? "visible" : "hidden" }}
                onClick={() => {
                  handleClear();
                }}
              >
                x
              </IconButton>
            ),
          }}
          onChange={(event) => {
            setLongUrl(event.target.value);
          }}
        />
        <EntryButton
          text="Generate Short URL"
          color="#FFC000"
          marginTop="10px"
          disabled={!handleValidateLongUrl(longUrl)}
          funcToExecute={() => handleGenerate(longUrl)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        paddingRight={screenType !== "small" ? "5px" : 0}
        paddingX={screenType !== "small" ? "0px" : "5px"}
        marginY={5}
      >
        <MyDivider />
      </Grid>
      <Grid
        item
        xs={12}
        paddingRight={screenType !== "small" ? "5px" : 0}
        paddingX={screenType !== "small" ? "0px" : "5px"}
        fontWeight={"bold"}
      >
        <ShowTextWithColor
          text={
            longUrl.length > 0 ? longUrl : "You have not entred any url yet."
          }
          color={longUrl.length > 0 ? "blue" : "red"}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        paddingRight={screenType !== "small" ? "5px" : 0}
        paddingX={screenType !== "small" ? "0px" : "5px"}
        spacing={1}
        marginTop={4}
      >
        <Grid item xs={12} md={12} lg={8} fontWeight={"bold"}>
          <ShowTextWithColor
            text={shortUrl.length > 0 ? shortUrl : SHORT_URL_DEFAULT}
            color="green"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <EntryButton
            text={copied ? "Copied" : "Copy"}
            disabled={shortUrl === SHORT_URL_DEFAULT}
            funcToExecute={() => handleCopy()}
            color="#FFE699"
            marginTop="0px"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <EntryButton
            text={saved ? "Saved" : "Save"}
            color="#FFD966"
            marginTop="0px"
            disabled={shortUrl === SHORT_URL_DEFAULT}
            funcToExecute={() => handleSave({ shortUrl, longUrl }, urls)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UrlEntry;
