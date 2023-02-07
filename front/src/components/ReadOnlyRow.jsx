import React from "react";
import { useMutation } from "react-query";
import { adminDeleteBookApi } from "../apis/bookApi";

const ReadOnlyRow = ({ item, handleEditClick }) => {
  const mutation = useMutation((deleteId) => adminDeleteBookApi(deleteId));

  const onDelete = (id) => {
    mutation.mutate(id, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };
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
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, item)}>
          edit
        </button>
        <button onClick={() => onDelete(item.pid)}>delete</button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
