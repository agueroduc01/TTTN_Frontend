'use client';

import { getTrip } from '@/api/detailTrip';
import { Descriptions, Image, theme } from 'antd';
import { useEffect, useState } from 'react';

interface DataType {
  id: number;
  content: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  managerId: number;
  partnerId: number;
}

const DetailTrip = ({ params }: { params: { id: number } }) => {
  const [trip, setTrip] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getOneTrip();
  }, []);

  const getOneTrip = async () => {
    try {
      const data = await getTrip(params.id);
      if (data.data && data.status === 200) {
        setTrip(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid grid-flow-col">
        <div className="grid-cols-6 text-center mt-8">
          <Image
            alt="image"
            className="rounded-3xl border-[20px] border-slate-200 w-4/5"
            height={'80vh'}
            src="https://images.pexels.com/photos/17476405/pexels-photo-17476405/free-photo-of-green-trees-and-mountain-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <div className="grid-cols-6 text-center">
          {/* <div className="grid grid-flow-col justify-center">
            <Descriptions.Item label="Content">Content</Descriptions.Item>
            <p className="ml-8">this is content</p>
          </div> */}
          <Descriptions
            title="User Info"
            layout="horizontal"
            className="description"
          >
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
};

export default DetailTrip;
