import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Tabs,
  Form,
  Radio,
  notification,
} from "antd";
import { CheckOutlined, WarningOutlined } from "@ant-design/icons";
import generateColumns from "./columns";

import Modal from "antd/lib/modal/Modal";
import { withTranslation } from "react-i18next";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { selectLoading, selectDataAccountManager } from "./stores/selectors";
import {
  getAllAcountUser,
  deleteUserSuccess,
  asyncCreateUserRequest,
} from "./stores/actions";
import "./styles.css";
import { compose } from "redux";
const { TabPane } = Tabs;
function UserManagementPage(props) {
  //khai bao
  const {
    t,
    dataUserAcount,
    getAllAcountUser,
    loading,
    deleteUserSuccess,
    asyncCreateUserRequest,
  } = props;

  const paramsDefault = {
    url: "All",
    payload: {
      search: "",
      paging: {
        pageIndex: 1,
        pageSize: 10,
      },
      sorting: {
        field: "username",
        order: "desc",
      },
    },
  };
  const [params, setParams] = useState(paramsDefault);
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    getAllAcountUser(params);
  }, [getAllAcountUser, params]);

  const changePage = (page) => {
    const payload = {
      ...params.payload,
      paging: { pageIndex: page, pageSize: 10 },
    };
    setParams({
      ...params,
      payload,
    });
  };

  const searchTable = () => {
    const payload = { ...params.payload, search: valueSearch };
    getAllAcountUser({ ...params, payload });
  };

  const changeTab = (key) => {
    setParams({ ...paramsDefault, url: key });
  };

  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  //Xu ly create button
  const createUser = () => {
    formModal.resetFields();
    setVisible(true);
  };

  //Xu ly Radio button
  const [value, setValue] = useState(1);
  const radioOnChange = (e) => {
    setValue(e.target.value);
  };
  //Xu ly nut cancel
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    const res = await asyncCreateUserRequest(values);
    if (res.status === 200) {
      notification.open({
        message: "Create success",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
      getAllAcountUser(params);
    } else {
      notification.open({
        message: "Can't create user",
        icon: <WarningOutlined style={{ color: "red" }} />,
      });
    }
    handleCancel();
  };

  const handleDelete = async (name) => {
    const res = await deleteUserSuccess(name);
    if (res.status === 200) {
      notification.open({
        message: "Delete success",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
      getAllAcountUser(params);
    } else {
      notification.open({
        message: "Can't delete",
        icon: <WarningOutlined style={{ color: "red" }} />,
      });
    }
  };

  const newsColumns = useMemo(
    () =>
      generateColumns({
        handleDelete: handleDelete,
        params: params,
        t: t,
      }),
    [handleDelete]
  );
  return (
    <>
      <h1>{t("TitleUserPage")}</h1>
      <hr />
      <br />
      <Row>
        <Col span={8}>
          <Form.Item name="search" label={t("SearchUser")}>
            <Input onChange={(e) => setValueSearch(e.target.value)} />
          </Form.Item>
          <Button type="primary" onClick={searchTable}>
            {t("SearchByUserName")}
          </Button>
        </Col>
        <Col span={12}></Col>
        <Col span={4}>
          <Button type="primary" onClick={createUser}>
            {t("CreateUser")}
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="All" onChange={changeTab}>
        <TabPane tab={t("All")} key="All"></TabPane>
        <TabPane tab={t("Resident")} key="Resident"></TabPane>
        <TabPane tab={t("Tenant")} key="Tenant"></TabPane>
        <TabPane tab={t("Admin")} key="Admin"></TabPane>
        <TabPane tab={t("Reception")} key="Reception"></TabPane>
        <TabPane tab={t("Accountant")} key="Accountant"></TabPane>
        <TabPane tab={t("Security")} key="Security"></TabPane>
        <TabPane tab={t("Guest")} key="Guest"></TabPane>
      </Tabs>
      <Table
        columns={newsColumns}
        rowKey="username"
        dataSource={dataUserAcount.data}
        pagination={{
          total: dataUserAcount?.paging?.total,
          onChange: (page) => changePage(page),
        }}
        loading={loading}
      />
      <Modal
        title="Create Service"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            {t("Submit")}
          </Button>
        }
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={formModal}
          name="formModal"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="User Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="FullName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input suffix=".com" />
          </Form.Item>

          <Form.Item name="phoneNumber" label="Phone Number">
            <Input addonBefore="+84" />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Radio.Group onChange={radioOnChange} value={value}>
              <Radio value="MALE">Male</Radio>
              <Radio value="FEMALE">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="rooms" label="Rooms">
            <Input />
          </Form.Item>

          <Form.Item name="roles" label="Roles">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  dataUserAcount: selectDataAccountManager,
});

const mapDispatchToProps = (dispatch) => ({
  getAllAcountUser: (payload) => dispatch(getAllAcountUser(payload)),
  deleteUserSuccess: (payload) => deleteUserSuccess(dispatch)(payload),
  asyncCreateUserRequest: (payload) =>
    asyncCreateUserRequest(dispatch)(payload),
});

const userManager = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)
);

export default compose(userManager);
