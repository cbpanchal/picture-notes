import React, { Component } from "react";
import ReactSelect from "react-select/lib/Creatable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import "../../style/PictureNotesStyle.css";

const components = {
  DropdownIndicator: null
};

class CreatableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      editValue: [...props.editTags] || []
    };
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleEditTagChange = this.handleEditTagChange.bind(this);
  }

  handleTagChange(value, actionMeta) {
    const { index } = this.props;
    this.setState({ value });
    const { handleSelectValues } = this.props;
    handleSelectValues(value, actionMeta, index);
  }

  handleEditTagChange(value, actionMeta) {
    const { handleSelectEditValues, indexData, id, categoryId } = this.props;
    const { editValue } = this.state;
    this.setState({
      ...editValue,
      editValue: value
    });
    handleSelectEditValues(value, actionMeta, indexData, id, categoryId);
  }

  render() {
    const { value, editValue } = this.state;
    const { isTagEdit, tags } = this.props;

    return !isTagEdit ? (
      <ReactSelect
        components={components}
        isClearable
        isMulti
        onChange={this.handleTagChange}
        placeholder="Tags"
        value={value}
        options={tags || []}
        className="react-select-container"
      />
    ) : (
      <ReactSelect
        components={components}
        isClearable
        isMulti
        onChange={this.handleEditTagChange}
        placeholder="Tags"
        value={editValue}
        options={tags || []}
        className="react-select-edit-container"
      />
    );
  }
}

CreatableSelect.propTypes = {
  handleSelectValues: PropTypes.func,
  handleSelectEditValues: PropTypes.func,
  tags: PropTypes.instanceOf(Array),
  index: PropTypes.number,
  indexData: PropTypes.string,
  id: PropTypes.string,
  categoryId: PropTypes.string,
  isTagEdit: PropTypes.bool,
  editTags: PropTypes.instanceOf(Array)
};

CreatableSelect.defaultProps = {
  handleSelectValues: () => {},
  handleSelectEditValues: () => {},
  tags: [],
  index: 0,
  indexData: "",
  id: "",
  categoryId: "",
  isTagEdit: false,
  editTags: []
};

const mapStateToProps = state => ({
  tags: state.tags.tagList
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatableSelect);
