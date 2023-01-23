import { DeleteOutlined, EnterOutlined } from "@ant-design/icons";
import { Menu,Modal,Checkbox } from "antd";
import store from "../store/global";
import { createNotation, notations } from "../util/notation";
import { createBeat, createParagraph } from "../util/paragraph";
import { wrappedAction } from "../store/history";

function getParagraphMenuOptions(paragraph) {
  const handleMenu = wrappedAction(({ key }) => {
    switch (key) {
      case "add": {

        const idx = store.paragraphs.findIndex((p) => p.key === paragraph.key);
        const para = createParagraph({
          notations: [

            createNotation({ note: "0" }),
            createNotation({ note: "0" }),
            createNotation({ note: "0" }),
            createNotation({ note: notations.separator }),
          ],
        });
        if (idx !== -1) {
          store.paragraphs.splice(idx + 1, 0, para);
        } else {
          store.paragraphs.push(para);
        }
        break;
      }
      case "addz": {
        var checked = []
        const onChange = (checkedValues) => {
          checked = checkedValues;
        };
        Modal.info({
          title: '添加滑音符號(BETA)',
          content: (
            <Checkbox.Group onChange={onChange}>
              <Checkbox value={0}>調子</Checkbox>
              <Checkbox value={1}>節拍</Checkbox>
              <Checkbox value={2}>速度</Checkbox>
            </Checkbox.Group>
          ),
          onOk() {
            if (checked.length == 0) {
              Modal.error({
                title: '錯誤',
                content: '沒有選擇滑音符號',
              });
            }
            else {
              const para = createParagraph({
                notations: [
                  createBeat({ showndata: checked })
                ],
              });
              store.paragraphs.push(para);
            }
          },
        });
        break;
      }
      case "delete":
        const idx = store.paragraphs.findIndex((p) => p.key === paragraph.key);
        if (idx !== -1) {
          store.paragraphs.splice(idx, 1);
        }
        break;
      default:
        break;
    }
  });

  return (
    <Menu onClick={handleMenu}>
      <Menu.Item key="add" icon={<EnterOutlined />}>
        添加段落
      </Menu.Item>
      <Menu.Item key="addz" icon={<EnterOutlined />}>
        添加滑音符號 (BETA)
      </Menu.Item>
      <Menu.Item danger key="delete" icon={<DeleteOutlined />}>
        刪除段落
      </Menu.Item>
    </Menu>
  );
}

export { getParagraphMenuOptions };
