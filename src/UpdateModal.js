import React, { Component } from "react";
import productsApi from "./api";

export default class updateModal extends Component {
  state = {
    brand: "",
    url: "",
  };

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submit = async () => {
    let id = this.props.updateItem;
    let newItem = { id: id, brand: this.state.brand, image: this.state.url };
    await productsApi.put(`/shoes/${id}`, newItem);
    this.props.refreshData();
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onInputChange}
          name="brand"
          placeholder="brand"
          value={this.state.brand}
        />
        <input
          type="text"
          onChange={this.onInputChange}
          name="url"
          placeholder="url"
          value={this.state.url}
        />
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}
