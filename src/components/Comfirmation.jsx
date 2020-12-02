import React from "react";

class Confirmation extends React.Component {
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

export default Confirmation;
