import React from "react";
import MenuComponent from "../menu";
import { Layout } from "antd";
import logo from "../../assets/image/logo/logo.png";
import "./styles.css";
import { NavLink } from "react-router-dom";
const { Sider } = Layout;
function SiderComponent(props) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      style={{ minHeight: "100vh" }}
    >
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="" />
          {!props.collapsed && <p className="fs-20">Estella Height</p>}
        </NavLink>
      </div>
      <MenuComponent collapsed={props.collapsed} />
    </Sider>
  );
}

export default SiderComponent;
