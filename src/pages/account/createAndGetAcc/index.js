import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectDataUser } from "../stores/selectors";
import { asyncCreateUserResident, getAllUserRequest } from "../stores/actions";
import { withTranslation, useTranslation } from "react-i18next";
const { Option } = Select;

function ManageAccount(props) {
  const [visible, setVisible] = useState(false);
  const [formModal] = Form.useForm();

  const { isLoading, dataUser, t } = props;
  const { getAllUserRequest, asyncCreateUserResident } = props;
  const columns = [
    {
      title: "Id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: t("Username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("FullName"),
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: t("PhoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("CreatedAt"),
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  useEffect(() => {
    getAllUserRequest();
  }, []);

  const createPeople = () => {
    formModal.resetFields();

    setVisible(true);
  };

  const onFinish = async (values) => {
    const params = {
      Username: values.Username,
      FullName: values.FullName,
      Email: values.Email,
      PhoneNumber: values.PhoneNumber,
      Address: values.Address,
      Gender: values.Gender,
      RoleId: "Guest",
      RoomId: "T4-3307",
    };
    const res = await asyncCreateUserResident(params);
    if (res.status === 200) {
      getAllUserRequest();
      notification.open({
        message: "Thành công",
        description: "Sai tên đăng nhập hoặc mật khẩu",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    } else {
      notification.open({
        message: "Đăng Nhập sai",
        description: "Sai tên đăng nhập hoặc mật khẩu",
        icon: <CloseOutlined style={{ color: "red" }} />,
      });
    }
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="student">
        <Button type="primary" onClick={createPeople} className="mb-24">
          {t("Create")}
        </Button>
        <Table
          columns={columns}
          dataSource={dataUser.data}
          loading={isLoading}
          rowKey="username"
        />
        <Modal
          title="Edit Student"
          visible={visible}
          onCancel={handleCancel}
          footer={
            <Button type="primary" htmlType="submit" form="formModal">
              Save
            </Button>
          }
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={formModal}
            name="formModal"
            onFinish={onFinish}
          >
            <Form.Item
              name="Username"
              label="User Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="FullName" label="Full Name">
              <Input />
            </Form.Item>
            <Form.Item
              name="PhoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataUser: selectDataUser,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUserRequest: (payload) => dispatch(getAllUserRequest(payload)),
  asyncCreateUserResident: (payload) =>
    asyncCreateUserResident(dispatch)(payload),
});

const withConnect = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ManageAccount)
);
export default compose(withConnect);
