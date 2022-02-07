import React from "react";
import { Layout, Menu, Dropdown, Button, Avatar, Spin } from "antd";
import "./styles.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

function HeaderComponent(props) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const menu1 = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to="/pass">{t("ChangePassword")}</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={handleLogout}>{t("Logout")}</div>
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => changeLanguage("vi")}>
        <div>Viet Nam</div>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeLanguage("en")}>
        <div>English</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background center" style={{ padding: 0 }}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger fs-20 ml-16 mt-20 ",
          onClick: props.toggle,
        }
      )}
      <div
        className="header-right mb-20"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Dropdown
          overlay={menu1}
          placement="bottomLeft"
          className="border"
          arrow
        >
          <Button
            style={{ display: "flex", alignItems: "center" }}
            className="mt-20"
          >
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <p className="mb-0 ml-8">{sessionStorage.getItem("username")}</p>
          </Button>
        </Dropdown>
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          className="border"
          arrow
        >
          <Button
            style={{ display: "flex", alignItems: "center" }}
            className="mt-20"
          >
            <Avatar icon={<GlobalOutlined />} />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
}

export default HeaderComponent;
