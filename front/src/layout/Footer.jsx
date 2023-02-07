import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Base = styled.footer`
  width: 100%;
  margin: 0 auto;
  height: 150px;
  background-color: #fff;
  border-top: 1px solid #ebebeb;
`;

const Navigation = styled.section`
  margin: 0 auto;
  max-width: 1200px;
`;

const LogoBox = styled.div`
  display: flex;
  height: 60px;
`;

const TextLogo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  > span[class="primary"] {
    color: #081d58;
  }
  > span:not(.primary) {
    color: #6db329;
  }
`;

const Menu = styled.div``;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  &:first-child {
    color: red;
  }
`;
const ListItem = styled.li`
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.01em;
  font-weight: 500;
  color: #595959;
  &::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 4px 12px 0;
    background-color: #d5d5d5;
    vertical-align: top;
  }
  &:first-child::before {
    display: none;
  }
`;

const Footer = () => {
  return (
    <Base>
      <Navigation>
        <LogoBox>
          <a to="/">
            <TextLogo>
              <span className="primary">BOOK</span>
              <span>STORE</span>
            </TextLogo>
          </a>
        </LogoBox>
        <Menu>
          <ListWrapper>
            <ListItem>
              <a to="/">회사소개</a>
            </ListItem>
            <ListItem>
              <a to="/">이용약관</a>
            </ListItem>
            <ListItem>
              <a to="/">개인정보처리방침</a>
            </ListItem>
            <ListItem>
              <a to="/">청소년보호정책</a>
            </ListItem>
            <ListItem>
              <a to="/">대량주문안내</a>
            </ListItem>
            <ListItem>
              <a to="/">협력사여러분</a>
            </ListItem>
            <ListItem>
              <a to="/">채용정보</a>
            </ListItem>
            <ListItem>
              <a to="/">광고소개</a>
            </ListItem>
          </ListWrapper>
        </Menu>
      </Navigation>
    </Base>
  );
};

export default Footer;
