import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CollapsibleAlert } from "../../need/an-alert/CollapsibleAlert";
import { makeRequest } from "../../networking/network";

export const CategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ padding: 16 }}
    >
      <CollapsibleAlert
        id={"category-upload-alert"}
        type={uploaded ? "success" : "error"}
        text={
          uploaded
            ? "The category has been added!"
            : "This category already exists. Please try again."
        }
        showAlert={showSuccessAlert}
        setShowAlert={setShowSuccessAlert}
      />
      <Grid item>
        <TextField
          id="standard-full-width"
          label={categoryName}
          style={{ margin: 8 }}
          placeholder="Category name"
          helperText="Input category name"
          margin="normal"
          onChange={(event) => {
            setCategoryName(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item direction="column">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (categoryName !== "") {
              makeRequest({
                endpoint: "categories",
                method: "post",
                data: {
                  name: categoryName,
                },
              }).onReceive.then((results) => {
                setUploaded(results.data.data !== null);
                setShowSuccessAlert(true);
              });
            }
          }}
        >
          Submit
        </Button>
      </Grid>
      <Grid item>
        <Link to={`/categories`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" onClick={() => {}}>
            View Categories
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
