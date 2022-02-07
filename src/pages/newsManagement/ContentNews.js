import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Button, Table, Input, notification } from "antd";
import generateColumns from "./columns";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectDataNews } from "./stores/selectors";
import { getAllNews } from "./stores/actions";
import { deleteNews } from "../../services/newsService";
import { CheckOutlined, SlackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
const { Search } = Input;

function ContentNews(props) {
  const { loading, dataNews, t } = props;
  const { getAllNews } = props;
  const navigation = useNavigate();

  const [params, setParams] = useState({
    search: "",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      order: "desc",
    },
  });

  useEffect(() => {
    getAllNews(params);
  }, [params, getAllNews]);

  const onSearch = (value) => {
    setParams({ ...params, search: value });
  };

  const handleDelete = async (id) => {
    const res = await deleteNews(id);
    if (res.status === 200) {
      getAllNews(params);
      notification.open({
        message: "Xóa thành công",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
    } else {
      notification.open({
        message: "xóa thất bại",
        icon: <CheckOutlined style={{ color: "red" }} />,
      });
    }
  };

  const editNews = (id) => {
    navigation(`/news/${id}`);
  };

  const onDataChange = (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current, pageSize };
    setParams({ ...params, paging });
    console.log(params);
    getAllNews({ ...params, paging });
  };
  const newsColumns = useMemo(
    () =>
      generateColumns({
        delteSt: handleDelete,
        params: params,
        edit: editNews,
        t: t,
      }),
    [handleDelete, editNews]
  );

  const handleCreate = () => {
    navigation("/news/create");
  };
  return (
    <div>
      <Row>
        <Col span={24} className="mb-24"></Col>
        <Col span={8}>
          <Search placeholder={t("Search")} onSearch={onSearch} enterButton />
        </Col>
        <Col span={8} offset={8}>
          <Button className="fr bg-blue color-white" onClick={handleCreate}>
            <SlackOutlined /> {t("Create")}
          </Button>
        </Col>
        <Col span={24} className="mt-24 mb-24">
          <Table
            dataSource={dataNews.data}
            columns={newsColumns}
            loading={loading}
            onChange={onDataChange}
            rowKey="id"
            pagination={{
              current: dataNews?.paging?.pageIndex,
              total: dataNews?.paging?.total,
              pageSize: dataNews?.paging?.pageSize,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  dataNews: selectDataNews,
});

const mapDispatchToProps = (dispatch) => ({
  getAllNews: (payload) => dispatch(getAllNews(payload)),
});

const withConnect = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ContentNews)
);

export default compose(withConnect);
