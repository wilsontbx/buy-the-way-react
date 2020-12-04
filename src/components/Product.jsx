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
    } = this.props.item;
    return (
      <div>
        <FormControl fullWidth>
          <TextField
            id="standard-basic"
            type="text"
            value={productname}
            name="productname"
            label="Product Name"
            placeholder="Enter the product name"
            onChange={(e) => {
              this.props.setCurrentState(e);
            }}
          />
        </FormControl>

        <FormControl>
          <section>
            <form>
              <div className="form-group">
                <Button
                  variant="contained"
                  component="label"
                  size="small"
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
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
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
          <p className="help is-black is-italic">
            Current available country is Hong Kong only
          </p>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
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
          <FormGroup component="fieldset">
            <FormLabel component="legend">
              What is the nature of the product
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
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
          <FormControl component="fieldset">
            <FormLabel component="legend">Is this item fragile?</FormLabel>
            <RadioGroup
              name="collectspecial"
              value={collectspecial}
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes, it requires special handling"
              />
              <FormControlLabel
                value="no"
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
