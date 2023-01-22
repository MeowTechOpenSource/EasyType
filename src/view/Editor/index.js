import { Button, Dropdown, Modal } from "antd";
import { VERSION, VERSIONNAME } from "../../util/version";
import {
  EditOutlined,
  FileTextOutlined,
  QuestionOutlined,
  InfoCircleOutlined,
  RetweetOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import state from "../../store/state";
import store from "../../store/global";
import P, {
  calcParagraphAboveOffset,
  calcParagraphHeight,
} from "../../util/placement";
import {
  convertMenu,
  editMenu,
  fileMenu,
  handleClick,
  handleKeyPress,
} from "../../menu/editor";
import { unwrappedAction } from "../../store/history";
import Canvas from "../Canvas";
import ConfigModal from "../ConfigModal";
import Header from "../Header";
import HelpModal from "../HelpModal";
import Paragraph from "../Paragraph";
import Row from "../Row";
import Styles from "./index.module.css";

function Editor() {
  const heightCache = [];
  function accumulate(index) {
    const paragraphs = store.paragraphs || [];
    let height = 0;
    for (let i = 0; i < index; i++) {
      const p = paragraphs[i];
      heightCache[i] = heightCache[i] || calcParagraphHeight(p);
      height += heightCache[i];
    }
    // 段落渲染定位基于段落中心，因此加上上半部分的偏移量
    height += calcParagraphAboveOffset(paragraphs[index]);
    return height;
  }
  const handleChangeConfigModalVisibility = unwrappedAction((visible) => {
    state.configDialogVisible = visible;
  });
  const handleChangeHelpModalVisibility = unwrappedAction((visible) => {
    state.helpDialogVisible = visible;
  });
  const handleShowConfigDialog = () => {
    handleChangeConfigModalVisibility(true);
  };
  const handleShowHelpDialog = () => {
    handleChangeHelpModalVisibility(true);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={Styles.container}
      style={{ width: store.canvasWidth + "px"}}
    >
      <div style={{}} className={Styles.headerWrapper}>
        <div
          className={Styles.header}
          style={{ width: store.canvasWidth + "px" }}
        >
          <Dropdown overlay={fileMenu} placement="bottomLeft">
            <Button icon={<FileTextOutlined />} type="text">
              檔案
            </Button>
          </Dropdown>
          <Dropdown overlay={editMenu} placement="bottomLeft">
            <Button icon={<EditOutlined />} type="text">
              編輯
            </Button>
          </Dropdown>
          {/* <Dropdown overlay={convertMenu} placement="bottomLeft">
            <Button icon={<RetweetOutlined />} type="text">
              转调
            </Button>
          </Dropdown> */}
          <Button
            icon={<SettingOutlined />}
            type="text"
            onClick={handleShowConfigDialog}
          >
            設置
          </Button>
          <Button
            icon={<QuestionOutlined />}
            type="text"
            onClick={handleShowHelpDialog}
          >
            快捷鍵
          </Button>
          <Button
            icon={<InfoCircleOutlined />}
            type="text"
            onClick={function(){
              Modal.info({
                title: '關於 EasyType',
                content: (
                  <div>
                    <p>EasyType 版本: {VERSIONNAME}({VERSION})</p>
                    <p>Copyright (c) 2022, Meow Tech Open Source. Based on Numerical Notation Editor, licensed under GNU v3 public license.</p>
                  </div>
                ),
                onOk() {},
              });
            }}
          >
            關於
          </Button>
        </div>
      </div>
      <Canvas onClick={handleClick}>
        <Header />
        <Row offsetX={store.marginHorizontal} offsetY={P.headerOffsetY}>
          {store.paragraphs.map((p, i) => {
            //console.log(i)
            let alignJustify = p.alignJustify;
            if (typeof alignJustify !== "boolean") {
              alignJustify = !(i === store.paragraphs.length - 1);
            }
            return (
              <Paragraph
                key={p.key}
                paragraph={p}
                offsetY={accumulate(i)}
                alignJustify={alignJustify}
              />
            );
          })}
        </Row>
      </Canvas>
      <ConfigModal
        visible={state.configDialogVisible}
        onVisibleChange={handleChangeConfigModalVisibility}
      ></ConfigModal>
      <HelpModal
        visible={state.helpDialogVisible}
        onVisibleChange={handleChangeHelpModalVisibility}
      ></HelpModal>
    </div>
  );
}

export default observer(Editor);
