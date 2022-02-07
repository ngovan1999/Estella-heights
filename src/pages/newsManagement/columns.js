import moment from "moment";
import { Popconfirm, Space, Button } from "antd";
import { t } from "i18next";

export default ({ delteSt, params, edit }) => {
  return [
    {
      title: "Id",
      key: "id",
      render: (text, record, index) =>
        index + 1 + (params.paging.pageIndex - 1) * params.paging.pageSize,
    },
    {
      title: t("TitleNew"),
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: t("Tag"),
      dataIndex: "tag",
      key: "tag",
      sorter: (a, b) => a.tag.localeCompare(b.tag),
    },
    {
      title: t("CreatedAt"),
      dataIndex: "_createdAt",
      key: "_createdAt",

      sorter: (a, b) => a._createdAt.localeCompare(b._createdAt),
    },
    {
      title: t("CreatedBy"),
      dataIndex: "createdBy",
      key: "createdBy",

      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
    },
    {
      title: t("Action"),
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record.id)}>Edit</Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => delteSt(record.id)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
