import React from 'react'

class PostRequest extends React.Component {
    render() {
        return (
            <div className="container">
                <h2 className="title mt-2"><strong>Post Request</strong></h2>
                <div className='columns'>
                    <div className="column">

                        <div className="field">
                            <label className="label">Product name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Enter the product name" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Photo</label>
                            <div className="file is-boxed">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="photo" />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label has-text-grey">
                                            Choose a file…
                                    </span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Product reference link (optional)</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Enter the URL for reference" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Food or collectible items</label>
                            <div className="control">

                                <div className="select is-fullwidth">
                                    <select>
                                        <option>Select dropdown</option>
                                        <option>Food</option>
                                        <option>collectible item</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Country</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select>
                                        <option>Hong Kong</option>
                                    </select>
                                </div>
                            </div>
                            <p className="help is-black is-italic">Current available country is Hong Koang only</p>
                        </div>

                    </div>

                    <div className="column is-offset-1">

                        <label className="label">Qty of purchase</label>
                        <div className="field has-addons">
                            <p className="control is-expanded">
                                <input className="input" type="text" placeholder="" />
                            </p>
                            <p className="control">
                                <span className="select">
                                    <select>
                                        <option>pc</option>
                                        <option>box</option>
                                    </select>
                                </span>
                            </p>
                        </div>

                        <label className="label">Service Fee</label>
                        <div className="field has-addons">
                            <p className="control">
                                <a className="button is-static">
                                    S$
                                </a>
                            </p>
                            <p className="control is-expanded">
                                <input className="input" type="text" placeholder="Amount in SGD" />
                            </p>
                        </div>

                        <label className="label">Message</label>
                        <div className="control mb-2">
                            <textarea className="textarea has-fixed-size" placeholder="Please indicate colors, special handling, etc"></textarea>
                        </div>


                        <div className="control">
                            <strong>Do you require a receipt? </strong>
                            <label className="radio px-2">
                                <input type="radio" name="answer" />
                                Yes
                            </label>
                            <label className="radio px-2">
                                <input type="radio" name="answer" />
                                No
                            </label>
                        </div>

                    </div>
                </div>

                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <a className="button is-primary">
                            Submit
                    </a>
                    </p>
                    <p className="control">
                        <a className="button is-light">
                            Cancel
                        </a>
                    </p>
                </div>
            </div>
        )
    }
}

export default PostRequest