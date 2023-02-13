import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { actionTypes, useStateValue } from "../store";
import { useCookies } from "react-cookie";

// import { AiOutlineSearch } from "react-icons/ai";

// import useMovieSearch from "../features/movie/useMovieSearch";

const Base = styled.header`
  width: 100%;
  margin: 0 auto;
  height: 62px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  text-align: center;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 0px 0px;
  transition: background-color 200ms ease 0s;
  z-index: 10;
`;

const Navigation = styled.nav`
  margin: 0 auto;
  max-width: 1200px;
`;

const MenuListWrapper = styled.div``;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  height: 62px;
  flex-shrink: 0;
  &:not(:first-child) {
    margin: 0 0 0 24px;
  }
`;

const SearchMenu = styled.li`
  width: 300px;
  display: flex;
  align-items: center;
  height: 62px;
  flex-shrink: 1;
  margin: 0 0 0 auto;
  transition: all 0.5s ease 0s;
  position: relative;
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

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchFormWrapper = styled.div``;

const SearchForm = styled.form``;

const SearchLabel = styled.label`
  background: rgb(245, 245, 247);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  border-radius: 2px;
  padding: 7px 8px;
`;

const SearchInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  background: transparent;
  width: 100%;
  padding: 0 0 0 8px;
  border: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  caret-color: rgb(53, 53, 53);
  line-height: 23px;
`;

const SignIn = styled.button`
  background: transparent;
  color: rgb(116, 116, 123);
  font-size: 14px;
  padding: 0;
  border: 0;
  cursor: pointer;
  margin: 15px 0;
`;

const SignUp = styled.button`
  border-radius: 6px;
  font-weight: 500;
  box-sizing: border-box;
  min-width: 72px;
  height: 32px;
  background: transparent;
  color: rgb(53, 53, 53);
  font-size: 14px;
  border: 1px solid rgba(116, 116, 123, 0.5);
  cursor: pointer;
  margin: 15px 0;
`;

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [, , removeCookie] = useCookies(["accessToken"]);
  const [{ token, user, role }, dispatch] = useStateValue();

  const logOut = () => {
    removeCookie("accessToken");
    localStorage.removeItem("userInfo");
    dispatch({ type: actionTypes.SET_TOKEN, value: null });
    document.location.href = "/";
  };

  const handleKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <Base>
      <Navigation>
        <MenuListWrapper>
          <MenuList>
            <Menu>
              <Link to="/">
                <TextLogo>
                  <span className="primary">BOOK</span>
                  <span>STORE</span>
                </TextLogo>
              </Link>
            </Menu>
            <SearchMenu>
              <SearchContainer>
                <SearchFormWrapper>
                  <SearchForm>
                    <SearchLabel>
                      {/* <AiOutlineSearch /> */}
                      <SearchInput
                        placeholder="나 혼자 레벨업 출간"
                        onChange={handleKeyword}
                      />
                    </SearchLabel>
                  </SearchForm>
                </SearchFormWrapper>
              </SearchContainer>
              {/* <SearchResultWrapper>
                <SearchResultList>
                  {
                    searchResult?.results.map((searchResultItem) => (
                      <Link href={`/movie/${searchResultItem.id}`} key={searchResultItem.id}>
                        <SearchResultListItem>{searchResultItem.title}</SearchResultListItem>
                      </Link>
                    ))
                  }
                </SearchResultList>
              </SearchResultWrapper> */}
            </SearchMenu>
            {token ? (
              <>
                {role === "ADMIN" && (
                  <Menu>
                    <Link to="/admin">
                      <SignIn>관리자 페이지</SignIn>
                    </Link>
                  </Menu>
                )}
                <Menu>
                  <Link to="/mypage">
                    <SignIn>마이페이지</SignIn>
                  </Link>
                </Menu>
                <Menu>
                  <div onClick={logOut}>
                    <SignUp>로그아웃</SignUp>
                  </div>
                </Menu>
              </>
            ) : (
              <>
                <Menu>
                  <Link to="/login">
                    <SignIn>로그인</SignIn>
                  </Link>
                </Menu>
                <Menu>
                  <Link to="/join">
                    <SignUp>회원가입</SignUp>
                  </Link>
                </Menu>
              </>
            )}
          </MenuList>
        </MenuListWrapper>
      </Navigation>
    </Base>
  );
};

export default Header;
