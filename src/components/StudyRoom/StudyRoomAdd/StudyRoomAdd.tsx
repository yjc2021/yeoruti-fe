import React, { PropsWithChildren, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import categoryAddPopupAtom from "../../../atoms/categoryAdd";
import { useStudyCategoryPost } from "../../../hooks/react_query_hooks/useStudyCategory";
import COLOR from "../../../style/color";
import getFieldError from "../../../utils/getFieldError";
import localConsole from "../../../utils/localConsole";
import CategoryAddPopup from "../CategoryAddPopup/CategoryAddPopup";
import StudyRoomCategory from "./StudyRoomCategory";
import StudyRoomFormItem from "./StudyRoomFormItem";

const StudyRoomAdd = () => {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const isCategoryAddPopupOpen = useRecoilValue(categoryAddPopupAtom);
  const onSubmit = useStudyCategoryPost();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    localConsole?.log(formData);
    const formIsValid = Object.values(fieldValues).every(
      (value) => !getFieldError(value as string)
    );

    setWasSubmitted(true);
    // if (formIsValid) {
    //   // TODO: API 연결
    //   onSubmit(String(fieldValues.))
    //   localConsole?.log("form submitted", fieldValues);
    // }
  }

  const StudyRoomAddFieldNames = [
    { name: "스터디룸 이름", type: "text", key: "name" },

    {
      name: "스터디룸 최대 인원",
      type: "number",
      step: "1",
      key: "maximumNumberOfPeople",
    },
    {
      name: "스터디룸 하루 공부 목표 시간",
      type: "number",
      step: "0.5",
      key: "studyGoalTime",
    },
  ];

  return (
    <>
      <StudyRoomAddForm noValidate onSubmit={handleSubmit}>
        {StudyRoomAddFieldNames.map((item) => (
          <StudyRoomFormItem
            key={item.key}
            name={item.name}
            formKey={item.key}
            wasSubmitted={wasSubmitted}
            type={item.type}
            step={item.step}
          />
        ))}
        <StudyRoomCategory
          name="스터디룸 카테고리"
          wasSubmitted={wasSubmitted}
        />

        <StudyRoomSubmitWrap>
          <StudyRoomFormButton>추가하기</StudyRoomFormButton>
        </StudyRoomSubmitWrap>
      </StudyRoomAddForm>
    </>
  );
};

const StudyRoomAddWrap = ({ children }: PropsWithChildren) => {
  return <StudyRoomAddWrapDiv>{children}</StudyRoomAddWrapDiv>;
};

export default StudyRoomAdd;

const StudyRoomAddForm = styled.form`
  display: grid;
  grid-template-columns: 19.375rem 19.375rem;
  grid-template-rows: 5.6875rem 5.6875rem 5.6875rem;
  grid-row-gap: 1.875rem;
  grid-column-gap: 1.875rem;
  /* padding: 4.375rem 2.25rem 2.25rem 2.25rem; */
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0.5px 3px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;

  .Alert__Message {
    color: #c60404 !important;
    font-size: 0.8rem;
  }
  .Alert {
    border-color: #c60404 !important;
    ::placeholder {
      color: #c60404 !important;
    }
  }
`;
export const StudyRoomSubmitWrap = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StudyRoomFormButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.625rem 3.375rem;
  border-radius: 12px;
  border: none;
  box-shadow: 0 0.0625rem 0.25rem 0 rgba(0, 0, 0, 0.16);
  background-color: ${COLOR.MAIN};

  font-size: 1.25rem;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;

  color: #fff;
`;
const StudyRoomAddWrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  height: auto;

  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
`;

const StudyRoomInput = styled.input`
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;
`;
const StudyRoomCategoryButton = styled.button`
  border-radius: 10px;
  border: 1px solid black;
  padding: 5px;
`;
