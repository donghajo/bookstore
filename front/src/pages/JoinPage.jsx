import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { signUpApi } from "../apis/auth";
import { useMutation } from "react-query";
import { actionTypes, useStateValue } from "../store";
import { useCookies } from "react-cookie";

const Base = styled.div`
  align-items: center;
  margin: 0 auto;
  padding-top: 60px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 250px);
`;

const Container = styled.div`
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center; // 수평  | 수직 : align-items
  padding-bottom: 20px;
`;
const TextLogo = styled.h1`
  font-size: 30px;
  font-weight: 700;
  > span[class="primary"] {
    color: #081d58;
  }
  > span:not(.primary) {
    color: #6db329;
  }
`;

const LoginWrapper = styled.div``;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
`;

const Input = styled.input`
  display: inline-block;
  height: 45px;
  padding: 0 14px 2px;
  color: #000;
  width: ${(props) => props.width};
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;
  margin-bottom: 15px;
`;

const Button = styled.button`
  color: ${(props) => (props.color === "register" ? "#5055b1" : "#fff")};
  background: ${(props) => (props.color === "register" ? "#fff" : "#767676")};
  border: 1px solid
    ${(props) => (props.color === "register" ? "#5055b1" : "#767676")};
  height: 45px;
  width: ${(props) => props.width};
  padding: 0 25px;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 15px;
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.color === "register" ? "#5055b15c" : "#4d4d4d"};
  }
`;

const AdressForm = styled.div`
  display: flex;
`;

const JoinPage = () => {
  let navigate = useNavigate();

  const [, setToken] = useCookies(["accessToken"]);
  const [, setRefresh] = useCookies(["refreshToken"]);
  const [{}, dispatch] = useStateValue();

  const [address, setAddress] = useState(""); // 주소
  const [zipCode, setZipCode] = useState("");
  const [popup, setPopup] = useState(false);
  const [signUpdata, setSignUpdata] = useState({
    id: "",
    pwd: "",
    nickname: "",
    zipcode: zipCode,
    defaultAddress: address,
    detailAddress: "",
  });

  const onChange = (e) => {
    setSignUpdata({
      ...signUpdata,
      [e.target.name]: e.target.value,
      zipcode: zipCode,
      defaultAddress: address,
    });
  };

  const mutation = useMutation((signUpdata) => signUpApi(signUpdata));

  const signUp = () => {
    console.log("start", signUpdata);
    mutation.mutate(signUpdata, {
      onSuccess: (res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_TOKEN,
          value: res?.data.data.accessToken,
        });
        if (res?.statusText === "OK") {
          setToken("accessToken", res?.data.data.accessToken);
          setRefresh("refreshToken", res?.data.data.refreshToken);
          navigate("/");
        }
      },
    });
  };

  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log("data", data);
    console.log("fullAddress", fullAddress);
    console.log(data.zonecode);

    setAddress(fullAddress);
    setZipCode(data.zonecode);
    setPopup(!popup);
    console.log(fullAddress);
  };

  const handleComplete = () => {
    setPopup(!popup);
    setAddress("");
  };

  return (
    <Base>
      <Container>
        <TextLogo>
          <span className="primary">BOOK</span>
          <span>STORE</span>
        </TextLogo>
        <LoginWrapper>
          <Form>
            <Input
              type="text"
              Pos="top"
              name="id"
              placeholder="아이디를 입력해 주세요."
              onChange={onChange}
            />
            <Input
              type="password"
              Pos="bottom"
              name="pwd"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChange}
            />
            <Input
              type="text"
              Pos="bottom"
              name="nickname"
              placeholder="닉네임을 입력해 주세요."
              onChange={onChange}
            />
            <AdressForm>
              <Input
                Pos="bottom"
                placeholder="주소"
                name="address"
                type="text"
                width="80%"
                value={address}
                onChange={onChange}
              />
              <Button
                color=""
                onClick={handleComplete}
                width="20%"
                style={{ padding: 0, fontSize: "14px" }}
              >
                주소 찾기
              </Button>
            </AdressForm>
            {popup && (
              <div>
                <DaumPostcode
                  style={{
                    display: "block",
                    position: "relative",
                    top: "0%",
                    width: "400px",
                    height: "400px",
                    padding: "7px",
                  }}
                  autoClose
                  onComplete={complete}
                />
              </div>
            )}
            <Input
              type="text"
              Pos="bottom"
              name="detailAddress"
              placeholder="상세주소를 입력해주세요."
              onChange={onChange}
            />

            {/* 회원가입 */}

            <Button color="register" width="100%" onClick={signUp}>
              회원가입
            </Button>
          </Form>
        </LoginWrapper>
      </Container>
    </Base>
  );
};

export default JoinPage;
