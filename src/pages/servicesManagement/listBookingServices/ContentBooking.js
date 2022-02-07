import React, { useEffect, useState, useMemo } from "react";
import { Input, Row, Col, DatePicker, Table, Button } from "antd";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading, selectDataBooking } from "./stores/selectors";
import { getAllListRequest } from "./stores/actions";
import ExportExcel from "../../../components/excel/index";
import generateColumns from "./columns";
import { withTranslation } from "react-i18next";
const { Search } = Input;
const { RangePicker } = DatePicker;
function ContentBooking(props) {
  const getList = {
    search: "",
    startAt: "2020-01-01T07:46:21.543Z",
    endAt: "2022-02-01T07:46:21.543Z",
    paging: {
      pageIndex: 1,
      pageSize: 10,
    },
    sorting: {
      field: "chooseDate",
      order: "desc",
    },
  };
  const { t } = props;
  const { isLoading, selectList } = props;
  const { getAllListRequest } = props;
  const [search, setSearch] = useState(getList);
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();

  useEffect(() => {
    getAllListRequest(search);
  }, [search, getAllListRequest]);

  const onSearch = (value) => {
    setSearch({
      ...search,
      endAt: endAt,
      startAt: startAt,
      search: value,
    });
    getAllListRequest(search);
  };
  const RangePickerValue = (value, dateString) => {
    setStartAt(dateString[0]);
    setEndAt(dateString[1]);
  };
  const onDataChange = (pagination) => {
    const { current, pageSize } = pagination;
    const paging = { pageIndex: current, pageSize };
    setSearch({ ...search, paging });
    console.log(search);
    getAllListRequest({ ...search, paging });
  };
  const newsColumns = useMemo(() =>
    generateColumns({
      search: search,
      t: t,
    })
  );
  return (
    <Row>
      <Col span={24} className="mb-24">
        <Button
          className="mb-20"
          onClick={() => ExportExcel(newsColumns, selectList?.data)}
        >
          {t("DownloadExcel")}
        </Button>
      </Col>
      <Col span={8}>
        <Search placeholder={t("Search")} onSearch={onSearch} enterButton />
      </Col>
      <Col span={8} offset={8}>
        <RangePicker onChange={RangePickerValue} className="fr" />
      </Col>
      <Col span={24} className="mt-24 mb-24">
        <Table
          columns={newsColumns}
          dataSource={selectList?.data}
          loading={isLoading}
          rowKey="id"
          id="table-list"
          onChange={onDataChange}
          pagination={{
            current: selectList?.paging?.pageIndex,
            total: selectList?.paging?.total,
            pageSize: selectList?.paging?.pageSize,
          }}
        />
      </Col>
    </Row>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  selectList: selectDataBooking,
});

const mapDispatchToProps = (dispatch) => ({
  getAllListRequest: (payload) => dispatch(getAllListRequest(payload)),
});

const withConnect = withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ContentBooking)
);

export default compose(withConnect);
