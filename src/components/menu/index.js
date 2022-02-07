import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  SecurityScanFilled,
  CaretUpFilled,
  SettingFilled,
} from "@ant-design/icons";
import { NavLink, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles.css";

const { SubMenu } = Menu;
function MenuComponent(props) {
  const { t, i18n } = useTranslation();
  const { collapsed } = props;

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={useMatch("/") && "1"}>
      <Menu.Item key="1">
        <NavLink to="/">
          <UserOutlined />
          {!collapsed && t("User")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/news">
          <CaretUpFilled />
          {!collapsed && t("News")}
        </NavLink>
      </Menu.Item>

      <SubMenu key="sub1" icon={<SettingFilled />} title={t("Services")}>
        <Menu.Item key="5">
          <NavLink to="/booking">{t("ListBooking")}</NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/systems">{t("System")}</NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="4">
        <NavLink to="/account">
          <SecurityScanFilled />
          {!collapsed && t("Account")}
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuComponent;
