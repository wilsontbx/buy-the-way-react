import React from "react";
import "./ProductsList.scss";
import { Link } from "react-router-dom";
import backendService from "../../services/backendAPI";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import Typography from "@material-ui/core/Typography";

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    backendService
      .getProductsList()
      .then((response) => {
        this.setState({
          products: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container mt-6">
        <Typography variant="h4" gutterBottom>
          Request List
        </Typography>
        <div data-resource-type="productslist" className="product-card">
          <div className="row">
            {this.state.products.length > 0
              ? this.state.products.map((item) => {
                  return (
                    <div className="col">
                      <Link
                        to={{
                          pathname: `/products/${item.productslug}`,
                          state: {
                            product: item,
                          },
                        }}
                      >
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={item.imageUrl}
                            className=".product-card__image,"
                            alt=""
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.productname}</h5>
                            {/* <p className="p-price">${item.price.$numberDecimal}</p> */}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(withRouter(ProductsList));
