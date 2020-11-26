import React from 'react'

class PostConfirmation extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    }

    componentDidMount() {

        // check if this.state.test !==""
        if (this.props.location.state && this.props.location.state.productname) {
            console.log(this.props.location.state)
            this.setState({
                name: this.props.location.state.productname

            })

            console.log(this.state.productname)

        }
    }

    render() {

        return (

            <div className="container">


                <div className="card">
                    <div className="card-header">
                        <div className="card-header-title">  </div>

                    </div>
                    <div className="card-content">{this.state.name}</div>

                </div>
            </div>
        )
    }
}

export default PostConfirmation