import React, { useContext } from "react";
import Grid from "@mui/material/Grid/Grid";
import TextField from "@mui/material/TextField/TextField";
import MyDivider from "./MyDivider";
import ShowTextWithColor from "./ShowTextWithColor";
import EntryButton from "./EntryButton";
import generateShortUrl from "../../utils/generateShortUrl";
import { IconButton } from "@mui/material";
import { DataContext } from "../../App";

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
    let isValid = false;
    isValid = url.length > 5 ? true : false;
    return isValid;
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

  const handleSave = (data: object, storedData: Array<object>) => {
    try {
      const newData = {
        id: storedData !== null ? storedData.length + 1 : 1,
        ...data,
        created_at: new Date(),
      };
      storedData && storedData.push(newData);
      localStorage.setItem("savedUrls", JSON.stringify(storedData));
      setSaved(true);
      setUrls(storedData);
    } catch (e) {
      alert(
        "your local storage is not working. Couldn't perfrom the save operation."
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
