import { Button, Form, Input, InputNumber, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import store from "../../store/global";
import { unwrappedAction, wrappedAction } from "../../store/history";

const ImmediateNumberConfigInput = observer(({ propertyName, ...props }) => {
  const handleChange = unwrappedAction((ev) => {
    const v = Number(ev.target.value) | 0;
    store[propertyName] = v;
  });
  return (
    <Input value={store[propertyName]} onChange={handleChange} {...props} />
  );
});
function ImmediateNumberConfigItem({ propertyName, label, ...props }) {
  return (
    <Form.Item label={label} {...props}>
      <ImmediateNumberConfigInput propertyName={propertyName} />
    </Form.Item>
  );
}

function ConfigModal({ visible, onVisibleChange }) {
  const handleClose = useCallback(() => {
    onVisibleChange?.call(null, false);
  }, [onVisibleChange]);

  return (
    <Modal
      visible={visible}
      title="配置"
      onCancel={handleClose}
      footer={
        <Button key="ok" type="primary" onClick={handleClose}>
          关闭
        </Button>
      }
    >
      <Form labelAlign="right" labelCol={{ span: 4 }}>
        <Form.Item label="画布大小">
          <Input.Group>
            <ImmediateNumberConfigInput
              propertyName="canvasWidth"
              style={{ width: "45%", textAlign: "center" }}
            />

            <Input
              className="site-input-split"
              style={{
                width: "10%",
                borderLeft: 0,
                borderRight: 0,
                textAlign: "center",
                pointerEvents: "none",
              }}
              placeholder="x"
              disabled
            />
            <ImmediateNumberConfigInput
              propertyName="canvasHeight"
              style={{ width: "45%", textAlign: "center" }}
            />
          </Input.Group>
        </Form.Item>
        <ImmediateNumberConfigItem
          label="左右边距"
          propertyName="marginHorizontal"
        />
      </Form>
    </Modal>
  );
}

export default ConfigModal;
