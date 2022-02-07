import React, { useState } from "react";
import { Form, Input, Button, Menu, Dropdown, notification, Spin } from "antd";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectUserInfor } from "./stores/selectors";
import * as actions from "../login/stores/actions";
import "./styles.css";
import { withTranslation, useTranslation } from "react-i18next";
import {
  GlobalOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
function LoginPage(props) {
  const { t } = props;
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { selectLoading, selectUserInfor } = props;
  const { loginRequest } = props;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const onFinish = async (values) => {
    const params = {
      Username: values.username, //"admineh",
      Password: values.password, //"Estella1230",
    };
    if (!values.username && !values.password) {
      notification.open({
        message: "Nhập tên với pass đi",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
    } else {
      const data = await loginRequest(params);
      if (data) {
        navigate("/");
        notification.open({
          message: "Đăng Nhập Thành công",
          icon: <CheckOutlined style={{ color: "green" }} />,
        });
      } else {
        notification.open({
          message: "Đăng Nhập sai",
          description: "Sai tên đăng nhập hoặc mật khẩu",
          icon: <CloseOutlined style={{ color: "red" }} />,
        });
      }
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => changeLanguage("en")}>
        <p>English</p>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => changeLanguage("vi")}>
        <p>Việt Nam</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <section className="login-form">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="box">
        <div className="square" style={{ "--i": 0 }}>
          {" "}
        </div>
        <div className="square" style={{ "--i": 1 }}>
          {" "}
        </div>
        <div className="square" style={{ "--i": 2 }}>
          {" "}
        </div>
        <div className="square" style={{ "--i": 3 }}>
          {" "}
        </div>
        <div className="square" style={{ "--i": 4 }}>
          {" "}
        </div>
        <div className="container-login">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="form"
          >
            <div className="change-language">
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <GlobalOutlined className="dropdown" />
              </Dropdown>
            </div>
            <h2>
              <strong>Estella Heights</strong>
            </h2>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              className="inputBox"
            >
              <Input className="input" placeholder={t("Username")} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="inputBox"
            >
              <Input
                type="password"
                className="input"
                placeholder={t("Password")}
              />
            </Form.Item>

            <Form.Item>
              <Button className="submit" htmlType="submit">
                {selectLoading && <Spin />} {t("Login")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  infoUser: selectUserInfor,
});
const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => actions.loginRequest(dispatch)(payload),
});
const login = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);

export default compose(login);
