import React from "react";
import Button from "@material-ui/core/Button";
import Product from "../Product";
import TransactionRequest from "../TransactionRequest";
import Confirmation from "../Comfirmation";
import backendService from "../../services/backendAPI";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import "./PostRequest.scss";

const product = ["productname", "imageUrl", "country", "category"];
const transaction = ["qty", "price"];
class PostRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productname: "",
      imageUrl: "",
      imageAlt: "",
      country: "",
      category: "",
      foodexpiry: true,
      foodchilled: true,
      foodspecial: true,
      collectspecial: "no",
      url: "",
      qty: "",
      price: "",
      message: "",
      receipt: "no",
      step: 1,
      submitCheck: "",
      formErr: {
        productname: "",
        imageUrl: "",
        country: "",
        category: "",
        qty: "",
        price: "",
      },
      fieldName: {
        productname: "Product name",
        imageUrl: "Product image",
        country: "Country of purchase",
        category: "Category of the product",
        qty: "Quantity",
        price: "Price",
      },
    };
  }
  setCurrentState(e) {
    const state = {};
    this.setState({ ...state, [e.target.name]: e.target.value });
  }

  setImage(e) {
    this.setState(e);
  }

  setCheckedBox(e) {
    const state = {};
    this.setState({ ...state, [e.target.name]: e.target.checked });
  }

  setForm(e, value) {
    let step = this.state.step;
    let error = this.state.formErr;
    let field = this.state.fieldName;
    let msg = false;
    if (step === 1) {
      for (let i = 0; i < product.length; i++) {
        if (this.state[product[i]] === "") {
          error[product[i]] = field[product[i]] + " is required";
          msg = true;
        } else {
          error[product[i]] = "";
        }
      }
    } else if (step === 2) {
      for (let i = 0; i < transaction.length; i++) {
        if (this.state[transaction[i]] === "") {
          error[transaction[i]] = field[transaction[i]] + " is required";
          msg = true;
        } else if (this.state[transaction[i]] < 1) {
          error[transaction[i]] = field[transaction[i]] + " must at least 1";
          msg = true;
        } else {
          error[transaction[i]] = "";
        }
      }
    }
    if (msg) {
      this.setState({
        formErr: error,
      });
    } else {
      this.setState({
        step: step + value,
      });
    }
  }

  handleFormSubmission(e) {
    e.preventDefault();
    const {
      productname,
      imageUrl,
      country,
      category,
      foodexpiry,
      foodchilled,
      foodspecial,
      collectspecial,
      url,
      qty,
      price,
      message,
      receipt,
    } = this.state;
    const token = this.props.cookies.get("token");
    if (token || !token === "undefined" || token === "null") {
      backendService
        .getUserInfo(token)
        .then((response) => {
          if (!response.data.success) {
            this.setState({
              submitCheck: "Please login or register!",
            });
            return;
          }
          const email = response.data.email;
          backendService
            .create(
              productname,
              imageUrl,
              country,
              category,
              foodexpiry,
              foodchilled,
              foodspecial,
              collectspecial,
              url,
              qty,
              price,
              message,
              receipt,
              email
            )
            .then((response) => {
              if (!response.data.success) {
                this.setState({
                  submitCheck: "Some important item were invalid",
                });
                return;
              }
              console.log(response);
              this.props.history.push("/");
            })
            .catch((err) => {
              this.setState({
                submitCheck: "Error occurred in form, please check values",
              });
            });
        })
        .catch((err) => {
          this.setState({
            submitCheck: "Please login or register!",
          });
        });
    }
  }

  render() {
    let errMsg = [];
    let objectKeys = Object.keys(this.state.formErr);
    objectKeys.forEach((item) => {
      errMsg.push(<h6>{this.state.formErr[item]}</h6>);
    });

    return (
      <div className="container mt-5">
        <Grid container spacing={10}>
          <Grid item xs={12} sm={5} className="steper">
            <Typography variant="h3" gutterBottom>
              <ShoppingCartIcon fontSize="large" />
              Post Request
            </Typography>
            <ul className="steps is-vertical">
              <li>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={1}>
                    {this.state.step === 1 ? (
                      <Brightness1OutlinedIcon fontSize="large" />
                    ) : (
                      <CheckCircleRoundedIcon fontSize="large" />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <p className="is-size-3">Product Details</p>
                    <p>
                      Let us know what product you want to buy from overseas!
                    </p>
                  </Grid>
                </Grid>
              </li>
              <li>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={1}>
                    {this.state.step < 3 ? (
                      <Brightness1OutlinedIcon fontSize="large" />
                    ) : (
                      <CheckCircleRoundedIcon fontSize="large" />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <p className="is-size-3">Request Details</p>
                    <p>
                      Amount willing to pay to traveller, product infomation,
                      quantity and note to your travellers
                    </p>
                  </Grid>
                </Grid>
              </li>
              <li>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={1}>
                    {this.state.step === 3 ? (
                      <CheckCircleRoundedIcon fontSize="large" />
                    ) : (
                      <Brightness1OutlinedIcon fontSize="large" />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <p className="is-size-3">Confirmation</p>
                    <p>
                      Confirm your details of your request and publish so our
                      travellers can offer your help!
                    </p>
                  </Grid>
                </Grid>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={7}>
            <form
              onSubmit={(e) => {
                this.handleFormSubmission(e);
              }}
            >
              <p>STEP {this.state.step} OF 3</p>
              {this.state.step === 1 ? (
                <div>
                  <Typography variant="h5" gutterBottom>
                    Product Details
                  </Typography>
                  {errMsg}
                  <Product
                    setCurrentState={(e) => {
                      this.setCurrentState(e);
                    }}
                    setImage={(e) => {
                      this.setImage(e);
                    }}
                    setCheckedBox={(e) => {
                      this.setCheckedBox(e);
                    }}
                    item={this.state}
                  />
                </div>
              ) : this.state.step === 2 ? (
                <div>
                  <Typography variant="h5" gutterBottom>
                    Request Details
                  </Typography>
                  {errMsg}
                  <TransactionRequest
                    setCurrentState={(e) => {
                      this.setCurrentState(e);
                    }}
                    item={this.state}
                  />
                </div>
              ) : (
                <div>
                  <Typography variant="h5" gutterBottom>
                    Confirmation
                  </Typography>
                  {errMsg}
                  <Confirmation item={this.state} />
                </div>
              )}
              <div className="field is-grouped is-grouped-right">
                {this.state.step === 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.setForm(e, 1);
                    }}
                  >
                    Next
                  </Button>
                ) : this.state.step > 2 ? (
                  <div>
                    {this.state.submitCheck}
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        this.setForm(e, -1);
                      }}
                    >
                      Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        this.setForm(e, -1);
                      }}
                    >
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        this.setForm(e, 1);
                      }}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withCookies(withRouter(PostRequest));
