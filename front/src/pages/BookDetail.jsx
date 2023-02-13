import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { List, Avatar, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

import DefaultInfo from "../components/DefaultInfo";
import CommentForm from "../components/CommentForm";

import useBookDetail from "./useBookDetail";

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: "https://joeschmoe.io/api/v1/random",
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Base = styled.div`
  position: relative;
  background: #f8f8f8;
`;

const TopInfo = styled.section`
  padding-top: 80px;
  border-bottom: 1px solid rgb(227, 227, 227);
  background: rgb(255, 255, 255);
`;

const Main = styled.div`
  padding: 0 0 40px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;
const Header = styled.div`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #e3e3e3;
`;
const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 33px;
  font-weight: 700;
`;
const Author = styled.div``;
const BookInfoWrapper = styled.div``;
const BookInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const Thumbnail = styled.div`
  flex: 1 1 auto; /*grow, shrink, basis */
  width: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.pos === "center" ? "flex-end" : "space-between"};
  margin-bottom: 25px;
`;

const Review = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 20px;
  border: 0.5px solid #eaeaea;
  padding: 10px 20px;
`;

const ImgBox = styled.div``;
const Img = styled.img`
  width: 400px;
  box-shadow: 0px 10px 20px 0px rgb(0 0 0 / 30%);
`;
const PriceWrapper = styled.div`
  flex: 1 1 auto;
  width: 330px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 30px;
  padding-left: 50px;
  box-sizing: border-box;
`;
const PurchaseWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 95%;
  border: 1px solid #eaeaea;
  border-radius: 20px;
`;
const PurchaseController = styled.div`
  box-sizing: border-box;
`;

const InputNumber = styled.input`
  width: 30px;
`;

const BottomInfo = styled.div`
  padding: 28px 0 48px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentSectionContainer = styled.div`
  border-right: 1px solid;
  border-left: 1px solid;
  border-top: 1px solid;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background: #fff;
  border-color: #e3e3e3;
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

const BookDetail = () => {
  const { id } = useParams();
  const [Quantity, setQuantity] = useState(1);
  const { data: bookItem, isLoading } = useBookDetail(id);

  console.log(bookItem?.data[0]);
  const onChange = (e) => {
    setQuantity(e.target.value);
  };

  console.log(Quantity);
  console.log(bookItem?.data);
  return (
    <Base>
      {isLoading || !bookItem ? (
        <div>
          <img src="images/bookLoader.gif" alt="" />
        </div>
      ) : (
        <>
          <TopInfo>
            {/* 메인 */}
            <Main>
              <Container>
                <Header>
                  <Title>{bookItem?.data?.book.title}</Title>
                  <Author>{bookItem?.data?.book.author}</Author>
                </Header>
                <BookInfoWrapper>
                  <BookInfo>
                    <Thumbnail>
                      <ImgBox>
                        <Img src={bookItem?.data?.book.img} alt="" />
                      </ImgBox>
                    </Thumbnail>
                    <PriceWrapper>
                      <Item pos="">
                        <div>정가</div>
                        <div>{bookItem?.data?.book.price}</div>
                      </Item>
                      <Item pos="">
                        <div>판매가</div>
                        <div>
                          {bookItem?.data?.book.price -
                            bookItem?.data?.book.accum}
                          ({bookItem?.data?.book.accum}원 할인)
                        </div>
                      </Item>
                      {/* <Item pos="">
                        <div>적립/혜택</div>
                        <div>860P</div>
                      </Item> */}
                      <Item pos="">
                        <div>배송료</div>
                        <div>무료</div>
                      </Item>
                      {/* 리뷰 별점 */}
                      <Item pos="center">
                        {/* <Review>
                          <div>{bookItem.detail.vote_average}</div>
                          <div>
                            <Rating
                              size="small"
                              value={bookItem.detail.vote_average / 2}
                              precision={0.1}
                              readOnly
                            />
                          </div>
                          <span>({bookItem.detail.vote_count}개의 리뷰)</span>
                        </Review> */}
                      </Item>

                      <PurchaseWrapper>
                        <PurchaseController>
                          수량
                          <InputNumber
                            value={Quantity}
                            type="number"
                            onChange={onChange}
                          />
                          <span>
                            총 상품금액{" "}
                            {Quantity *
                              (bookItem?.data?.book.price -
                                bookItem?.data?.book.accum)}
                            원
                          </span>
                        </PurchaseController>
                        <div>
                          <Button color="register">장바구니 담기</Button>
                          <Button color="">바로구매</Button>
                        </div>
                      </PurchaseWrapper>
                    </PriceWrapper>
                  </BookInfo>
                </BookInfoWrapper>
              </Container>
            </Main>
          </TopInfo>
          {/* 댓글 폼 */}
          <Container>
            <CommentForm />
            {/* 댓글 리스트 */}
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      text="156"
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text="156"
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Container>
          {/* 상세 정보 */}
          <BottomInfo>
            <ContentSectionContainer>
              {/* <DefaultInfo
                title={bookItem.detail.title}
                year={year}
                overview={bookItem.detail.overview}
              /> */}
            </ContentSectionContainer>
          </BottomInfo>
        </>
      )}
    </Base>
  );
};

export default BookDetail;
