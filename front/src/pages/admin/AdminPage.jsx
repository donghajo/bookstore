import React, { useCallback, useEffect, useRef, useState } from "react";
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
import Pagination from "../../components/Pagination";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { display } from "@mui/system";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

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
  const [open, setOpen] = useState(false);

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

  const [addFormData, setAddFormData] = useState({
    title: "",
    author: "",
    ImageURL: "",
    quantity: "",
    price: "",
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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

  const handleClickOpen = () => {
    if (open === false) {
      setOpen((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
      setAddFormData({
        title: "",
        author: "",
        ImageURL: "",
        quantity: "",
        price: "",
      });
    }
  };

  const imageInput = useRef(); // 이미지 파일 받을때

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData(); // FormData를 사용해야 멀티파트 형식으로 서버로보내서 multer가 처리가능!!
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
  }, []);

  //goddino.tistory.com/154
  useEffect(() => {
    if (bookItem && bookItem[0] !== "undefined") {
      setThead(Object.keys(bookItem[0]));
    }
  }, [bookItem]);

  console.log(bookItem);
  return (
    <Base>
      <h2
        style={{
          width: "1200px",
          margin: "auto",
          textAlign: "center",
          paddingBottom: "30px",
        }}
      >
        Admin table
      </h2>
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
            bookItem
              .slice(offset, offset + limit)
              .map((item) => (
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
      <div
        style={{
          width: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {isLoading ? (
          <></>
        ) : (
          <Pagination
            total={bookItem?.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
        <Button onClick={handleClickOpen}>ADD</Button>
      </div>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>도서 추가</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            name="image"
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        </DialogContent>
        <Button onClick={handleClickOpen}>Close</Button>
      </Dialog>
    </Base>
  );
};

export default AdminPage;
