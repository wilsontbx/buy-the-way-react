import React from "react";

class PostConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productname: null,
      category: null,
      showfood: false,
      showcollectible: false,
      imageurl: null,
      country: null,
      foodexpiry: null,
      foodchilled: null,
      foodspecial: null,
      collectspecial: null,
      collectnextday: null,
      url: null,
      qty: null,
      price: null,
      message: null,
      receipt: null,
    };
  }

  componentDidMount() {
    // check if this.state.test !==""
    if (this.props.location.state && this.props.location.state.productname) {
      this.setState({
        name: this.props.location.state.name,
        category: this.props.location.state.category,
        showfood: this.props.location.state.showfood,
        showcollectible: this.props.location.state.showcollectible,
        productname: this.props.location.state.productname,
        imageurl: this.props.location.state.imageurl,
        country: this.props.location.state.country,
        foodexpiry: this.props.location.state.foodexpiry,
        foodchilled: this.props.location.state.foodchilled,
        foodspecial: this.props.location.state.foodspecial,
        collectspecial: this.props.location.state.collectspecial,
        collectnextday: this.props.location.state.collectnextday,
        url: this.props.location.state.url,
        qty: this.props.location.state.qty,
        price: this.props.location.state.price,
        message: this.props.location.state.message,
        receipt: this.props.location.state.receipt,
      });
      console.log(
        Object.keys(this.state).map((item, idx) => {
          console.log(idx);
        })
      );
    }
  }

  render() {
    return (
      <div className="container mt-5 ml-5">
        <div className="card">
          <div className="card-header">
            <div className="card-header-title"> Confirmation </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <table className="table mt-5">
                <tbody>
                  {Object.keys(this.state).map((item, idx) => {
                    if (
                      Object.values(this.state)[idx] !== null &&
                      Object.values(this.state)[idx]
                    ) {
                      return (
                        <tr>
                          <td className="has-text-weight-bold"> {item}: </td>
                          <td> {Object.values(this.state)[idx]}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <button className="button is-primary has-text-right">Confirm</button>
          <button className="button is-danger"> Back</button>
        </div>
      </div>
    );
  }
}

export default PostConfirmation;
