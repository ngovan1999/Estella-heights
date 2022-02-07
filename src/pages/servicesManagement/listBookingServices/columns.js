import { Tag } from "antd";
import moment from "moment";

export default ({ search, t }) => {
  return [
    {
      title: "Id",
      render: (text, record, index) =>
        index + 1 + (search.paging.pageIndex - 1) * search.paging.pageSize,
    },
    {
      title: t("ServiceName"),
      dataIndex: "serviceName",
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <>
          {status === "APPROVED" ? (
            <Tag style={{ backgroundColor: "green", color: "white" }}>
              {status.toUpperCase()}
            </Tag>
          ) : (
            <Tag style={{ backgroundColor: "red", color: "white" }}>
              {status.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: t("CreatedBy"),
      dataIndex: "createdBy",
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
    },
    {
      title: t("BookingDate"),
      dataIndex: "chooseDate",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        moment(a.chooseDate, "DD/MM/YYYY") - moment(b.chooseDate, "DD/MM/YYYY"),
    },
    {
      title: t("BookingTime"),
      dataIndex: "bookingTime",
      sorter: (a, b) =>
        Number(a.bookingTime.slice(0, 2)) - Number(b.bookingTime.slice(0, 2)),
    },
  ];
};
