import { message } from "antd";
import { observer } from "mobx-react-lite";
import EditableContent from "../../../component/EditableContent";
import P from "../../../util/placement";
import store from "../../../store/global";
import { wrappedAction } from "../../../store/history";
import Row from "../../Row";
import Text from "../../Text";

const tones = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "♭C",
  "♭D",
  "♭E",
  "♭F",
  "♭G",
  "♭A",
  "♭B",
].map((t) => ({ key: t, text: t }));

function LeftInfoBlock({ key, showndata }) {
  function getData(){
    if (showndata.includes(0)){
      return 64
    }
    else{
      return 6
    }
  }
  function getData2(){
    if (showndata.includes(0) && showndata.includes(1)){
      return 22
    }
    else{
      return 0
    }
  }
  function getData3(){
    if (showndata.includes(0)){
      return 50
    }
    else if (showndata.includes(1)){
      return 22
    }
    else{
      return 0
    }
  }
  if (store.tonedata[key] == undefined) {
    store.tonedata[key] = 'C';
    store.beatdata[key] = [4, 4]
    store.speeddata[key] = '75'
  }
  var datas = []
  if (showndata.includes(0)) {
    datas.push(<EditableContent
      inputType="select"
      initialValue={store.tonedata[key]}
      options={tones}
      onChange={function (value) { store.tonedata[key] = value; }}
      popoverProps={{ trigger: "click" }}
    >
      <Row
        type="tone"
        editable
        offsetX={0}
        offsetY={0}
      >
        <Text>1 = </Text>
        {store.tonedata[key].startsWith("♭") && (
          <Text x="27" y="-2" fontSize={store.defaultSubFontSize}>
            ♭
          </Text>
        )}

        <Text editable x={store.tonedata[key].startsWith("♭") ? 36 : 29}>
          {store.tonedata[key].at(-1)}
        </Text>
      </Row>
    </EditableContent>)
  }
  if (showndata.includes(1)) {
    datas.push(<EditableContent
      title="節拍："
      inputType="number"
      initialValue={store.beatdata[key].join("/")}
      onChange={function (value) {
        const beat = String(value).split("/");
        if (beat.length !== 2) {
          message.error("請以【*/*】的格式輸入節拍！");
          return false;
        }
        const [c, t] = [parseInt(beat[0], 10), parseInt(beat[1], 10)];
        if (c > 0 && t > 0) {
          store.beatdata[key] = [c, t];
        } else {
          message.error("請輸入大於0的拍數和時值！");
          return false;
        }
      }}
    >
      <Row
        type="beat"
        editable
        offsetX={getData()}
        offsetY={0}
      >
        <Text x="0" y="-8" textAnchor="middle">
          {store.beatdata[key][0]}
        </Text>
        <Text x="0" y="12" textAnchor="middle">
          {store.beatdata[key][1]}
        </Text>
        <line x1="-8" y1="8" x2="8" y2="8" stroke="currentColor" />
      </Row>
    </EditableContent>)
  }
  if (showndata.includes(2)) {
    datas.push(<EditableContent
      title="速度（bps）："
      inputType="number"
      initialValue={store.speeddata[key]}
      onChange={function (value) { store.speeddata[key] = value }}
    >
      <Row
        editable
        type="speed"
        offsetX={getData3()}
        offsetY={getData2()}
      >
        <Text x="2">♩</Text>
        <Text x="16">= {store.speeddata[key]}</Text>
      </Row>
    </EditableContent>)
  }
  console.log(datas)
  console.log(showndata.toString())
  return <>{datas}</>;
}

export default observer(LeftInfoBlock);
