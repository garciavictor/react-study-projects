import React, { useState } from "react";
import { Input, Icon } from "react-materialize";
import "./App.css";

function Form(props) {
  const [inputValue, setInputValue] = useState("");

  const onKeyPressHandler = event => {
    if(event.key === "Enter")
      props.searchStreamer(inputValue)
  };

  return (
    <div className="form-group">
      <div className="form-input">
        <Input
          s={6}
          onChange={event => setInputValue(event.target.value)}
          value={inputValue}
          label="Search for a Broadcaster"
          onKeyPress={event => {
            onKeyPressHandler(event);
          }}
        >
          <Icon>search</Icon>
        </Input>
      </div>
    </div>
  );
}

export default Form;
