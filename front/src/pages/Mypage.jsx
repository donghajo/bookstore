import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { userInfoApi } from "../apis/auth";

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

const Mypage = () => {
  const { data: userInfo, isLoading } = useQuery("userInfoApi", userInfoApi);

  console.log(userInfo?.data?.data);
  return (
    <Base>
      <Navigation>
        <div>
          <h1>User Info</h1>
          <div>nickName :{userInfo?.data?.data.user.nickname}</div>
          <div>point : {userInfo?.data?.data.user.point}</div>
        </div>
        <div>
          <h1>Address</h1>
          <div>address : {userInfo?.data?.data.address.default_address}</div>
          <div>
            detailAddress : {userInfo?.data?.data.address.detail_address}
          </div>
          <div>zipcode : {userInfo?.data?.data.address.zipcode}</div>
        </div>
        <div>
          <h1>Card</h1>
          <div>card : {userInfo?.data?.data.card.kind}</div>
          <div>code : {userInfo?.data?.data.card.code}</div>
        </div>
      </Navigation>
    </Base>
  );
};

export default Mypage;
