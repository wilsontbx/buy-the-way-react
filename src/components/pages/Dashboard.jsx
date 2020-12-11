import React from 'react'
import backendService from '../../services/backendAPI'
import { withCookies } from "react-cookie"
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Typepography from '@material-ui/core/Typography'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    root: {
        // backgroundImage:'url(http://res.cloudinary.com/duc6i2tt0/image/upload/v1607643700/signature_dxqwab.png)',
        background: 'linear-gradient(45deg, #3bd6c6 30%, #b3ecec 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '10px 30px',
        marginTop: '40px',

    },
    button: {
        background: 'linear-gradient(45deg, #3bd6c6 30%, #b3ecec 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '10px 30px',
        justifyContent: "center"

    }
});

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function Dashboard(props) {

    // const [token,setToken] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUsername] = useState('')
    const [open, setOpen] = useState(false)
    const [init, setInit] = useState(true)

    const classes = useStyles();

    const token = props.cookies.get("token")


    // const handleClose = () => {
    //     setOpen(false);
    // };


    const handleUpdate = () => {

        backendService
            .updateUserInfo(token, email, firstName, lastName, userName)
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    setOpen(false)
                    alert('Your pre-order has been submitted.')
                } else {
                    console.log('something wrong')
                    alert('Something went wrong')
                }
            })
    }

    const initState = () => {
        backendService
            .getUserInfo(token)
            .then(response => {

                setEmail(response.data.email)
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setUsername(response.data.username)
                setInit(false)

            })

    }


    return (
        <div>
            {init ? initState() : ''}
            <Grid className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typepography variant="h5">Email</Typepography></TableCell>
                                <TableCell align="right"><Typography variant="h6">{email}</Typography></TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell><Typepography variant="h5">First Name</Typepography></TableCell>
                                <TableCell align="right"><Typography variant="h6">{firstName}</Typography></TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell><Typepography variant="h5">Last Name</Typepography></TableCell>
                                <TableCell align="right"><Typography variant="h6">{lastName}</Typography></TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell><Typepography variant="h5">Username</Typepography></TableCell>
                                <TableCell align="right"><Typography variant="h6">{userName}</Typography></TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"><Button

                                    className={classes.button}
                                    onClick={() => { setOpen(true) }}

                                >Update</Button></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell> </TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <div>

                    <Dialog open={open} onClose={() => { setOpen(false) }} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update your particulars</DialogTitle>
                        <DialogContent>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                onChange={function (e) { setEmail(e.target.value) }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="First Name"
                                type="text"
                                fullWidth
                                onChange={((e) => { setFirstName(e.target.value) })}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Last Name"
                                type="text"
                                fullWidth
                                onChange={((e) => { setLastName(e.target.value) })}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="UserName"
                                type="text"
                                fullWidth
                                onChange={((e) => { setUsername(e.target.value) })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setOpen(false) }} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={handleUpdate} color="primary">
                                Update
                        </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </Grid>
        </div>
    )



}

export default withCookies(Dashboard)