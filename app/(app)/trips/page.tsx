'use client';

import { getTrips } from '@/api/trips';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Layout, Space, theme } from 'antd';
import Link from 'next/link';

const { Header, Sider, Content, Footer } = Layout;

interface DataType {
  key: number;
  content: string;
  departureDate: string;
  destination: string;
  returnDate: string;
  managerId: number;
  partnerId: number;
  // tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
    render: (key) => <Link href={`/trips/${key}/assignment`}>{key}</Link>,
    // render: (key) => <Link href={`/trips/${key}`}>{key}</Link>,
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'destination',
  },
  {
    title: 'DepartureDate',
    dataIndex: 'departureDate',
    key: 'departureDate',
  },
  {
    title: 'ReturnDate',
    dataIndex: 'returnDate',
    key: 'returnDate',
  },
  {
    title: "Manager's Name",
    dataIndex: 'managerId',
    key: 'managerId',
    render: (manager) => <a>{manager}</a>,
  },
  {
    title: 'PartnerId',
    dataIndex: 'partnerId',
    key: 'partnerId',
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
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`trips/${record.key}/edit`}>Invite {record.content}</Link>,
        <a>Delete</a>
      </Space>
    ),
  },
];

const Trip = () => {
  const [trips, setTrips] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const data = await getTrips();
      if (data.data && data.status === 200) {
        setTrips(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const data = trips.map((trip: any) => {
    return {
      ...trip,
      key: trip.id,
      managerId: trip.managerId.firstName + ' ' + trip.managerId.lastName,
      partnerId: trip.partnerId.id,
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
};

export default Trip;
