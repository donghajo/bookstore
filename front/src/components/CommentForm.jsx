import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

const TextArea = styled(Input.TextArea)`
  width: 100%;
  overflow: auto;
`;

const CommentWrapper = styled(Form)`
  display: flex;
`;

const CommentForm = () => {
  const [comment, setComment] = useState();

  const changeCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = () => {
    console.log(comment);
  };

  return (
    <CommentWrapper
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <TextArea
        value={comment}
        onChange={changeCommentHandler}
        maxLength={140}
        autoSize={{ minRows: 2, maxRows: 4 }}
        placeholder="배송 문의나 욕설 및 인신공격성 글은 상품 페이지에서 노출 제외"
      />
      <Button type="primary" style={{ height: "54px" }} htmlType="submit">
        등록
      </Button>
    </CommentWrapper>
  );
};

export default CommentForm;
