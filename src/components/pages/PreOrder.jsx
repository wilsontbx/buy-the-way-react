import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Textfield from '@material-ui/core/TextField'
import bulma from 'bulma'
import { Dialog } from '@material-ui/core'



export default function PreOrder() {

    const [productname, setProductname] = useState('')
    const [imgURL, setImageURL] = useState('')
    const [country, setCountry] = useState('')
    const [category, setCategory] = useState('')
    const [foodexpiry, setFoodExpiry] = useState('')
    const [foodchilled, setFoodChilled] = useState('')
    const [foodspecial, setFoodSpecial] = useState('')
    const [collectspecial, setCollectSpecial] = useState('')
    const [returndate, setReturnDate] = useState('')

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmission = () => {
        console.log('hello')
    }
    return (

        <div className="container">
            <form>
                <Grid container direction="row">
                    <Grid container item lg={6}>

                        <Grid
                            container
                            direction="column"
                            spacing={3}

                        >

                            <Grid item direction="column">
                                <Typography variant="h5" >
                                    <Textfield
                                        required
                                        label="Product Name"
                                        id="productname"
                                        value={productname}
                                        name="productname"
                                        onChange={function (e) {

                                            setProductname(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="Image URL"
                                        id="imgURL"
                                        value={imgURL}
                                        name="imgURL"
                                        onChange={function (e) {

                                            setImageURL(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="Country"
                                        id="country"
                                        value={country}
                                        name="country"
                                        onChange={function (e) {

                                            setCountry(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="Category"
                                        id="category"
                                        value={category}
                                        name="category"
                                        onChange={function (e) {

                                            setCategory(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="foodexpiry"
                                        id="foodexpiry"
                                        value={foodexpiry}
                                        name="foodexpiry"
                                        onChange={function (e) {

                                            setFoodExpiry(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="foodchilled"
                                        id="foodchilled"
                                        name="foodchilled"
                                        value={foodchilled}
                                        onChange={function (e) {

                                            setFoodChilled(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="foodspecial"
                                        id="foodspecial"
                                        name="foodspecial"
                                        value={foodspecial}
                                        onChange={function (e) {

                                            setFoodSpecial(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label="collectspecial"
                                        id="collectspecial"
                                        name="collectspecial"
                                        value={collectspecial}
                                        onChange={function (e) {

                                            setCollectSpecial(e.target.value)
                                        }}
                                    ></Textfield>
                                    <Textfield
                                        required
                                        label=" "
                                        type="date"
                                        id="returndate"
                                        name="returndate"
                                        value={returndate}
                                        onChange={function (e) {

                                            setReturnDate(e.target.value)
                                        }}
                                    ></Textfield>
                                </Typography>

                            </Grid>


                        </Grid>
                    </Grid>
                    <Dialog open={open} onClose={handleClose}>
                    

                        <Grid item direction="column">
                            <Typography variant="h5" >
                                <Textfield
                                    required
                                    label="Product Name"
                                    id="productname"
                                    value={productname}
                                    name="productname"
                                    onChange={function (e) {

                                        setProductname(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="Image URL"
                                    id="imgURL"
                                    value={imgURL}
                                    name="imgURL"
                                    onChange={function (e) {

                                        setImageURL(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="Country"
                                    id="country"
                                    value={country}
                                    name="country"
                                    onChange={function (e) {

                                        setCountry(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="Category"
                                    id="category"
                                    value={category}
                                    name="category"
                                    onChange={function (e) {

                                        setCategory(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="foodexpiry"
                                    id="foodexpiry"
                                    value={foodexpiry}
                                    name="foodexpiry"
                                    onChange={function (e) {

                                        setFoodExpiry(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="foodchilled"
                                    id="foodchilled"
                                    name="foodchilled"
                                    value={foodchilled}
                                    onChange={function (e) {

                                        setFoodChilled(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="foodspecial"
                                    id="foodspecial"
                                    name="foodspecial"
                                    value={foodspecial}
                                    onChange={function (e) {

                                        setFoodSpecial(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label="collectspecial"
                                    id="collectspecial"
                                    name="collectspecial"
                                    value={collectspecial}
                                    onChange={function (e) {

                                        setCollectSpecial(e.target.value)
                                    }}
                                ></Textfield>
                                <Textfield
                                    required
                                    label=" "
                                    type="date"
                                    id="returndate"
                                    name="returndate"
                                    value={returndate}
                                    onChange={function (e) {

                                        setReturnDate(e.target.value)
                                    }}
                                ></Textfield>
                            </Typography>

                        </Grid>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleSubmission}>
                            Confirm

                                    </Button>
                    </Dialog>

                    <Grid container item lg={6}>Column 2
                </Grid>
                </Grid>
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={
                        productname.length == 0 || country.length == 0 || category.length == 0 || foodexpiry.length == 0
                    }
                    onClick={handleOpen}
                >Send
                </Button>
            </form>

        </div>


    )
}