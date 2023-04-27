import { Button, Form, Input } from "antd";
import React from "react";
import TicketComponent from "./TicketComponent";
import { useGlobalContext } from "./context/GlobalContext";

const DashBoardComponent = () => {
  const { tickets, setTicket } = useGlobalContext();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ color: "red", textTransform: "uppercase" }}>DASHBOARD</h2>
        <Form
          onFinish={(values) => {
            const { ticketName } = values;
            setTicket((prev) => {
              const tempState = prev ? [...prev] : [];
              return [ticketName, ...tempState];
            });
          }}
        >
          <div style={{ display: "flex" }}>
            <Form.Item
              name="ticketName"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
              style={{ maxHeight: "33px", marginRight: "14px" }}
            >
              <Input placeholder="New List" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tickets?.map((ticket, index) => (
          <TicketComponent key={index} ticketId={ticket} />
        ))}
      </div>
    </div>
  );
};

export default DashBoardComponent;
