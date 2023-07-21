import React, { useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import { IconButton, TextField, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext, UrlData } from "../../App";
import generateShortUrl from "../../utils/generateShortUrl";

const UrlEdit: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUrlData, setSelectedUrlData] = useState<UrlData | null>(null);
  const [urlsBeingDeleted, setUrlsBeingDeleted] = useState<number[]>([]);
  const { urls, setUrls } = useContext(DataContext);
  const inputUrlRef = React.useRef<HTMLInputElement>(null);

  const handleOpen = (urlData: UrlData) => {
    setSelectedUrlData(urlData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedUrlData(null);
    setIsOpen(false);
  };

  const handleSaveChanges = () => {
    if (selectedUrlData) {
      const updatedData = urls.map((data) =>
        data.id === selectedUrlData.id
          ? { ...data, longUrl: selectedUrlData.longUrl }
          : data
      );
      setUrls(updatedData);
      localStorage.setItem("savedUrls", JSON.stringify(updatedData));
      setIsOpen(false);
    }
  };

  const handleLongUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUrlData) {
      setSelectedUrlData((prevData: UrlData | null) => ({
        ...prevData!,
        longUrl: event.target.value,
      }));
    }
  };

  const handleGenerateShortUrl = () => {
    if (selectedUrlData) {
      const newShortUrl = generateShortUrl(selectedUrlData.longUrl);
      setSelectedUrlData((prevData: UrlData | null) => ({
        ...prevData!,
        shortUrl: newShortUrl,
      }));
    }
  };

  const handleDelete = (urlData: UrlData) => {
    const itemIndex = urls.findIndex((data) => data.id === urlData.id);
    if (itemIndex !== -1) {
      const urlItem = document.getElementById(`url-item-${urlData.id}`);
      if (urlItem) {
        urlItem.classList.add("shaking");
      }

      setTimeout(() => {
        const updatedData = urls.filter((data) => data.id !== urlData.id);
        setUrls(updatedData);
        localStorage.setItem("savedUrls", JSON.stringify(updatedData));
      }, 500);
      setTimeout(() => {
        if (urlItem) {
          urlItem.classList.remove("shaking");
        }
      }, 1000);
    }
  };

  return (
    <Grid
      item
      xs={12}
      bgcolor={"rgb(245 233 194)"}
      borderRadius={"10px"}
      marginX={"10px"}
    >
      {urls.length === 0 && (
        <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
          No URL is saved in the database.
        </p>
      )}
      {urls.length > 0 &&
        urls.map((urlData) => (
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            key={urlData.id}
            id={`url-item-${urlData.id}`}
            className={urlsBeingDeleted.includes(urlData.id) ? "shaking" : ""}
            sx={{
              width: "100%",
              padding: "10px 20px",
              borderBottom: "1px solid #ccc",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Grid item xs={12} md={6}>
              <div>
                <strong>Short URL:</strong> {urlData.shortUrl}
              </div>
              <div>
                <strong>Long URL:</strong> {urlData.longUrl}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IconButton onClick={() => handleOpen(urlData)}>
                <EditIcon color={"primary"} />
              </IconButton>
              <IconButton onClick={() => handleDelete(urlData)}>
                <DeleteIcon color={"error"} />
              </IconButton>
            </Grid>
          </Grid>
        ))}

      <Modal
        open={isOpen}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Grid
          container
          bgcolor={"white"}
          alignItems="center"
          justifyContent="center"
          sx={{
            outline: "none",
            borderRadius: "10px",
            minHeight: "300px",
            padding: "20px 0",
          }}
        >
          <Grid item xs={8} md={6}>
            {selectedUrlData && (
              <>
                <TextField
                  fullWidth
                  label="Short URL"
                  variant="outlined"
                  value={selectedUrlData.shortUrl}
                  disabled
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  label="Long URL"
                  variant="outlined"
                  multiline
                  value={selectedUrlData.longUrl}
                  onChange={handleLongUrlChange}
                />

                <br />
                <br />
                <div
                  style={{
                    border: "2px solid #FFD900",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={handleGenerateShortUrl}
                    type={"button"}
                    color={"default"}
                  >
                    Generate
                  </IconButton>
                </div>
                <br />

                <div
                  style={{
                    backgroundColor: "#FFD966",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={handleSaveChanges}
                    type={"button"}
                    color={"default"}
                  >
                    Save Changes
                  </IconButton>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default UrlEdit;
