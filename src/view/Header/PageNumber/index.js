import { observer } from "mobx-react-lite";
import { useRef } from "react";
import EditableContent from "../../../component/EditableContent";
import store from "../../../store/global";
import { wrappedAction } from "../../../store/history";
import Row from "../../Row";
import Text from "../../Text";
const handleChangePageNo = wrappedAction((value) => {
  store.page = value;
});


function PageNumber() {
  const ref = useRef();
  return (
    <Row type="pageno" offsetY={store.canvasHeight - 40}>
      <EditableContent
        ref={ref}
        title="頁碼"
        initialValue={store.page}
        onChange={handleChangePageNo}
      >
        <Text
          editable
          x="50%"
          fontSize="14"
          fill="currentColor"
          textAnchor="middle"
        >
          {store.page}
        </Text>
      </EditableContent>
    </Row>
  );
}

export default observer(PageNumber);
