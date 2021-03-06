import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";

class TransactionRequest extends React.Component {
  render() {
    const { url, qty, price, message, receipt } = this.props.item;
    return (
      <div>
        <FormControl fullWidth className="field">
          <TextField
            id="standard-basic"
            type="text"
            label="Product reference link (optional)"
            value={url}
            name="url"
            placeholder="Enter the URL for reference"
            onChange={(e) => {
              this.props.setCurrentState(e);
            }}
          />
        </FormControl>

        <FormControl fullWidth className="field">
          <TextField
            id="standard-basic"
            type="number"
            label="Quantity"
            value={qty}
            name="qty"
            onChange={(e) => {
              e.target.value < 0
                ? (e.target.value = "")
                : this.props.setCurrentState(e);
            }}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" className="field">
          <InputLabel htmlFor="outlined-adornment-amount">
            Transaction Price
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            name="price"
            value={price}
            onChange={(e) => {
              e.target.value < 0
                ? (e.target.value = "")
                : this.props.setCurrentState(e);
            }}
            startAdornment={
              <InputAdornment position="start">S$</InputAdornment>
            }
            labelWidth={127}
          />
        </FormControl>

        <TextField
          className="field"
          fullWidth
          id="outlined-multiline-static"
          label="Message"
          value={message}
          name="message"
          multiline
          placeholder="Please indicate colors, special handling, etc"
          rows={4}
          onChange={(e) => {
            this.props.setCurrentState(e);
          }}
          variant="outlined"
        />

        <FormControl component="fieldset">
          <FormLabel component="legend">Do you require a receipt?</FormLabel>
          <RadioGroup
            name="receipt"
            value={receipt}
            onChange={(e) => {
              this.props.setCurrentState(e);
            }}
            row
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default TransactionRequest;
