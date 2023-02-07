import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  adminDeleteBookApi,
  adminGetBookApi,
  adminUpdateBookApi,
} from "../../apis/bookApi";
import { useMutation, useQuery } from "react-query";
import useAdminBook from "./useAdminBook";
import ReadOnlyRow from "../../components/ReadOnlyRow";
import EditableRow from "../../components/EditableRow";

const Base = styled.header`
  align-items: center;
  margin: 0 auto;
  padding-top: 80px;
  width: 100%;
`;
const Navigation = styled.nav`
  margin: 0 auto;
  max-width: 1200px;
`;

const AdminPage = () => {
  const { data: bookItem, isLoading } = useAdminBook();
  const [thead, setThead] = useState([]);
  const [editRowId, setEditRowId] = useState(null);

  // EditableRow에서 전달된 edit value state저장
  const [editFormData, setEditFormData] = useState({
    pid: "",
    title: "",
    author: "",
    ImageURL: "",
    quantity: "",
    price: "",
    accum: "",
  });

  // EditableRow에서 input값 변화 target
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // EditableRow에서 onChange
  const handleEditClick = (event, item) => {
    event.preventDefault();
    if (item === null) {
      return setEditRowId(null);
    }
    setEditRowId(item.pid);

    const formValues = {
      pid: item.pid,
      title: item.title,
      author: item.author,
      ImageURL: item.ImageURL,
      quantity: item.quantity,
      price: item.price,
      accum: item.accum,
    };

    setEditFormData(formValues);
  };

  const updateBoookMutation = useMutation((updateId) =>
    adminUpdateBookApi(updateId)
  );

  // Update edit form
  const handleEditFormSubmit = (event, pid) => {
    event.preventDefault();
    updateBoookMutation.mutate(
      { editFormData, pid },
      {
        onSuccess: (data) => {
          console.log(data);
        },
      }
    );
    setEditRowId(null);
  };

  //goddino.tistory.com/154
  useEffect(() => {
    if (bookItem && bookItem[0] !== "undefined") {
      setThead(Object.keys(bookItem[0]));
    }
  }, [bookItem]);

  return (
    <Base>
      <table
        className="table table-bordered"
        style={{ width: "1200px", margin: "auto" }}
      >
        <thead>
          <tr>
            {thead.map((heading) => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookItem &&
            bookItem.map((item) => (
              <>
                {editRowId === item.pid ? (
                  <EditableRow
                    key={item.pid}
                    editFormData={editFormData}
                    handleEditClick={handleEditClick}
                    handleEditFormChange={handleEditFormChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadOnlyRow
                    key={item.pid}
                    item={item}
                    handleEditClick={handleEditClick}
                  />
                )}
              </>
            ))}
        </tbody>
      </table>
    </Base>
  );
};

export default AdminPage;
