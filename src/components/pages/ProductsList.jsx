import React from 'react'
import './ProductsList.scss'
import { Link } from 'react-router-dom'
import backendService from "../../services/backendAPI";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";

class ProductsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts() {
        backendService.getProductsList()
            .then(response => {
                this.setState({
                    products: response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div id="page-product-listing" className="page-1-col">
                <div className="container">
                    <div className="page-heading">
                        <h1>Product List</h1>
                        <hr />
                    </div>
                    <div className="product-listing">
                        <div className="row">
                            {
                                this.state.products.length > 0 ? (
                                    this.state.products.map(item => {
                                        return (
                                            <div className="col-4" key={item._id}>
                                                <div className="product">
                                                    <figure>
                                                        <img className="img-fluid" src={item.imageUrl} alt="" />
                                                        <figcaption>
                                                            <p className="p-name">{item.productname}</p>
                                                            {/* <p className="p-price">${item.price.$numberDecimal}</p> */}
                                                        </figcaption>
                                                    </figure>
                                                    <Link to={{
                                                        pathname: `/products/${item.slug}`,
                                                        state: {
                                                            product: item
                                                        }
                                                    }}>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                        <p>No products at this moment</p>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(ProductsList));
