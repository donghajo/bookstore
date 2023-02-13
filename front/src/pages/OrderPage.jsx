import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import styled from "styled-components";
import { getOrderApi } from "../apis/bookApi";
import CartRow from "../components/CartRow";

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
const OrderPage = () => {
  const [cartInfo, setCartInfo] = useState([]);
  const [{ accessToken }] = useCookies(["accessToken"]);
  const getMyCartMutation = useMutation((token) => getOrderApi(token));

  useEffect(() => {
    getMyCartMutation.mutate(accessToken, {
      onSuccess: (cart) => {
        console.log(cart?.data?.data);
        setCartInfo(cart?.data?.data);
      },
    });
  }, []);

  return (
    <div>
      <Base>
        <Navigation>
          <Wrapper>
            <div>배송지 정보 :</div>
          </Wrapper>
          <Wrapper>
            <h1>주문상품</h1>
            <div>총 {cartInfo.length}개</div>
            <table>
              <tbody>
                {cartInfo &&
                  cartInfo.map((item) => (
                    <CartRow key={item.pid} item={item} />
                  ))}
              </tbody>
            </table>
          </Wrapper>
          <Wrapper>
            <div>결제 수단 :</div>
          </Wrapper>
        </Navigation>
      </Base>
    </div>
  );
};

export default OrderPage;
