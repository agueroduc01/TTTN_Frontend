'use client';
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RocketOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  Button,
  Layout,
  Menu,
  MenuTheme,
  Space,
  Switch,
  Table,
  Tag,
  theme,
} from 'antd';
import { useState } from 'react';
import styles from '../styles.module.css';
import Link from 'next/link';
import { useGlobalContext } from '@/hooks/Context';

const { Header, Sider, Content, Footer } = Layout;

const itemMenu = [
  {
    key: '1',
    icon: <TeamOutlined />,
    label: <Link href="/">USERS</Link>,
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'evidence',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'upload',
  },
  {
    key: '4',
    icon: <PieChartOutlined />,
    label: 'thống kê',
  },
  {
    key: '5',
    icon: <RocketOutlined />,
    label: <Link href="/trips">TRIPS</Link>,
  },
  {
    key: '6',
    icon: <DesktopOutlined />,
    label: 'desktop',
  },
  {
    key: '7',
    icon: <FileOutlined />,
    label: 'file',
  },
];

export default function Template({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { selectedKey, setSelectedKey } = useGlobalContext();
  const [themeMenu, setThemeMenu] = useState<MenuTheme>('dark');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeTheme = (value: boolean) => {
    setThemeMenu(value ? 'dark' : 'light');
  };

  const changeSelectedKeys = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout className="h-[100vh]">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="relative"
        theme={themeMenu}
      >
        <div className="demo-logo-vertical w-4 h-4" />
        <div className="w-full flex justify-center">
          <Switch
            checked={themeMenu === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            className={themeMenu === 'light' ? 'switch' : ''}
          />
        </div>
        <br />
        <br />
        <Menu
          theme={themeMenu}
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => changeSelectedKeys(e)}
          items={itemMenu}
        ></Menu>
        <Button className="absolute bottom-10 left-1/2 -translate-x-1/2" danger>
          Log out
        </Button>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          {selectedKey === '5' && (
            <>
              <Button
                className={`${styles['edit']} mr-4`}
                onClick={() => console.log('hehe')}
              >
                Edit
              </Button>
              <Button
                className={`${styles['delete']} mr-4`}
                onClick={() => console.log('hehe')}
              >
                Delete
              </Button>
            </>
          )}
        </Header>
        {children}
      </Layout>
    </Layout>
  );
}
