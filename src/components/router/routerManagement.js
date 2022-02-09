import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserManagementPage from "../../pages/userManagement/index";
import NewsManagementPage from "../../pages/newsManagement/index";
import ListBookingServices from "../../pages/servicesManagement/listBookingServices/index";
import SystemsServices from "../../pages/servicesManagement/systemsServices/index";
import AccountManagementPage from "../../pages/account/index";
import ChangePassPage from "../../pages/account/changePassPage";
import IdleTimer from "react-idle-timer";
import HeaderComponent from "../header";
import SiderComponent from "../sider";
import CreateNewsPage from "../../pages/newsManagement/CreateNewsPage";
import EditNewsPages from "../../pages/newsManagement/EditNewsPages";

import { Layout } from "antd";

const { Content } = Layout;

function RouterManagement(props) {
  const navigate = useNavigate();
  const idleTimerRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, []);
  const onIdle = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <>
      <IdleTimer
        ref={idleTimerRef}
        element={document}
        debounce={500}
        timeout={900000}
        onIdle={onIdle}
      />
      <Layout>
        <SiderComponent collapsed={collapsed} />
        <Layout className="site-layout">
          <HeaderComponent collapsed={collapsed} toggle={toggle} />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<UserManagementPage />} />
              <Route path="/news" element={<NewsManagementPage />} />
              <Route path="/news/:id" element={<EditNewsPages />} />
              <Route path="/news/create" element={<CreateNewsPage />} />
              <Route path="/booking" element={<ListBookingServices />} />
              <Route path="/systems" element={<SystemsServices />} />
              <Route path="/account" element={<AccountManagementPage />} />
              <Route path="/pass" element={<ChangePassPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default RouterManagement;
