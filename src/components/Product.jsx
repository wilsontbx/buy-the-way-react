import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import "./Product.scss";
class Product extends React.Component {
  // handle image upload to cloudinary via endpoint

  handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');

    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "ml_default");
    const options = {
      method: "POST",
      body: formData,
    };
    console.log(this.props);

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.Cloudinary.com/v1_1/duc6i2tt0/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        this.props.setImage({
          imageUrl: res.secure_url,
          imageAlt: `An image of ${res.original_filename}`,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      productname,
      imageUrl,
      imageAlt,
      country,
      category,
      foodexpiry,
      foodchilled,
      foodspecial,
      collectspecial,
      existingProduct,
      // productnameautocomplete,
      namelist,
    } = this.props.item;
    // const namelist = this.props.item.namelist;

    return (
      <div>
        <Autocomplete
          disabled={existingProduct ? true : false}
          // options={namelist.map((option) => option.productname)}
          options={namelist}
          className="field"
          getOptionLabel={(option) => option.productname}
          freeSolo
          fullWidth
          // value={productnameautocomplete}
          onChange={this.props.handleChangeAutoCom}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product Name"
              margin="normal"
              variant="standard"
              value={productname}
              name="productname"
              onChange={(e) => {
                this.props.handleSearch(e);
              }}
              className="field"
            />
          )}
          renderOption={(option, { inputValue }) => {
            const matches = match(option.productname, inputValue);
            const parts = parse(option.productname, matches);

            return (
              <div>
                <img
                  src={`${option.imageUrl}`}
                  alt={""}
                  height={60}
                  width={60}
                />
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 900 : 100 }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            );
          }}
        />
        {existingProduct ? (
          <div className="field">
            <p className="help is-black is-italic">
              Do you to change to other product?
            </p>
            <Button
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              color="secondary"
              onClick={(e) => {
                this.props.handleRemoveExisting(e);
              }}
            >
              (clear)
            </Button>
          </div>
        ) : (
          ""
        )}
        <FormControl className="field">
          <section>
            <form>
              <div className="form-group">
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  disabled={existingProduct ? true : false}
                  startIcon={<CloudUploadIcon />}
                  onChange={this.handleImageUpload}
                >
                  Upload
                  <input accept="image/*" type="file" hidden />
                </Button>
              </div>
            </form>
          </section>

          <section>
            <p>The resulting image will be displayed here</p>
            {imageUrl && (
              <figure className="image is-128x128">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="displayed-image"
                />
              </figure>
            )}
          </section>
        </FormControl>

        <FormControl fullWidth className="field">
          <InputLabel>Country</InputLabel>
          <Select
            disabled={existingProduct ? true : false}
            name="country"
            value={country}
            onChange={(e) => {
              this.props.setCurrentState(e);
            }}
          >
            <MenuItem value={"Hong Kong"}>Hong Kong</MenuItem>
            <MenuItem value={"Japan"}>Japan</MenuItem>
            <MenuItem value={"Korea"}>Korea</MenuItem>
          </Select>
          {/* <p className="help is-black is-italic">
            Current available country is Hong Kong only
          </p> */}
        </FormControl>

        <FormControl fullWidth className="field">
          <InputLabel>Category</InputLabel>
          <Select
            disabled={existingProduct ? true : false}
            name="category"
            value={category}
            onChange={(e) => {
              this.props.setCurrentState(e);
            }}
          >
            <MenuItem value={""}>Select dropdown</MenuItem>
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Collectible"}>Collectible item</MenuItem>
          </Select>
        </FormControl>
        {this.props.item.category === "Food" ? (
          <FormGroup component="fieldset" className="field">
            <FormLabel component="legend">
              What is the nature of the product
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={existingProduct ? true : false}
                  checked={foodexpiry}
                  onChange={(e) => {
                    this.props.setCheckedBox(e);
                  }}
                  name="foodexpiry"
                  color="primary"
                />
              }
              label="Does it have an expiry of 3-5 days?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={existingProduct ? true : false}
                  checked={foodchilled}
                  onChange={(e) => {
                    this.props.setCheckedBox(e);
                  }}
                  name="foodchilled"
                  color="primary"
                />
              }
              label="Does it need to be chilled?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={existingProduct ? true : false}
                  checked={foodspecial}
                  onChange={(e) => {
                    this.props.setCheckedBox(e);
                  }}
                  name="foodspecial"
                  color="primary"
                />
              }
              label="Do you require special handling?"
            />
          </FormGroup>
        ) : this.props.item.category === "Collectible" ? (
          <FormControl component="fieldset" className="field">
            <FormLabel component="legend">Is this item fragile?</FormLabel>
            <RadioGroup
              name="collectspecial"
              value={collectspecial}
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            >
              <FormControlLabel
                disabled={existingProduct ? true : false}
                value={"yes"}
                control={<Radio />}
                label="Yes, it requires special handling"
              />
              <FormControlLabel
                disabled={existingProduct ? true : false}
                value={"no"}
                control={<Radio />}
                label="No, the item is safe for the next-day delivery"
              />
            </RadioGroup>
          </FormControl>
        ) : null}
      </div>
    );
  }
}

export default Product;
