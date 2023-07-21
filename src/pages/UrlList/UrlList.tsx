import React, { ChangeEvent, useContext, useState } from "react";
import { DataContext } from "../../App";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Typography,
  Box,
  Pagination,
} from "@mui/material";

export default function UrlList() {
  const { urls, setUrls } = useContext(DataContext);

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(urls.length / itemsPerPage);

  // Calculate the starting and ending index of the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, urls.length);

  // Handle page change
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Function to open the long URL in a new page
  const handleOpenLongUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Grid item xs={12} paddingX={2}>
      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "rgb(245 233 194)",
          borderRadius: "30px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  No URL is saved in the database.
                </TableCell>
              </TableRow>
            )}
            {urls.length > 0 &&
              urls.slice(startIndex, endIndex).map((urlData) => {
                return (
                  <TableRow key={urlData.id}>
                    <TableCell>{urlData.id}</TableCell>
                    <TableCell>
                      <Link
                        href={urlData.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOpenLongUrl(urlData.longUrl)}
                      >
                        {urlData.shortUrl}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(urlData.created_at).toISOString().split("T")[0]}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box mt={2}>
          <Typography
            variant="caption"
            style={{ color: "white", textAlign: "center" }}
          >
            Showing {startIndex + 1} to {endIndex} of {urls.length} entries
          </Typography>
        </Box>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="text"
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            backgroundColor: "#ccc",
            borderRadius: "30px",
            padding: "5px",
          }}
        />
      </div>
    </Grid>
  );
}
