import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logInApi } from "../apis/auth";
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
  max-width: 400px;
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
  max-width: 500px;
  margin: 20px auto;
`;

const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 45px;
  padding: 0 14px 2px;
  color: #000;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;
  border-top-left-radius: ${(props) => (props.Pos === "bottom" ? 0 : "none")};
  border-top-right-radius: ${(props) => (props.Pos === "bottom" ? 0 : "none")};
  border-bottom-left-radius: ${(props) => (props.Pos === "top" ? 0 : "none")};
  border-bottom-right-radius: ${(props) => (props.Pos === "top" ? 0 : "none")};
`;

const SaveId = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;
const SocialLoginWrapper = styled.div`
  text-align: center;
  margin-top: 15px;
`;

const Button = styled.button`
  color: ${(props) => (props.color === "register" ? "#5055b1" : "#fff")};
  background: ${(props) => (props.color === "register" ? "#fff" : "#767676")};
  border: 1px solid
    ${(props) => (props.color === "register" ? "#5055b1" : "#767676")};
  height: 45px;
  width: 100%;
  padding: 0 25px;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.color === "register" ? "#5055b15c" : "#4d4d4d"};
  }
`;

const LoginPage = () => {
  let navigate = useNavigate();

  const [, setToken] = useCookies(["accessToken"]);
  const [, setRefresh] = useCookies(["refreshToken"]);
  const [{}, dispatch] = useStateValue();
  const [loginUpdata, setLoginUpdate] = useState({
    id: "",
    pwd: "",
  });

  const onChange = (e) => {
    setLoginUpdate({
      ...loginUpdata,
      [e.target.name]: e.target.value,
    });
  };

  const mutation = useMutation((signUpdata) => logInApi(signUpdata));

  const logIn = () => {
    console.log("Login start");
    mutation.mutate(loginUpdata, {
      onSuccess: (data) => {
        console.log(data);
        dispatch({
          type: actionTypes.SET_TOKEN,
          value: data?.data.data.accessToken,
        });
        // dispatch({
        //   type: actionTypes.SET_USER,
        //   value: data?.data.data.user,
        // });
        if (data?.statusText === "OK") {
          setToken("accessToken", data?.data.data.accessToken);
          setRefresh("refreshToken", data?.data.data.refreshToken);
          navigate("/");
        }
      },
      // onError: (data) => {
      //   toast({ title: data?.message, })
      // }
    });
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
              type="text"
              Pos="bottom"
              name="pwd"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChange}
            />
          </Form>
          {/* 아이디, 비밀번호 유효성 메세지 */}
          <Button color="" onClick={logIn}>
            로그인
          </Button>
          {/* 아이디 저장, 아이디/비밀번호 찾기 */}
          <SaveId>
            <span>
              <input id="formSaveId" type="checkbox" />
              <label htmlFor="formSaveId">아이디 저장</label>
            </span>
            <Link to="/findId">아이디/비밀번호 찾기</Link>
          </SaveId>

          {/* 소셜 로그인 */}
          <SocialLoginWrapper>
            <img
              src="/images/kakao.png"
              alt=""
              style={{
                width: "42px",
                cursor: "pointer",
                margin: "10px auto 10px",
              }}
            />
            <p>
              개인정보 보호를 위해 공용 PC에서 사용 시 SNS계정의 로그아웃 상태를
              꼭 확인해 주세요.
            </p>
          </SocialLoginWrapper>

          {/* 회원가입 */}
          <Link to="/join">
            <Button color="register">회원가입</Button>
          </Link>
        </LoginWrapper>
      </Container>
    </Base>
  );
};

export default LoginPage;
