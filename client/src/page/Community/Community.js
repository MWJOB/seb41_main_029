import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import jsonData from "../../data/Posts";
import { useNavigate, Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faClock,
  faEye,
  faCircleUser,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { ViewdateCommu } from "../../component/DateCalculator";

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 10px; */
  margin: 50px 8px 0 8px;
`;
const ComuContainer = styled.div`
  width: 100%;
  max-width: 1336px;
`;

// 리스트 윗 부분
const TopBox = styled.div`
  background-color: ${({ theme }) => theme.colors.container};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

// 카테고리 & 글작성 버튼이 있는 bar
const CategoryWritingBtnBar = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: 30px; */
  padding: 25px 3%;
  /* border-bottom: 1px solid #92bdbd; */
  /* font-size: ${({ theme }) => theme.fontSizes.fs24}; */
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs16};
    padding: 23px 4%;
  }
`;

const Categories = styled.div`
  display: flex;
`;

const Cate = styled.button`
  padding: 0 2px;
  margin-right: 20px;
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
  &:focus {
    font-weight: 700;
  }
  &:active {
    font-weight: 700;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs16};
  }
`;

const BtnBox = styled.div`
  display: flex;
`;

const FilterBtn = styled.div`
  font-size: 17px;
  /* ${({ theme }) => theme.fontSizes.fs18}; */
  @media (max-width: 600px) {
    font-size: 15px;
    /* ${({ theme }) => theme.fontSizes.fs16}; */
  }
`;

const WritingBtn = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  margin-left: 30px;
  cursor: pointer;
  &:hover {
    color: #62b6b7;
  }
  &:focus {
    color: #62b6b7;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs16};
  }
`;

const PostInfoBarMargin = styled.div`
  /* height: 15px; */
`;

// 게시글 목록
const PostsList = styled.div``;
const Post = styled.div`
  display: flex;
  align-items: center;
  /* height: 90px; */
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_02};
  font-size: ${({ theme }) => theme.fontSizes.fs18};
  padding: 0 10px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
  }
`;

const PostHead = styled.div`
  /* width: 60px; */
  margin-left: 1.5%;
  width: 100%;
  max-width: 45px;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
    max-width: 35px;
  }
`;

const PostHeadBox = styled.div`
  // 카테고리에 따라 색 변경
  /* background-color: #62b6b7; */
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  min-width: 20px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostTitleBox = styled.div`
  width: 700px;
  display: flex;
  /* .ellipsis {
    width: 100%;
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */
  /* @media (max-width: 800px) {
    .ellipsis {
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    } */
  min-width: 80px;
  margin-right: 20px;
  @media (max-width: 600px) {
    .ellipsis {
      /* width: 130px; */
      width: 100%;
      min-width: 80px;
      // width 말고 다른 속성 써야하나?
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const PostTitle = styled.div`
  padding-left: 5px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const PostComment = styled.div`
  color: ${({ theme }) => theme.colors.gray_03};
  padding-left: 5px;
  margin-top: 5px;
  font-size: ${({ theme }) => theme.fontSizes.fs12};
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  min-width: 200px;
  @media (max-width: 600px) {
    min-width: 65px;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
`;

const PostDate = styled.div`
  display: flex;
  min-width: 65px;
  color: ${({ theme }) => theme.colors.gray_03};
  .clock {
    padding: 7px 3px 0 0;
  }
`;

const PostView = styled.div`
  color: ${({ theme }) => theme.colors.gray_03};
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

const PostLike = styled.div`
  color: ${({ theme }) => theme.colors.gray_03};
`;

const PostWriter = styled.div`
  width: 130px;
  min-width: 100px;
  margin-left: 4%;
  @media (max-width: 600px) {
    min-width: 70px;
  }
`;

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redefine classes here, if you want.
  activeClassName: "active", // default to "selected"
})`
  margin: 50px 16px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a {
    color: #62b6b7;
  }
  li.active a {
    /* background-color: #62b6b7;
    color: white; */
    color: #91cccd;
    font-weight: 700;
    min-width: 32px;
  }
  li.disabled a {
    color: ${({ theme }) => theme.colors.gray_03};
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs10};
  }
`;

// 검색
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.container};
  width: 290px;
  border-radius: 10px;
  padding-right: 13px;
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    width: 200px;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  outline: none;
  width: 280px;
  padding: 10px 10px 10px 13px;
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  @media (max-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.fs12};
    width: 190px;
  }
`;
export default function Community() {
  const navigate = useNavigate();

  const url =
    "http://ec2-13-209-237-254.ap-northeast-2.compute.amazonaws.com:8080";

  // axios
  const [items, setItems] = useState([]);

  const limit = 3; // 한 페이지 당 게시글 수

  // 인증
  const cookies = new Cookies();
  const token = cookies.get("token");

  const [hasToken, setHasToken] = useState(false);

  // 필터링,카테고리,검색
  const [sortby, setSortby] = useState("최신순");
  const [cate, setCate] = useState(0); // 전체0, 일반1, 정보2, 질문3
  const [searchTerm, setSearchTerm] = useState("");

  // 페이지네이션
  const [page, setPage] = useState(0);

  useEffect(() => {
    token ? setHasToken(true) : setHasToken(false);
  }, [token]);

  // 글작성 버튼 권한 처리
  const handleClick = () => {
    hasToken ? navigate("/writing") : alert("로그인을 먼저 진행해주세요");
  };

  //----------------------------------------------------------------------------

  // 정식 데이터 1페이지 조회
  const handleLoadAll = async (cate, sortby2) => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/boards/all${cate}?page=1&size=${limit}&sort-by=${sortby2}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPosts(response.data);
      // setLoading(false);
      console.log(res.data);

      setItems(res.data);
      setPage(0); // 페이지 초기화
    } catch (err) {
      throw err;
    }
  };

  // 카테고리별 데이터 1페이지 조회
  const handleLoadCate = async (cate) => {
    try {
      // setLoading(true);
      const res = await axios.get(
        `${url}/boards/all/${cate}?page=1&size=${limit}&sort-by=${sortby}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPosts(response.data);
      // setLoading(false);
      console.log(res.data);
      setItems(res.data);
    } catch (err) {
      throw err;
    }
  };

  // 검색 데이터
  const handleLoadSearch = async (e) => {
    try {
      if (e.key === "Enter") {
        // setLoading(true);
        const res = await axios.get(
          `${url}/boards/search?keyword=${searchTerm}&page=1&size=15`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // setPosts(response.data);
        // setLoading(false);
        console.log(res.data);
        setItems(res.data);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    handleLoadAll("", "최신순");
  }, []);

  //----------------------------------------------------------------------------

  // 페이지네이션 데이터
  const axiosPosts = async (currentPage, cate) => {
    const res = await axios.get(
      `${url}/boards/all${cate}?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    const data = await res.data;
    return data;
  };

  const axiosPostsCate = async (currentPage, cate) => {
    const res = await axios.get(
      `${url}/boards/all/${cate}?page=${currentPage}&size=${limit}&sort-by=${sortby}`
    );
    const data = await res.data;
    return data;
  };

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPage(data.selected);

    let currentPage = data.selected + 1;

    let commentsFormServer = await axiosPosts(currentPage, "");

    if (cate === 1) {
      // commentsFormServer = await axiosPostsCate(currentPage, 1);
      commentsFormServer = await axiosPosts(currentPage, "/1");
    }

    if (cate === 2) {
      // commentsFormServer = await axiosPostsCate(currentPage, 2);
      commentsFormServer = await axiosPosts(currentPage, "/2");
    }

    if (cate === 3) {
      // commentsFormServer = await axiosPostsCate(currentPage, 3);
      commentsFormServer = await axiosPosts(currentPage, "/3");
    }

    setItems(commentsFormServer);
  };

  return (
    <>
      <Container>
        <ComuContainer>
          <TopBox>
            <CategoryWritingBtnBar>
              <Categories>
                <Cate
                  style={{ fontWeight: cate === 0 ? "700" : "" }}
                  onClick={() => {
                    setCate(0);
                    handleLoadAll("", "최신순");
                  }}
                >
                  전체
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 1 ? "700" : "" }}
                  onClick={() => {
                    setCate(1);
                    // handleLoadCate(1);
                    handleLoadAll("/1", "최신순");
                  }}
                >
                  일반
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 2 ? "700" : "" }}
                  onClick={() => {
                    setCate(2);
                    // handleLoadCate(2);
                    handleLoadAll("/2", "최신순");
                  }}
                >
                  정보
                </Cate>
                <Cate
                  style={{ fontWeight: cate === 3 ? "700" : "" }}
                  onClick={() => {
                    setCate(3);
                    // handleLoadCate(3);
                    handleLoadAll("/3", "최신순");
                  }}
                >
                  질문
                </Cate>
                {console.log(cate)}
              </Categories>
              <BtnBox>
                <FilterBtn>
                  <FontAwesomeIcon icon={faFilter} size="xs" color="gray" />{" "}
                  FILTER
                </FilterBtn>
                <WritingBtn onClick={handleClick}>글 작성</WritingBtn>
              </BtnBox>
            </CategoryWritingBtnBar>
            <PostInfoBarMargin></PostInfoBarMargin>
          </TopBox>
          <PostsList>
            {items.map((item) => {
              return (
                <Post key={item.boardSeq}>
                  <PostHead>
                    {item.category === "# 일반" ? (
                      <PostHeadBox bgColor="#6DB8B9">일반</PostHeadBox>
                    ) : (
                      ""
                    )}
                    {item.category === "# 정보" ? (
                      <PostHeadBox bgColor="#AEDC88">정보</PostHeadBox>
                    ) : (
                      ""
                    )}
                    {item.category === "# 질문" ? (
                      <PostHeadBox bgColor="#A6D9DE">질문</PostHeadBox>
                    ) : (
                      ""
                    )}
                  </PostHead>
                  {/* <PostBox> */}
                  <PostTitleBox>
                    <PostTitle className="ellipsis">
                      <StyledLink to={`/boards/${item.boardSeq}`}>
                        {item.title}
                      </StyledLink>
                    </PostTitle>

                    <PostComment>[{item.commented}]</PostComment>
                  </PostTitleBox>
                  <PostInfo>
                    <PostDate>
                      <FontAwesomeIcon
                        icon={faClock}
                        size="xs"
                        className="clock"
                      />{" "}
                      <ViewdateCommu createdAt={item.createdAt} />
                    </PostDate>
                    <PostView>
                      <FontAwesomeIcon icon={faEye} size="xs" />{" "}
                      {item.viewCount}
                    </PostView>
                    <PostLike>
                      <FontAwesomeIcon icon={faHeart} size="xs" />{" "}
                      {item.likeCount}
                    </PostLike>
                  </PostInfo>
                  {/* </PostBox> */}
                  <PostWriter>
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      size="lg"
                      color="gray"
                    />{" "}
                    {item.username}
                  </PostWriter>
                </Post>
              );
            })}
          </PostsList>
        </ComuContainer>
      </Container>
      <MyPaginate
        forcePage={page}
        previousLabel={"〈"}
        nextLabel={"〉"}
        breakLabel={"..."}
        pageCount={15}
        marginPagesDisplayed={3}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
      <SearchContainer>
        <Search>
          <SearchInput
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleLoadSearch}
          ></SearchInput>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" size="lg" />
        </Search>
      </SearchContainer>
      <Filter1
        onClick={() => {
          handleLoadAll("", "최신순");
        }}
      >
        최신순
      </Filter1>
      <Filter2
        onClick={
          () => {
            handleLoadAll("", "조회순");
          }
          // cate에 따라 작동 나누기
          // {cate === 0 ? () => {handleLoadAll("", "조회순")} : ""};
          //   {cate === 1 ? () => {handleLoadAll("/1", "조회순")} : ""};
        }
      >
        조회순
      </Filter2>
      <Filter3
        onClick={() => {
          handleLoadAll("", "추천순");
        }}
      >
        추천순
      </Filter3>
      <Filter4
        onClick={() => {
          handleLoadAll("", "북마크순");
        }}
      >
        북마크순
      </Filter4>
    </>
  );
}

const Filter1 = styled.div``;
const Filter2 = styled.div``;
const Filter3 = styled.div``;
const Filter4 = styled.div``;
