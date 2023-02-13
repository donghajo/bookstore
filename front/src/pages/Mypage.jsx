import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "react-query";
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
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  border: solid 1px lightgray;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;

const Mypage = () => {
  const [{ accessToken }] = useCookies(["accessToken"]);
  const [userInfos, setUserInfos] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [userCard, setUserCard] = useState({});

  const getMypageMutation = useMutation((token) => userInfoApi(token));

  useEffect(() => {
    getMypageMutation.mutate(accessToken, {
      onSuccess: (userInfo) => {
        setUserInfos(userInfo?.data?.data?.user);
        setUserAddress(userInfo?.data?.data?.address);
        setUserCard(userInfo?.data?.data?.card);
      },
    });
  }, []);

  return (
    <Base>
      <Navigation>
        <Wrapper>
          <h1>User Info</h1>
          <div>nickName : {userInfos && userInfos.nickname}</div>
          <div>point : {userInfos && userInfos.point}</div>
        </Wrapper>
        <Wrapper>
          <h1>Address</h1>

          <div>
            <div>address : {userAddress.default_address}</div>
            <div>detailAddress : {userAddress.detail_address}</div>
            <div>zipcode : {userAddress.zipcode}</div>
          </div>
        </Wrapper>
        <Wrapper>
          <h1>Card</h1>

          <div>
            <div>card : {userCard.kind}</div>
            <div>code : {userCard.code}</div>
          </div>
        </Wrapper>
      </Navigation>
    </Base>
  );
};

export default Mypage;
