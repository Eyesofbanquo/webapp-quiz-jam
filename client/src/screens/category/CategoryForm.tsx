import { Button, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CollapsibleAlert } from "../../need/an-alert/CollapsibleAlert";
import { makeRequest } from "../../networking/network";

export const CategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
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
        text={alertText}
        showAlert={showSuccessAlert}
        setShowAlert={setShowSuccessAlert}
      />
      <Grid item>
        <TextField
          id={"category-input-field"}
          className="standard-full-width"
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
          id={"create-category-submit-button"}
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
                if (results.data.data !== null) {
                  setAlertText(
                    `Successfully added the category "${categoryName}"!`
                  );
                  setUploaded(true);
                } else {
                  setAlertText(`The category "${categoryName}" already exists`);
                  setUploaded(false);
                }
              });
            } else {
              setAlertText(`Please input a name for the category.`);
              setUploaded(false);
            }
            setShowSuccessAlert(true);
          }}
        >
          Submit
        </Button>
      </Grid>
      <Grid item>
        <Link
          id={"go-to-show-categories"}
          to={`/categories`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="secondary" onClick={() => {}}>
            View Categories
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
