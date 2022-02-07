import React from "react";

import "./styles.css";
import ManageAccount from "./createAndGetAcc";
function AccountManagementPage(props) {
  return (
    <div className="container">
      <ManageAccount />
    </div>
  );
}

export default AccountManagementPage;
