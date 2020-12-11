import { Grid, Typography, Box } from "@material-ui/core";
import React from "react";
import backendAPI from "../../services/backendAPI";

import "./Product.scss";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      transaction: null,
      lasttransaction: null,
    };
  }

  componentDidMount() {
    const routeParams = this.props.match.params;

    if (this.props.location.state && this.props.location.state.productname) {
      this.setState({
        product: this.props.location.state.productname,
      });
      return;
    }

    this.getProduct(routeParams.slug);
  }

  getProduct(slug) {
    backendAPI
      .getProductBySlug(slug)
      .then((response) => {
        this.setState({
          product: response.data.product,
          transaction: response.data.transaction,
          lasttransaction: response.data.transaction[0].created_at,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  msToTime(duration) {
    let time = 0;
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));
    time = days > 0 ? days + "d" : hours > 0 ? hours + "h" : minutes + "m";
    return time;
  }
  render() {
    return (
      <div className="container mt-10">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div id="img-cover">
              <img
                id="img-product"
                src={this?.state?.product?.imageUrl}
                alt=""
              />
            </div>
            <Typography variant="h7">
              Latest request posted
              {" " +
                this.msToTime(
                  Date.now() - Date.parse(this.state.lasttransaction)
                ) +
                " "}
              ago
            </Typography>
            <Typography variant="h4">
              {this?.state?.product?.productname}
            </Typography>
            <Typography variant="h7">
              Purchase from {" " + this?.state?.product?.country}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">Open</Typography>
            <hr />
            {this.state.transaction
              ? this.state.transaction.map((item) => {
                  return (
                    <div>
                      <Typography variant="h5">{item.useremail}</Typography>
                      <Typography variant="h7">
                        <Box fontWeight="fontWeightLight">
                          {this.msToTime(
                            Date.now() - Date.parse(item.created_at)
                          ) + " "}
                          ago
                        </Box>
                      </Typography>

                      <p className="msg">
                        {item.message ? '"' + item.message + '"' : ""}
                      </p>
                      <div>
                        <Box fontWeight="fontWeightLight">WILLING TO PAY</Box>

                        <Box fontWeight="fontWeightBold" m={1}>
                          S${item.price}
                        </Box>
                      </div>
                      <div>
                        <Box fontWeight="fontWeightLight">QUANTITY</Box>
                        <Box fontWeight="fontWeightBold" m={1}>
                          {item.qty}
                        </Box>
                      </div>

                      <hr />
                    </div>
                  );
                })
              : ""}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">In Progress</Typography>
            <hr />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Product;
