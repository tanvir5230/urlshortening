import React from "react";
import Grid from "@mui/material/Grid/Grid";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import MyDivider from "./MyDivider";
import ShowTextWithColor from "./ShowTextWithColor";
import EntryButton from "./EntryButton";

export default function UrlEntry() {
  return (
    <>
      <Grid item xs={12} paddingRight={5}>
        <TextField
          hiddenLabel
          fullWidth
          color={"warning"}
          style={{ backgroundColor: "white", borderRadius: "10px" }}
          id="outlined-basic"
          placeholder="Enter a long URL here"
          variant="outlined"
        />
        <EntryButton
          text="Generate Short URL"
          color="#FFC000"
          marginTop="10px"
        />
      </Grid>
      <Grid item xs={12} paddingRight={5} marginY={5}>
        <MyDivider />
      </Grid>
      <Grid item xs={12} paddingRight={5}>
        <ShowTextWithColor
          text="You have not entered any URL yet. You will see here what you have entered."
          color="red"
        />
      </Grid>
      <Grid container item xs={12} paddingRight={5} spacing={1} marginTop={4}>
        <Grid item xs={12} md={12} lg={8}>
          <ShowTextWithColor text="linkasdfasdfadsf.com" color="blue" />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <EntryButton text="Copy" color="#FFE699" marginTop="0px" />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <EntryButton text="Save" color="#FFD966" marginTop="0px" />
        </Grid>
      </Grid>
    </>
  );
}
