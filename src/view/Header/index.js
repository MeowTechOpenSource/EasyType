import React from "react";
import LeftInfoBlock from "./LeftInfoBlock";
import RightInfoBlock from "./RightInfoBlock";
import Title from "./Title";
import PageNumber from "./PageNumber";
import store from "../../store/global";
import { observer } from "mobx-react-lite";
function Header() {
  return (
    <>
      <Title></Title>
      { store.showheaders && <LeftInfoBlock></LeftInfoBlock>}
      <RightInfoBlock></RightInfoBlock>
      <PageNumber></PageNumber>
    </>
  );
}

export default observer(Header);
