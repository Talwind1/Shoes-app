import "./App.css";
import react from "react";
import productsApi from "./api.js";
class App extends react.Component {
  state = { data: null, isLoading: false, error: "" };

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

  displayProduct = () => {
    return this.state.data.map((product, key) => {
      return (
        <div key={product.id} className="item">
          <h3>{product.brand}</h3>
          <h2>{product.price} $ </h2>
          <img src={product.image} alt="" />

          <button>update✏️</button>
          <button>delete🗑️</button>
          <button>create🗑️</button>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.isLoading && <h2>Loading...</h2>}

        {this.state.data && this.displayProduct()}
      </div>
    );
  }
}
export default App;
