import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import { allBookApi } from "../apis/bookApi";
import { useQuery } from "react-query";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const Base = styled.div`
  align-items: center;
  margin: 0 auto;
  padding-top: 80px;
  width: 100%;
`;

const MainWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
`;

const Aside = styled.aside`
  width: 170px;
  padding-right: 46px;
`;

const SideTitle = styled.h1`
  font-size: 30px;
  line-height: 40px;
`;

const SideListWrapper = styled.div``;

const SideList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MainList = styled.li`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 23px;
  font-weight: 700;
`;
const List = styled.li`
  margin: 0;
  padding: 0;
  margin-bottom: 8px;
  font-size: 15px;
  line-height: 23px;
  letter-spacing: -0.01em;
  font-weight: 700;
`;

const Main = styled.div`
  width: calc(100% - 216px);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListItem = styled.li`
  width: 100%;
  margin-top: 20px;
  display: flex;
  padding-top: 10px;
  border-top: 1px solid #dfdfdf;
`;

const ItemCheck = styled.div`
  padding: 10px;
`;

const ItemImg = styled.div``;

const ItemContent = styled.div`
  width: 100%;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
`;

const ItemButton = styled.div`
  flex-shrink: 0;
  width: 135px;
  align-items: center;
`;

const PostWrapper = styled.div``;

const ListContainer = styled.ol`
  padding: 0;
`;
const MainPage = () => {
  const [open, setOpen] = useState(false);
  const { data: bookItem, isLoading } = useQuery("nowPlayingMovie", allBookApi);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const handleClickOpen = () => {
    // 해당상품 장바구니로 넣는 로직 추가 필요
    if (open === false) {
      setOpen((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <Base>
      <MainWrapper>
        <Aside>
          <SideTitle>
            <div>베스트셀러</div>
          </SideTitle>
          <SideListWrapper>
            <SideList>
              <MainList>
                종합 베스트
                <SideList>
                  <List>주간</List>
                  <List>월간</List>
                  <List>연간</List>
                </SideList>
              </MainList>
              <MainList>
                온라인 베스트
                <SideList>
                  <List>일간</List>
                  <List>주간</List>
                  <List>월간</List>
                </SideList>
              </MainList>
              <MainList>실시간 베스트</MainList>
              <MainList>매장별 베스트</MainList>
              <MainList>
                인물 베스트
                <SideList>
                  <List>일간</List>
                  <List>주간</List>
                  <List>월간</List>
                </SideList>
              </MainList>
            </SideList>
          </SideListWrapper>
        </Aside>
        <Main>
          <Header>
            <header>
              <h1>일간 베스트 셀러</h1>
              <p>
                인터넷에서 판매되는 상품의 지난 하루간 가장 많이 판매된
                순위입니다.
              </p>
            </header>

            <label>
              <select
                value={limit}
                typeof="number"
                onChange={({ target: { value } }) => setLimit(Number(value))}
              >
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="50">50개씩 보기</option>
              </select>
            </label>
          </Header>

          {/* 도서 목록 카드 */}
          <PostWrapper>
            <ListContainer>
              {isLoading ? (
                <div>
                  <img
                    src="images/bookLoader.gif"
                    alt=""
                    style={{ width: "300px" }}
                  />
                </div>
              ) : (
                bookItem?.data.data
                  .slice(offset, offset + limit)
                  .map(
                    ({
                      pid,
                      title,
                      author,
                      quantity,
                      price,
                      accum,
                      ImageURL,
                    }) => (
                      <ListItem key={pid}>
                        <ItemCheck>
                          <FaRegCheckCircle color="#ccc" size="24px" />
                        </ItemCheck>
                        <ItemImg>
                          <StyledLink to={`/book/${pid}`}>
                            <img
                              style={{ width: "140px" }}
                              src={ImageURL}
                              alt=""
                            />
                          </StyledLink>
                        </ItemImg>
                        <ItemContent>
                          <h3>
                            <StyledLink to={`/book/${pid}`}>{title}</StyledLink>
                          </h3>
                          <p>{author}</p>
                          <div>{quantity}</div>
                          <div>{price}</div>
                        </ItemContent>
                        <ItemButton>
                          <button onClick={handleClickOpen}>장바구니</button>
                          <button>바로구매</button>
                        </ItemButton>
                      </ListItem>
                    )
                  )
              )}
            </ListContainer>
          </PostWrapper>

          <footer>
            {isLoading ? (
              <></>
            ) : (
              <Pagination
                total={bookItem?.data.data.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            )}
          </footer>
        </Main>
      </MainWrapper>
      {/* 장바구니 담을 시 모달 창 */}
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>
          상품이 장바구니에 담겼습니다. <br /> 장바구니로 이동하시겠습니까?
        </DialogTitle>

        <Button onClick={handleClickOpen}>취소</Button>
        <Button>확인</Button>
      </Dialog>
    </Base>
  );
};

export default MainPage;
