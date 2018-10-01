import React, { Component } from "react";
import ReactSelect from "react-select/lib/Creatable";
import "../../style/PictureNotesStyle.css";
import PropTypes from "prop-types";

const components = {
  DropdownIndicator: null
};

class CreatableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      options: [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }
      ]
    };
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleTagChange(value, actionMeta) {
    console.group("Value Changed");
    console.log(value, actionMeta);
    console.groupEnd();
    const { index } = this.props;
    console.log({ index });
    this.setState({ value });
    this.props.handleSelectValues(value);
  }

  render() {
    const { options, value } = this.state;
    console.log({ value });
    return (
      <ReactSelect
        components={components}
        isClearable
        isMulti
        onChange={this.handleTagChange}
        placeholder="Type tag and press enter..."
        value={value}
        options={options}
        className="react-select-container"
      />
    );
  }
}

CreatableSelect.propTypes = {
  handleSelectValues: PropTypes.func
};

CreatableSelect.defaultProps = {
  handleSelectValues: () => {}
};

export default CreatableSelect;
