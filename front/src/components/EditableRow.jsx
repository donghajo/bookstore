import React from "react";

const EditableRow = ({
  editFormData,
  handleEditClick,
  handleEditFormChange,
  handleEditFormSubmit,
}) => {
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{editFormData.pid}</td>
      <td>
        <input
          type="text"
          required="required"
          value={editFormData.title}
          name="title"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          value={editFormData.author}
          name="author"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <img
          src={editFormData.ImageURL}
          style={{ width: "90px" }}
          alt="ImageURL"
        ></img>
      </td>
      <td>
        <input
          type="text"
          required="required"
          value={editFormData.quantity}
          name="quantity"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          value={editFormData.price}
          name="price"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          value={editFormData.accum}
          name="accum"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button
          onClick={(event) => handleEditFormSubmit(event, editFormData.pid)}
        >
          save
        </button>
        <button onClick={(event) => handleEditClick(event, null)}>
          cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
