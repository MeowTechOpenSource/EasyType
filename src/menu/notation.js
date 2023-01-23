import {
  DeleteOutlined,
  RadiusSettingOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import state from "../store/state";
import { findParagraphAndNotation } from "../util/editor";
import { isNote } from "../util/notation";
import { runInWrappedAction, wrappedAction } from "../store/history";

const getNotationContextMenu = (notation, paragraph) => {
  const hasTie = notation.tieTo;
  const handleMenu = wrappedAction(function ({ key }) {
    switch (true) {
      case key === "tie": {
        if (!hasTie) {
          state.tieSourceKey = notation.key;
          return;
        }
        const { notation: tieDesc } = findParagraphAndNotation(notation.tieTo);
        if (tieDesc) {
          tieDesc.tieTo = null;
        }
        notation.tieTo = null;
        break;
      }
      case key === "break-underline":
        notation.breakUnderline = !notation.breakUnderline;
        break;
      case key.startsWith("separator-"): {
        const separator = key.split("-", 2)[1];
        notation.note = separator;
        break;
      }
      default:
        break;
    }
  });

  return (
    // ENHANCE: 分音符类型显示菜单项
    <Menu onClick={handleMenu} style={{ minWidth: "80px" }} mode="vertical">
      {isNote(notation) && (
        <Menu.Item key="break-underline" icon={<StopOutlined />}>
          {notation.breakUnderline
            ? "在此處延續增減時線"
            : "在此處打斷增減時線"}
        </Menu.Item>
      )}
      {isNote(notation) && (
        <Menu.Item
          key="tie"
          icon={<RadiusSettingOutlined />}
          notation={notation}
        >
          {notation.tieTo ? "刪除连音线" : "從此處添加連音線到..."}
        </Menu.Item>
      )}
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        刪除符號
      </Menu.Item>
    </Menu>
  );
};

// ENHANCE: 使用EditableContent组件的overlay属性传入菜单
// 执行选项回调。。
function handleNotationContext(options, key) {
  runInWrappedAction(() => (state.shouldNotationBlurAfterClick = false));
  const callback = options.find((ops) => ops.key === key)?.onClick;
  callback && callback();
}

export { getNotationContextMenu, handleNotationContext };
