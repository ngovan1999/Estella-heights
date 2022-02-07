import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import ImageUploader from "react-images-upload";
import "./styles.css";
import { getDetailNews, updateNews } from "../../services/newsService";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "./Editor";
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
function EditNewsPages(props) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [formModal] = Form.useForm();
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  useEffect(() => {
    getDetailNews(id).then((res) => {
      formModal.setFieldsValue({
        title: res.data.result.title,
        tag: res.data.result.tag,
        content: res.data.result.description,
      });
    });
  }, []);

  const onFinish = async (values) => {
    var form = new FormData();
    form.append("file", values.face[0]);
    form.append("title", values.title);
    form.append("description", values.content);
    form.append("tag", values.tag);
    const data = await updateNews(id, form);
    if (data.status === 200) {
      navigation("/news");
      notification.open({
        message: "Edit success",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
    } else {
      notification.open({
        message: "Edit failed",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
    }
  };
  const onDrop = (picture) => {
    setPictures(pictures.concat(picture));
  };
  return (
    <div className="container">
      <h1 className="up-text color-title fs-32 fw-500 mb-50 border-bottom-1">
        News Management
      </h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        form={formModal}
      >
        <Form.Item name="face" label="Image" rules={[{ required: true }]}>
          <ImageUploader
            withIcon={false}
            withPreview={true}
            singleImage={true}
            label=""
            buttonText="Upload Images"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
            maxFileSize={5242880}
            fileSizeError=" file size is too big"
          />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tag" label="Tag" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Editor name="content" editorLoaded={editorLoaded} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditNewsPages;
