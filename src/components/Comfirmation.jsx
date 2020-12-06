import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

class Confirmation extends React.Component {
  render() {
    const {
      productname,
      imageUrl,
      imageAlt,
      country,
      qty,
      price,
      message,
    } = this.props.item;
    return (
      <div>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={5}>
            <figure>
              <img src={imageUrl} alt={imageAlt} className="displayed-image" />
            </figure>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h5" gutterBottom>
              <Box fontWeight="fontWeightBold">{productname}</Box>
              <Box fontWeight="fontWeightLight" m={2}>
                Purchase from:
              </Box>
              <Box fontWeight="fontWeightBold" m={2}>
                {country}
              </Box>
              <Box fontWeight="fontWeightLight" m={2}>
                Quantity:
              </Box>

              <Box fontWeight="fontWeightBold" m={2}>
                {qty}
              </Box>
              <Box fontWeight="fontWeightLight" m={2}>
                {message === "" ? "-" : message}
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" gutterBottom>
                    <Box fontWeight="fontWeightBold">Total Price</Box>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h5" gutterBottom>
                    <Box fontWeight="fontWeightBold">S${price}</Box>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Confirmation;
