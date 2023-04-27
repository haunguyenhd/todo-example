import React, { useState } from "react";
import {
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Image, MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

type MainLayoutProp = {
  children: JSX.Element;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Item Parent", "sub1", <UserOutlined />, [
    getItem("Item Children", "3"),
    getItem("Item Children", "4"),
    getItem("Item Children", "5"),
  ]),
  getItem("Item Parent", "sub2", <TeamOutlined />, [
    getItem("Item Children", "6"),
    getItem("Item Children", "8"),
    getItem("Item Children", "9"),
  ]),
  getItem("Item Parent", "10", <DesktopOutlined />, [
    getItem("Item Children", "11"),
    getItem("Item Children", "12"),
    getItem("Item Children", "13"),
  ]),
];

const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        //collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        color="white"
        style={{ background: colorBgContainer }}
      >
        <Image
          src="./logo-bitA.png"
          preview={false}
          style={{ textAlign: "center", padding: "20px 10px" }}
        />
        <Menu
          theme={"light"}
          defaultOpenKeys={["sub1"]}
          defaultSelectedKeys={["3"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout" color="">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              float: "right",
            }}
          />
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Hau Nguyen Developer ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
