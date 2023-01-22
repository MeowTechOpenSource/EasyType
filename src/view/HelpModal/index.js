import { Button, Modal } from "antd";
import { useCallback } from "react";
import Styles from "./index.module.css";

function KeyboardDescItem({ kbd, desc }) {
  return (
    <li className={Styles.listItem}>
      <kbd className={Styles.kbd}>{kbd}</kbd>
      <span>{desc}</span>
    </li>
  );
}

function HelpModal({ visible, onVisibleChange }) {
  const handleClose = useCallback(() => {
    onVisibleChange?.call(null, false);
  }, [onVisibleChange]);

  return (
    <Modal
      width="100%"
      height="90%"
      style={{ top: "4%" }}
      visible={visible}
      title="快捷鍵"
      onCancel={handleClose}
      footer={
        <Button key="close" type="primary" onClick={handleClose}>
          確認
        </Button>
      }
    >
      <h3>全局</h3>
      <ul className={Styles.list}>
        <KeyboardDescItem kbd="？" desc="顯示此頁面" />
        <KeyboardDescItem kbd="Ctrl+Z" desc="復原" />
        <KeyboardDescItem kbd="Ctrl+Shift+Z" desc="重做" />
        <KeyboardDescItem kbd="Ctrl+O" desc="開啟" />
        <KeyboardDescItem kbd="h j k l" desc="移動焦點" />
      </ul>
      <h3>只選中符號時</h3>
      <h4>輸入音符</h4>
      直接按鍵盤上相應的按鍵即可輸入到當前符號。支持的音符符號有：
      <p>
        <kbd className={Styles.kbd}>0~7</kbd>
        <kbd className={Styles.kbd}>─ ( )</kbd>
      </p>
      <h4>輸入輔助元素</h4>
      <ul className={Styles.list}>
        <KeyboardDescItem kbd="a" desc="選擇連線停止符號" />
        <KeyboardDescItem kbd="A" desc="刪除連音線" />
        <KeyboardDescItem kbd="|" desc="輸入小節線" />
        <KeyboardDescItem kbd="." desc="輸入附加點" />
        <KeyboardDescItem kbd="~" desc="音符號" />
        <KeyboardDescItem kbd="u / U" desc="增加減少時間線" />
        <KeyboardDescItem kbd="!" desc="打斷增加時間線" />
        <KeyboardDescItem kbd="8 / *" desc="八度圓點" />
        <KeyboardDescItem kbd="# / b" desc="音標升/降" />
      </ul>
      <h4>操作</h4>
      <ul className={Styles.list}>
      <KeyboardDescItem kbd="Enter" desc="下一個音符" />
        <KeyboardDescItem kbd="Shift+Enter" desc="上一個音符" />
        <KeyboardDescItem kbd="Ctrl+Enter" desc="插入音符" />
        <KeyboardDescItem kbd="Delete" desc="刪除音符" />
        <KeyboardDescItem kbd="Shift+Delete" desc="刪除段落" />
        <KeyboardDescItem kbd="=" desc="段落是否兩端對齊" />
        <KeyboardDescItem kbd="Ctrl+C" desc="複製音符" />
        <KeyboardDescItem kbd="Ctrl+Shift+C" desc="複製段落" />
        <KeyboardDescItem kbd="Ctrl+V" desc="貼上" />
        <KeyboardDescItem kbd="Shift+B" desc="更改節拍" />
      </ul>
      <h2>提示</h2>
      <ul className={Styles.list}>
        <li>段落上可以右鍵彈出操作菜單</li>
        <li>增加時間線默認連接，可在音符右鍵菜單中選擇打斷</li>
      </ul>
    </Modal>
  );
}

export default HelpModal;
