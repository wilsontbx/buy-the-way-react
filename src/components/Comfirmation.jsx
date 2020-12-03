import React from "react";

class Confirmation extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.item.productname}</h1>
      </div>
    );
  }
}

export default Confirmation;
