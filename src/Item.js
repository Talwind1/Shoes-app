import React from "react";

const Item = ({ id, image, brand, isUpdate, deleteFunc }) => {
  return (
    <div key={id} className="item">
      <h3>{brand}</h3>
      <img src={image} alt="" style={{ height: "200px", width: "200px" }} />
      <button
        onClick={() => {
          isUpdate(id);
        }}
      >
        update✏️
      </button>
      <button onClick={() => deleteFunc(id)}>delete🗑️</button>
    </div>
  );
};
export default Item;
