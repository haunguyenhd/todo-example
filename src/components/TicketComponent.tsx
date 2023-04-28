import { Card, Checkbox, Form, Input } from "antd";
import React from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useGlobalContext } from "./context/GlobalContext";

type TicketComponentProp = {
  title?: string;
  ticketId: string;
};
const TicketComponent: React.FC<TicketComponentProp> = ({
  title,
  ticketId,
}) => {
  const [openInput, setOpenInput] = React.useState(false);
  const { setListTask, listTask } = useGlobalContext();

  const listTaskFilter = listTask?.filter((task) => task.ticketId === ticketId);
  return (
    <Card
      title={title ? `Ticket : ${title}` : "Ticket"}
      extra={
        <PlusOutlined
          onClick={() => {
            setOpenInput(!openInput);
          }}
        />
      }
      style={{ width: 300, maxHeight: 500, margin: "10px" }}
    >
      {openInput && (
        <Form
          tabIndex={0}
          onFinish={(values) => {
            const { task } = values;
            const record = { ticketId, task, state: false };
            setListTask((prev) => {
              const tempState = prev ? [...prev] : [];
              return [record, ...tempState];
            });
          }}
        >
          {" "}
          <Form.Item
            name="task"
            rules={[
              {
                required: true,
                message: "Please input your task name!",
              },
            ]}
          >
            <Input style={{ margin: "0 0 15px 0" }} />
          </Form.Item>
        </Form>
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {listTaskFilter &&
          listTaskFilter.map((task, index) => (
            <div
              key={index}
              style={{ display: "flex", width: "100%", margin: "5px 0" }}
            >
              <Checkbox
                style={{ width: "100%", margin: 0 }}
                checked={task.state}
                onChange={(e) => {
                  let cloneArray = listTask;

                  const indexElement = cloneArray?.findIndex(
                    (t) => t.task === task.task
                  );

                  if (!cloneArray || indexElement === undefined) {
                    return;
                  }
                  cloneArray[indexElement].state = e.target.checked;

                  setListTask([...cloneArray]);
                }}
              >
                <span
                  style={{
                    textDecorationLine:
                      task.state === false ? "none" : "line-through",
                  }}
                >
                  {task.task}
                </span>
              </Checkbox>
              <CloseOutlined
                onClick={() => {
                  let cloneArray = listTask;

                  const indexElement = cloneArray?.findIndex(
                    (t) => t.task === task.task
                  );

                  if (!cloneArray || indexElement === undefined) {
                    return;
                  }
                  cloneArray.splice(indexElement, 1);

                  setListTask([...cloneArray]);
                }}
              />
            </div>
          ))}
      </div>
    </Card>
  );
};

export default TicketComponent;
