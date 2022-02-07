import { Button, Popconfirm, Space, Tag } from "antd";
export default ({ handleDelete, t, params }) => {
  return [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
      render: (text, record, index) =>
        index +
        1 +
        (params.payload.paging.pageIndex - 1) * params.payload.paging.pageSize,
    },
    {
      title: t("Username"),
      dataIndex: "username",
      key: "username",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      render: (text, record) =>
        text === "Activated" ? (
          <Tag color="#ffa940" key={text}>
            {text}
          </Tag>
        ) : (
          <Tag color="#ffa940" key={text}>
            Not Activated
          </Tag>
        ),
    },
    {
      title: t("FullName"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("DeptAmount"),
      dataIndex: "debtAmount",
      key: "debtAmount",
    },
    {
      title: t("Action"),
      key: "action",

      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.username)}
          >
            <Button type="primary">{t("Delete")}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
