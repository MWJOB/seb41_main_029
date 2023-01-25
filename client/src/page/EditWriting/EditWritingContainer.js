import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import styled from "styled-components";
import theme from "../../Theme";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { editWriting, getWriting } from "../../api/writingAPI";

const SpanTitle = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  .SpanTitle {
    font-size: ${({ theme }) => theme.fontSizes.fs24};
    width: 100px;
    /* margin-left: -24px; */
    display: flex;

    @media (max-width: 1336px) {
      width: 150px;
      padding-left: 5%;
    }
    // 400이 되면 또 세로로 된다 카테고리가 너무 크다 줄여보자
    @media (max-width: 455px) {
      font-size: ${theme.fontSizes.fs18};
      margin-top: 6px;
      display: flex;
      justify-content: center;
    }
  }
  input {
    width: 800px;
    height: 40px;
    border-radius: 8px;
    border: none;

    /* margin-right: 28px; */

    @media (max-width: 1336px) {
      width: 90%;
    }
  }
  .menu > {
    button {
      border: none;
      background-color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
    }
  }
`;
const SpanContent = styled.div`
  /* width: 1070px; */
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
`;
// 전체
const CategoryBox = styled(Box)`
  width: 100%;
`;
// 카테고리 글씨 움직이는 틀
const CategoryInputLabel = styled(InputLabel)`
  width: 100%;
  margin: -8px 0 0px 12px;

  .CategorySpan {
    @media (max-width: 1336px) {
      font-size: 14px;
    }
  }

  /* @media (max-width: 1336px) {
    width: 50%;
    font-size: 12px;
  } */
`;
//.
const CategorySelect = styled(Select)`
  height: 40px;

  // icon
  // 반응형을 줬을 때 아이콘이 변함
  .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon {
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fontSizes.fs64};
    margin-right: 8px;

    @media (max-width: 1336px) {
      width: 30%;
    }
  }
`;
// 전체 크기
const CategoryFormControl = styled(FormControl)`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  label {
    font-weight: 800;
    font-family: "Noto Sans CJK KR";
  }
  // X
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select {
    margin: 8px 0 0 12px;
    font-size: ${({ theme }) => theme.fontSizes.fs18};
  }
  // x
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
    display: none;
  }
  //전체 크기
  @media (max-width: 1336px) {
    width: 75%;
  }
  /* @media (max-width: 850px) {
    width: 75%;
    background-color: black;
  } */

  .css-1m5xwth-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
    @media (max-width: 850px) {
    }
  }
`;

const CategoryMenuItem = styled(MenuItem)``;

const BottomDiv = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 40px;

  @media (max-width: 1336px) {
    width: 100%;
  }
`;
// button or a 태그
// button 이면 align,justify,display 삭제하기
const ViewButton = styled.a`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  margin: 0 36px 0px 36px;

  align-items: center;
  justify-content: center;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.ckColor};
  }
`;
const EditWritingEditor = ({ setImage }) => {
  // const user = useSelector((state) => state.currentUser);
  // const { state } = useLocation();
  const { boardSeq } = useParams();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const [viewInfo, setViewInfo] = useState();

  async function getInfo() {
    const res = await getWriting(Token, boardSeq);
    // const res = await getWriting(id);
    setViewInfo(res);
    // console.log(res);
    // if (res?.status !== 200) {
    //   setLoading(true);
    // }
    // console.log(isBM);
  }
  useEffect(() => {
    getInfo();
  }, []);
  console.log(viewInfo?.data?.title);

  const editwriting = () => {
    editWriting(Token, boardSeq);
  };
  const [answer, setAnswer] = useState(""); //editor
  // const [flag, setFlag] = useState(false);
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState({
    //input
    title: "",
  });

  const onClick = (e) => {
    // answer와 detail을 값을 넘겨줘서 클릭시 콘솔에 찍히게 해줘야 한다
    // setDetail(e.target.value),
    // setAnswer(e.target.value)
  };
  /** */
  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };
  const editorChange = (event) => {
    setAnswer({
      ...answer,
      content: event.target.value,
    });
    console.log(answer);
  };
  const titleChange = (event) => {
    setDetail({
      ...detail,
      title: event.target.value,
    });
    console.log(detail);
  };
  const API_URL = "https://noteyard-backend.herokuapp.com";
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  const uploadAdapter = (loader) => {
    // (2)
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ default: `https://ibb.co/TWfQMJN` });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div>
      <SpanTitle>
        <SpanContent>
          <span className="SpanTitle">제목</span>
          <input
            type="text"
            value={
              // detail.title
              viewInfo?.data?.title
            }
            onChange={titleChange}
          />
          <div className="menu">
            {/* mui 사용 */}
            <CategoryBox sx={{ minWidth: 180 }}>
              <CategoryFormControl>
                <CategoryInputLabel id="demo-simple-select-label">
                  <span className="CategorySpan">카테고리</span>
                  {/* 카테고리 */}
                </CategoryInputLabel>
                <CategorySelect
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="category"
                  onChange={handleChange}
                >
                  <CategoryMenuItem value={"GENERAL"}>일 반</CategoryMenuItem>
                  <CategoryMenuItem value={"INFORMATION"}>
                    정 보
                  </CategoryMenuItem>
                  <CategoryMenuItem value={"QUESTION"}>질 문</CategoryMenuItem>
                </CategorySelect>
              </CategoryFormControl>
            </CategoryBox>
          </div>
        </SpanContent>
      </SpanTitle>
      <CKEditor
        editor={ClassicEditor}
        data={viewInfo?.data?.content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setAnswer({
            ...answer,
            content: data,
          });
          console.log(answer);
        }}
        config={{
          extraPlugins: [uploadPlugin],
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "insertTable",
              "mediaEmbed",
              "undo",
              "redo",
              "alignment",
              "fontSize",
              "highlight",
              "imageUpload",
            ],
          },
        }}
      />

      <BottomDiv>
        <ViewButton bgColor="#CCCCCC" ckColor="#BBBBBB" href="community">
          취소
        </ViewButton>
        <ViewButton
          bgColor="#62B6B7"
          ckColor="#439A97"
          href="community"
          onClick={editwriting}
        >
          수정
        </ViewButton>
      </BottomDiv>
    </div>
  );
};

export default EditWritingEditor;