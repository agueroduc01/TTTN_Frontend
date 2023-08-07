'use client';

import { getAllAssignmentsInTrip } from '@/api/trips';
import { Layout, Table, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Header, Sider, Content, Footer } = Layout;

interface DataType {
  key: number;
  expectedResult: string;
  task: string;
  contentTrip: string;
  // managerId: {
  //   id: number;
  //   email: string;
  //   firstName: string;
  //   lastName: string;
  //   address: string;
  //   gender: string;
  //   phoneNumber: string;
  //   departmentId: number;
  //   // password: 123456,
  //   roleId: string;
  //   created_at: string;
  //   updated_at: string;
  // };
  managerId: number;
  employeeId: number;
  tripId: number;
  // tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Content',
    dataIndex: 'contentTrip',
    key: 'contentTrip',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
  },
  {
    title: 'Expected Result',
    dataIndex: 'expectedResult',
    key: 'expectedResult',
  },
  {
    title: "Employee's Name",
    dataIndex: 'employeeId',
    key: 'employeeId',
    render: (key) => (
      <Link href={`/user/${key.id}`}>{key.firstName + ' ' + key.lastName}</Link>
    ),
  },
  {
    title: 'TripId',
    dataIndex: 'tripId',
    key: 'tripId',
    render: (key) => <Link href={`/trips/${key}`}>{key}</Link>,
  },
  {
    title: "Manager's Name",
    dataIndex: 'managerId',
    key: 'managerId',
    render: (key) => (
      <Link href={`/user/${key.id}`}>{key.firstName + ' ' + key.lastName}</Link>
    ),
  },
];

const Assignment = ({ params }: { params: { id: number } }) => {
  const [assignments, setAssignments] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const data = await getAllAssignmentsInTrip(params.id);
      if (data.data && data.data.length > 0 && data.status === 200) {
        setAssignments(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = assignments.map((assignment: any) => {
    return {
      ...assignment,
      key: assignment.id,
      contentTrip: assignment.tripId.content,
      managerId: assignment.tripId.managerId,
      tripId: assignment.tripId.id,
      employeeId: assignment.employeeId,
    };
  });

  return (
    <>
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
    </>
  );
};

export default Assignment;
