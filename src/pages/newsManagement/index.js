import React from "react";
import { Layout } from "antd";
import "./styles.css";
import ContentNews from "./ContentNews";
function NewsManagementPage(props) {
  return (
    <div className="container">
      <h1 className="up-text color-title fs-32 fw-500 mb-50 border-bottom-1">
        News Services
      </h1>
      <ContentNews />
    </div>
  );
}

export default NewsManagementPage;
