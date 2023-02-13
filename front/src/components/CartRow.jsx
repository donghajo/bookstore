import React from "react";
import { useMutation } from "react-query";
import { adminDeleteBookApi } from "../apis/bookApi";

const CartRow = ({ item, handleEditClick }) => {
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{item.pid}</td>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>
        <img src={item.ImageURL} style={{ width: "90px" }}></img>
      </td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>{item.accum}</td>
    </tr>
  );
};

export default CartRow;
