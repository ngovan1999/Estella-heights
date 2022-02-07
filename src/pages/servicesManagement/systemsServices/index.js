import React, { useState, useEffect } from "react";
import {
  Popconfirm,
  notification,
  Layout,
  Table,
  Tag,
  Space,
  Form,
  Button,
  Input,
  Row,
  Col,
  Upload,
  InputNumber,
  message,
  Radio,
  Spin,
} from "antd";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectService } from "./stores/selectors";
import {
  getALLServices,
  asyncCreateServiceRequest,
  deleteSuccess,
} from "./stores/actions";
import {
  UploadOutlined,
  QuestionCircleOutlined,
  LoadingOutlined,
  CheckOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { withTranslation } from "react-i18next";
import Modal from "antd/lib/modal/Modal";

const { Content } = Layout;
function SystemsServices(props) {
  //Translate
  const { t } = props;

  const { Search } = Input;
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const { loading, listService } = props;
  const { getALLServices, asyncCreateServiceRequest, deleteSuccess } = props;
  const [params, setParams] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "createdAt",
      order: "desc",
    },
  });
  //Phan trang
  const columns = [
    {
      title: "Id",
      key: "id",
      render: (text, record, index) =>
        index + 1 + (params.paging.pageIndex - 1) * params.paging.pageSize,
    },
    {
      title: t("ServiceName"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: t("Type"),
      key: "description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (description) => (
        <>
          <Tag style={{ color: "orange" }} key={description}>
            {description}
          </Tag>
        </>
      ),
    },
    {
      title: t("Status"),
      key: "status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <>
          <Tag style={{ color: "blue" }} key={status}>
            {status}
          </Tag>
        </>
      ),
    },

    {
      title: t("Action"),
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            onConfirm={() => handleDelete(record.id)}
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <a>{t("Delete")}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    // const data = await  getALLServices(getList);
    // setTotalPages(data.data.result.paging.total);
    getALLServices(params);
  }, [params, getALLServices]);

  //   const [params, setParams] = useState(getList);
  // // phân trang

  //Xy ly tim kiem
  const onSearch = (values) => {
    setParams({ ...params, search: values });
  };

  //Xu ly create button
  const createService = () => {
    formModal.resetFields();
    setVisible(true);
  };

  //Xu ly Radio button
  const [value, setValue] = React.useState(1);

  const radioOnChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  //Upload file
  const upLoad = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  //Xu ly nut cancel
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    const res = await asyncCreateServiceRequest(values);
    console.log(res);
    if (res.status === 200) {
      notification.open({
        message: "Create success",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
      getALLServices(params);
    } else {
      notification.open({
        message: "Can't create service",
        icon: <WarningOutlined style={{ color: "red" }} />,
      });
    }

    handleCancel();
  };

  const handleDelete = async (id) => {
    const res = await deleteSuccess(id);

    if (res.status === 200) {
      notification.open({
        message: "Delete success",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
      getALLServices(params);
    } else {
      notification.open({
        message: "Can't delete",
        icon: <WarningOutlined style={{ color: "red" }} />,
      });
    }
  };
  const onDataChange = (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current, pageSize };
    setParams({ ...params, paging });
    getALLServices({ ...params, paging });
  };
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <h1>{t("Title")}</h1>

      <hr />
      <br />
      <Row>
        <Col span={6}>
          <Search
            placeholder={t("SearchByServiceName")}
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={16}></Col>
        <Col span={2}>
          <Button type="primary" onClick={createService}>
            {t("Create")}
          </Button>
        </Col>
      </Row>

      {/* Bang bidding du lieu */}
      <Table
        className="tableService"
        columns={columns}
        loading={loading}
        dataSource={listService.data}
        rowKey="id"
        onChange={onDataChange}
        pagination={{
          current: listService?.paging?.pageIndex,
          total: listService?.paging?.total,
          pageSize: listService?.paging?.pageSize,
        }}
      />

      {/* Form create */}
      <Modal
        title="Create Service"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            Submit
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="ImageUrl"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="PhoneNumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="isQr" label="Is QR">
            <Radio.Group onChange={radioOnChange} value={value}>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="capicity" label="Capicity">
            <InputNumber min={1} max={10} />
          </Form.Item>

          <Form.Item name="MmxReorderDate" label="Max Reorder Date">
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item name="minReorderDate" label="Min Reorder Date">
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item name="cancelReorderDate" label="Cancel Reorder Date">
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item name="Rules" label="Information">
            <Upload {...upLoad}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="RulesVN" label="Information VN">
            <Upload {...upLoad}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}

const mapStateProps = createStructuredSelector({
  loading: selectLoading,
  listService: selectService,
});

const mapDispatchToProps = (dispatch) => ({
  getALLServices: (payload) => dispatch(getALLServices(payload)),
  deleteSuccess: (payload) => deleteSuccess(dispatch)(payload),
  asyncCreateServiceRequest: (payload) =>
    asyncCreateServiceRequest(dispatch)(payload),
});

const withConnect = withTranslation()(
  connect(mapStateProps, mapDispatchToProps)(SystemsServices)
);

export default compose(withConnect);
