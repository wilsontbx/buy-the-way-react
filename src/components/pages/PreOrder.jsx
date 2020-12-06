import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography, InputLabel, Button, TextField, Dialog, Paper, Select, MenuItem } from '@material-ui/core'
import backendService from "../../services/backendAPI";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";



const useStyles = makeStyles(() => ({
    root: {
        background: 'linear-gradient(45deg, #3bd6c6 30%, #b3ecec 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '10px 30px',
        marginTop: '40px'


    },

    item: {
        direction: "column",
        color: "black",
        margin: "10px"


    },
    paper: {
        variant: "outlined",


    }
})
)
export default function PreOrder() {

    const [productname, setProductname] = useState('')
    const [imgURL, setImageURL] = useState('')
    const [country, setCountry] = useState('')
    const [category, setCategory] = useState('')
    const [foodexpiry, setFoodExpiry] = useState('Is there expiry?')
    const [foodchilled, setFoodChilled] = useState('Requires Chilling?')
    const [foodspecial, setFoodSpecial] = useState('Requires Special Handling?')
    const [collectspecial, setCollectSpecial] = useState('Is item Fragile?')
    const [returndate, setReturnDate] = useState('')
    const [open, setOpen] = useState(false)

    // handle image upload to cloudinary via endpoint

    const handleImageUpload = () => {
        const { files } = document.querySelector('input[type="file"]');

        const formData = new FormData();
        formData.append("file", files[0]);
        // replace this with your upload preset name
        formData.append("upload_preset", "ml_default");
        const options = {
            method: "POST",
            body: formData,
        };


        // replace cloudname with your Cloudinary cloud_name
        return fetch(
            "https://api.Cloudinary.com/v1_1/duc6i2tt0/image/upload",
            options
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res.url)
                setImageURL(res.url)


            })
            .catch((err) => console.log(err));
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        
        backendService.preorderCreate(productname, imgURL, country, category,  foodexpiry, foodchilled, foodspecial, collectspecial,returndate)
            .then(res => {
                if (res.status === 200) {
                    setOpen(false)
                    alert('Your pre-order has been submitted.')


                } else {
                    console.log('something wrong')
                    alert('Something went wrong')
                }
            })
    }
    const classes = useStyles()
    return (

        <React.Fragment>

            <Paper style={{ maxWidth: '500px', margin: "0 auto" }}>
                <Grid container spacing={2} className={classes.root}>
                    <Grid container item direction="column" m={9} lg={9} xl={9}>
                        <Typography>Pre-Order Item</Typography>
                    </Grid>
                </Grid>


                <Grid item direction="column" xs={6} className={classes.item}>
                    <TextField
                        required
                        label="Product Name"
                        id="productname"
                        value={productname}
                        name="productname"
                        fullWidth
                        className={classes.item}
                        onChange={function (e) {
                            setProductname(e.target.value)
                        }}
                    ></TextField>
                </Grid>

                <Grid item direction="column" xs={6} className={classes.item}>
                    <Button
                        variant="contained"
                        component="label"
                        size="small"
                        startIcon={<CloudUploadIcon />}
                        onChange={handleImageUpload}
                    >
                        Upload
                  <input accept="image/*" type="file" hidden />
                    </Button>
                </Grid>
                {imgURL !== '' ? (<Grid item direction="column" xs={6} className={classes.item} >
                    <Paper variant="outlined">
                        <img src={imgURL} />
                    </Paper>
                </Grid>) : ''}

                <Grid item direction="column" xs={6} className={classes.item}>
                    <InputLabel id="country" >Select Country</InputLabel>
                    <Select
                        id="country"
                        name="country"
                        value={country}
                        fullWidth
                        onChange={(e) => {
                            setCountry(e.target.value)
                        }}>
                        <MenuItem value={"Hong Kong"}>Hong Kong</MenuItem>
                        <MenuItem value={"Japan"}>Japan</MenuItem>
                        <MenuItem value={"Korea"}>Korea</MenuItem>
                    </Select>
                </Grid>
                <Grid item direction="column" xs={6} className={classes.item}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        name="category"
                        fullWidth
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                    >
                        <MenuItem value={"Select Category"}>Select Category</MenuItem>
                        <MenuItem value={"Food"}>Food</MenuItem>
                        <MenuItem value={"Collectible"}>Collectible item</MenuItem>
                    </Select>
                </Grid>
                {category && (category === 'Food' ? (
                    <React.Fragment>
                        <Grid item direction="column" xs={6} className={classes.item}>
                            <Select
                                label="Chilling needed? "
                                name="foodchilled"
                                value={foodchilled}
                                onChange={(e) => {
                                    setFoodChilled(e.target.value)
                                }}
                            >
                                <MenuItem value={"Requires Chilling?"}>Requires Chilling?</MenuItem>
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item direction="column" xs={6} className={classes.item}>
                            <Select
                                label="Does Food have Expiry?? "
                                name="foodchilled"
                                value={foodexpiry}
                                onChange={(e) => {
                                    setFoodExpiry(e.target.value)
                                }}
                            >
                                <MenuItem value={"Is there expiry?"}>Is there expiry?</MenuItem>
                                <MenuItem value={"No"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item direction="column" xs={6} className={classes.item}>
                            <Select
                                label="Special handling needed? "
                                name="foodspecial"
                                value={foodspecial}
                                onChange={(e) => {
                                    setFoodSpecial(e.target.value)
                                }}
                            >
                                <MenuItem value={"Requires Special Handling?"}>Requires Special Handling?</MenuItem>
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                        </Grid></React.Fragment>) : (<Grid item direction="column" xs={12} sm={6} md={3}>
                            <Select
                                label="Fragile? "
                                name="collectspecial"
                                value={collectspecial}
                                onChange={(e) => {
                                    setCollectSpecial(e.target.value)
                                }}
                            >
                                <MenuItem value={"Yes"}>Yes</MenuItem>
                                <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                        </Grid>
                    ))}


                <Grid item direction="column" xs={6} className={classes.item}>
                    <TextField
                        required
                        id="date"
                        label="Return Date"
                        type="date"
                        value=""
                        fullWidth
                        name="returndate"
                        onChange={function (e) {
                            setReturnDate(e.target.value)
                        }}
                    ></TextField>
                </Grid>
                {/* ================================== */}
                {/* Dialog popup confirmation          */}
                {/* ================================== */}
                <Dialog open={open} onClose={handleClose}>
                    <Grid item direction="column" >
                        <Typography
                            variant="h5"
                        > Please confirm your pre-order
                        </Typography>

                        <TextField
                            required
                            label="Product Name"
                            id="productname"
                            fullWidth
                            value={productname}
                            name="productname"
                            className={classes.item}
                            onChange={function (e) {
                                setProductname(e.target.value)
                            }}
                        ></TextField>
                        <Grid item direction="column" xs={6} className={classes.item} >
                            <Paper variant="outlined">
                                <img src={imgURL} />
                            </Paper>
                        </Grid>
                        <TextField
                            required
                            label="Country"
                            id="country"
                            value={country}
                            fullWidth
                            name="country"
                            className={classes.item}
                            onChange={function (e) {
                                setCountry(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            required
                            label="Category"
                            id="category"
                            value={category} fullWidth
                            name="category"
                            className={classes.item}
                            onChange={function (e) {
                                setCategory(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            disabled="true"
                            required
                            label="foodexpiry"
                            id="foodexpiry"
                            value={foodexpiry}
                            fullWidth
                            className={classes.item}
                            name="foodexpiry"
                            onChange={function (e) {
                                setFoodExpiry(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            className={classes.item}
                            required
                            label="foodchilled"
                            id="foodchilled"
                            name="foodchilled"
                            fullWidth
                            value={foodchilled}
                            onChange={function (e) {
                                setFoodChilled(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            className={classes.item}
                            required
                            label="foodspecial"
                            id="foodspecial"
                            name="foodspecial"
                            value={foodspecial}
                            onChange={function (e) {
                                setFoodSpecial(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            className={classes.item}
                            required
                            label="collectspecial"
                            id="collectspecial"
                            fullWidth
                            name="collectspecial"
                            value={collectspecial}
                            onChange={function (e) {
                                setCollectSpecial(e.target.value)
                            }}
                        ></TextField>
                        <TextField
                            className={classes.item}
                            required
                            label=" "
                            type="date"
                            id="returndate"
                            fullWidth
                            name="returndate"
                            value={returndate}
                            onChange={function (e) {
                                setReturnDate(e.target.value)
                            }}
                        ></TextField>

                    </Grid>
                    <Button
                        className={classes.root}
                        variant="outlined"
                        color="primary"
                        onClick={handleFormSubmission}>
                        Confirm
                    </Button>
                </Dialog>

                <Button
                    variant="outlined"
                    className={classes.root}
                    // disabled={
                    //     productname.length === 0 || country.length === 0 || category.length === 0 || foodexpiry.length === 0
                    // }
                    onClick={handleOpen}
                >Send
                </Button>

            </Paper>
        </React.Fragment >


    )
}