'use client';
import { Button, Checkbox, Col, Form, Image, Input, Row } from 'antd';
import { useState } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
import { login } from '@/api/auth';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    try {
      const response = await login('john1@gmail.com', '12345');
      console.log('Success:', values, response.data);
      if (response.data) {
        // Loading
        setLoading((prevState) => {
          return !prevState;
        });

        // Stop loading
        setTimeout(() => {
          setLoading((prevState) => {
            return !prevState;
          });
        }, 6000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <main>
      <Row>
        <Col span={12}>
          <Image
            preview={false}
            alt="image"
            width={'100%'}
            height={'100vh'}
            src="https://images.pexels.com/photos/17476405/pexels-photo-17476405/free-photo-of-green-trees-and-mountain-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Col>
        <Col span={12}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700, marginTop: '30%' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-400"
                loading={loading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </main>
  );
}
