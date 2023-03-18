import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import myStudyRoomAtom from "../../atoms/myStudyRoom";
import StudyRoomLayout from "../../components/StudyRoom/StudyRoomLayout";
import { useRoomUserStudyRoomGet } from "../../hooks/react_query_hooks/useRoomUser";
import COLOR from "../../style/color";
const MyStudyRoomContainer = () => {
  return (
    <StudyRoomLayout
      Nav={MyStudyRoomNav}
      Main={MyStudyRoomMain}
      Member={MyStudyRoomMemberStatus}
      Dropdown={MyStudyRoomDropDown}
    />
  );
};

const dummyStudyRoom = [
  {
    name: "item1",
    id: "1",
  },
  {
    name: "item2",
    id: "2",
  },
  {
    name: "item3",
    id: "3",
  },
  {
    name: "item4",
    id: "4",
  },
];
export const MyStudyRoomDropDown = () => {
  const { status, data } = useRoomUserStudyRoomGet();
  const [curStudyRoom, setCurStudyRoom] = useRecoilState(myStudyRoomAtom);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownAni, setDropdownAni] = useState(false);
  const repeatRef = useRef<NodeJS.Timeout | null>(null);
  const onDropdownClick = () => {
    setDropdownVisible((state) => !state);
  };

  useEffect(() => {
    if (dropdownVisible) {
      clearTimeout(repeatRef.current || undefined);
      repeatRef.current = null;
      setDropdownAni(true);
    } else {
      repeatRef.current = setTimeout(() => setDropdownAni(false), 400);
    }
  }, [dropdownVisible]);

  return dropdownAni ? (
    <article
      style={{ overflow: "hidden", borderRadius: "10px", position: "relative" }}
    >
      <DropdownUl
        onClick={onDropdownClick}
        className={
          dropdownVisible ? "Dropdown__Slide__In" : "Dropdown__Slide__Out"
        }
      >
        {dummyStudyRoom.map((item, idx) => {
          return (
            <li key={item.id} onClick={() => setCurStudyRoom(item.name)}>
              {item.name}
            </li>
          );
        })}
        {data?.data.data.map((item, idx) => {
          return (
            <li key={item.id} onClick={() => setCurStudyRoom(item.name)}>
              {item.name}
            </li>
          );
        })}
      </DropdownUl>
    </article>
  ) : (
    <DropdownDiv onClick={onDropdownClick}>
      <span>{curStudyRoom}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 Dropdown__Chevron__Down"
      >
        <path
          fillRule="evenodd"
          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
          clipRule="evenodd"
        />
      </svg>
    </DropdownDiv>
  );
};
const MyNavData = [
  {
    type: "home",
    name: "홈",
    url: "/studyroom/my-studyroom/home",
  },
  {
    type: "attendance",
    name: "출석부",
    url: "/studyroom/my-studyroom/attendance",
  },
  {
    type: "rank",
    name: "랭킹",
    url: "/studyroom/my-studyroom/rank",
  },
  {
    type: "chat",
    name: "채팅",
    url: "/studyroom/my-studyroom/chat",
  },
  {
    type: "invite",
    name: "초대",
    url: "/studyroom/my-studyroom/invite",
  },
  {
    type: "settings",
    name: "설정",
    url: "/studyroom/my-studyroom/settings",
  },
];
export const MyStudyRoomNav = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  return (
    <NavUl>
      {MyNavData.map((item, idx) => (
        <NavItemLi
          key={`myStudyRoomNav-${item.type}`}
          selected={item.type === String(type)}
          onClick={() => navigate(item.url)}
        >
          {item.name}
        </NavItemLi>
      ))}
      {/* <li onClick={() => navigate("/studyroom/my-studyroom/home")}>홈</li>
      <li onClick={() => navigate("/studyroom/my-studyroom/attendance")}>
        출석부
      </li>
      <li onClick={() => navigate("/studyroom/my-studyroom/rank")}>랭킹</li>
      <li onClick={() => navigate("/studyroom/my-studyroom/chat")}>채팅</li>
      <li onClick={() => navigate("/studyroom/my-studyroom/invite")}>초대</li>
      <li onClick={() => navigate("/studyroom/my-studyroom/settings")}>설정</li> */}
    </NavUl>
  );
};

type NavItemProps = {
  selected: boolean;
};
export const NavItemLi = styled.li<NavItemProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? COLOR.MAIN : "none")};
  /* opacity: ${(props) => (props.selected ? "0.5" : "1")}; */
  padding: 10px;
  &:hover {
    background-color: ${(props) => (props.selected ? "none" : "#B5CDA3")};
  }
`;
export const MyStudyRoomMemberStatus = () => {
  return (
    <MemberUl>
      <MyStudyRoomMemberItem name={"최용재"} />
      <MyStudyRoomMemberItem name={"하정수"} />
      <MyStudyRoomMemberItem name={"정채은"} />
      <MyStudyRoomMemberItem name={"이채민"} />
    </MemberUl>
  );
};
type MemberItemProps = {
  name: string;
};
const MyStudyRoomMemberItem = (props: MemberItemProps) => {
  return (
    <MemberLi>
      <div>{props.name}</div>
      <div className="Member__Item__Status"></div>
    </MemberLi>
  );
};

export const MyStudyRoomMain = () => {
  const { type } = useParams();

  switch (type) {
    case "home":
      return <MyHome />;
    case "attendance":
      return <>attendance</>;
    case "rank":
      return <>rank</>;
    case "chat":
      return <>chat</>;
    case "invite":
      return <>invite</>;
    case "settings":
      return <>settings</>;
    default:
      return <></>;
  }
};

export const MyHome = () => {
  return (
    <>
      <MyHomeNotification />
    </>
  );
};

const MyHomeNotification = () => {
  return (
    <div style={{ padding: "5px" }}>
      <MyHomeNotificationDiv>공지</MyHomeNotificationDiv>
    </div>
  );
};

const MyHomeNotificationDiv = styled.div`
  /* position: fixed;
  top: 0; */
  width: 100%;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  background-color: rgba(1, 1, 1, 0.07);
`;
export default MyStudyRoomContainer;

const DropdownUl = styled.ul`
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  background-color: ${COLOR.MAIN};
  z-index: 1000;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 10px;

    &:hover {
      background-color: ${(props) => "#B5CDA3"};
    }
  }
`;

const DropdownDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${COLOR.MAIN};
  border-radius: 10px;
  width: 100%;
  height: 40px;
  background-color: ${COLOR.MAIN};
  padding: 0 10px;

  .Dropdown__Chevron__Down {
    color: #fff;
    object-fit: contain;
    height: 20px;
    font-weight: 200;
    width: auto;
  }
`;

export const NavUl = styled.ul`
  border-radius: 4px;
`;

const MemberUl = styled.ul`
  border-radius: 4px;
`;
const MemberLi = styled.li`
  width: 100%;
  height: 40px;
  padding: 3px 10px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  .Member__Item__Status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: green;
  }
`;
