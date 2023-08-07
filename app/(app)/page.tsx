'use client';
import { getAllAssignmentsInTrip } from '@/api/trips';
import { getUsers } from '@/api/user';
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
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import styles from '../styles.module.css';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const { Header, Sider, Content, Footer } = Layout;

interface DataType {
  key: number;
  name: string;
  email: string;
  address: string;
  gender: string;
  phone: string;
  roleId: string;
  departmentId: string;
  // tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="/user/edit/">{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Role',
    dataIndex: 'roleId',
    key: 'roleId',
  },
  {
    title: 'Department',
    dataIndex: 'departmentId',
    key: 'departmentId',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

export default function Home() {
  const [users, setUsers] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const data = await getAllAssignmentsInTrip(101);
        const data = await getUsers();
        if (data.data && data.data.length > 0) {
          setUsers(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const data: DataType[] = users.map((user: any) => {
    return {
      ...user,
      key: user.id,
      name: user.firstName + ' ' + user.lastName,
      roleId: user.roleId.type.toUpperCase(),
      departmentId: user.departmentId.name,
    };
  });

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
      }}
    >
      <Table columns={columns} dataSource={data} />
    </Content>
  );
}
