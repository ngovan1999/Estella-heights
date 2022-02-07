import React from "react";
import { Form, Input, Button, notification } from "antd";
import { CheckOutlined, WarningOutlined } from "@ant-design/icons";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectLoading } from "../stores/selectors";
import { asyncChangeAccountRequest } from "../stores/actions";
import { useTranslation } from "react-i18next";

function ContentLayout(props) {
  const [form] = Form.useForm();
  const { isLoading } = props;
  const { t, i18n } = useTranslation();
  const { asyncChangeAccountRequest } = props;

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const params = {
      OldPassword: values.oldPassword,
      NewPassword: values.password,
      ConfirmPassword: values.confirm,
    };
    const res = await asyncChangeAccountRequest(params);
    console.log(res);
    if (res.status === 200) {
      notification.open({
        message: "Change password success",
        icon: <CheckOutlined style={{ color: "green" }} />,
      });
    } else {
      notification.open({
        message: "The password is not the same or the old password is wrong",
        icon: <WarningOutlined style={{ color: "red" }} />,
      });
    }
  };
  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item
        name="oldPassword"
        label={t("Old Password")}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Submit")}
        </Button>
      </Form.Item>
    </Form>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
});
const mapDispatchToProps = (dispatch) => ({
  asyncChangeAccountRequest: (payload) =>
    asyncChangeAccountRequest(dispatch)(payload),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ContentLayout);
