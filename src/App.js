import "./App.css";
import react from "react";
import productsApi from "./api.js";
import Item from "./Item";
import UpdateModal from "./UpdateModal";

class App extends react.Component {
  state = {
    data: null,
    isLoading: false,
    error: "",
    updating: false,
    updateItem: "",
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const { data } = await productsApi.get("shoes");
      this.setState({ data, isLoading: false }, () => {
        console.log(this.state.data);
      });
    } catch (e) {
      this.setState({ error: e.messege });
    }
  }

  toggleUpdate = (id) => {
    this.setState({ updating: !this.state.updating, updateItem: id });
  };

  delete = async (id) => {
    try {
      await productsApi.delete(`/shoes/${id}`);
      const newData = this.state.data.filter((item) => {
        return item.id !== id;
      });
      this.setState({ data: newData }, () => {
        console.log(this.state.data);
      });
    } catch (e) {
      this.setState({ error: e.messege });
    }
  };

  getData = async () => {
    try {
      const { data } = await productsApi.get("/shoes");
      this.setState({ data });
    } catch (e) {
      this.setState({ error: e.messege });
    }
  };

  displayProducts = () => {
    return this.state.data.map((product) => {
      return (
        <div key={product.id}>
          <Item
            id={product.id}
            image={product.image}
            brand={product.brand}
            isUpdate={this.toggleUpdate}
            deleteFunc={this.delete}
          />
        </div>
      );
    });
  };
  render() {
    return (
      <div className="App">
        <div>
          {this.state.updating && (
            <UpdateModal
              updateItem={this.state.updateItem}
              refreshData={this.getData}
            />
          )}
        </div>
        {this.state.isLoading && <h2>Loading...</h2>}
        <button onClick={this.create}>create➕</button>
        {this.state.data && this.displayProducts()}
      </div>
    );
  }
}
export default App;
