import React from "react";

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
    const { imageUrl, imageAlt } = this.props.item;
    return (
      <div>
        <div className="field">
          <label className="label">Product Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="productname"
              placeholder="Enter the product name"
              onChange={(e) => {
                this.props.setCurrentState(e);
              }}
            />
          </div>
        </div>

        <main className="App">
          <section className="left-side">
            <form>
              <div className="form-group">
                <input type="file" />
              </div>

              <button
                type="button"
                className="btn"
                onClick={this.handleImageUpload}
              >
                Submit
              </button>
            </form>
          </section>
          <section className="right-side">
            <p>The resulting image will be displayed here</p>
            {imageUrl && (
              <img src={imageUrl} alt={imageAlt} className="displayed-image" />
            )}
          </section>
        </main>

        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                name="country"
                onChange={(e) => {
                  this.props.setCurrentState(e);
                }}
              >
                <option>Hong Kong</option>
                <option>Japan</option>
                <option>Korea</option>
              </select>
            </div>
          </div>
          <p className="help is-black is-italic">
            Current available country is Hong Kong only
          </p>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                onChange={(e) => {
                  this.props.setCurrentState(e);
                }}
                name="category"
              >
                <option value="">Select dropdown</option>
                <option value="Food">Food</option>
                <option value="Collectible">Collectible item</option>
              </select>
            </div>
          </div>
        </div>

        {this.props.item.category === "Food" ? (
          <div id="food">
            <label className="label">What is the nature of the product</label>

            <div className="field">
              <div className="control">
                <input
                  type="checkbox"
                  name="foodexpiry"
                  onChange={(e) => {
                    this.props.setCurrentState(e);
                  }}
                />
                Does it have an expiry of 3-5 days?
              </div>

              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="foodchilled"
                    onChange={(e) => {
                      this.props.setCurrentState(e);
                    }}
                  />
                  Does it need to be chilled?
                </label>
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="foodspecial"
                  onChange={(e) => {
                    this.props.setCurrentState(e);
                  }}
                />
                Do you require special handling?
              </label>
            </div>
          </div>
        ) : this.props.item.category === "Collectible" ? (
          <div id="collectible">
            <label className="label">Is this item fragile?</label>
            <div className="control">
              <label className="radio">
                <input
                  type="radio"
                  name="collectspecial"
                  onChange={(e) => {
                    this.props.setCurrentState(e);
                  }}
                />
                Yes, it requires special handling
              </label>
            </div>

            <label className="radio">
              <input
                type="radio"
                name="collectspecial"
                onChange={(e) => {
                  this.props.setCurrentState(e);
                }}
              />
              No, the item is safe for the next-day delivery
            </label>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Product;
