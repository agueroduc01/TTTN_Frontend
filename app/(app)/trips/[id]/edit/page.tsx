'use client';

import { detailTrip } from '@/api/trips';
import { getManagerList } from '@/api/user';
import { TripDetail } from '@/utils/types';
import { DownOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Descriptions,
  Image,
  Layout,
  MenuProps,
  Select,
  Space,
  theme,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Typography from 'antd/es/typography/Typography';
import Title from 'antd/es/typography/Title';
// import Images from '@/utils/mockData';

const { Header, Sider, Content, Footer } = Layout;

const Images = [
  'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/9751463/pexels-photo-9751463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/17476405/pexels-photo-17476405/free-photo-of-green-trees-and-mountain-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const randomImages = Math.floor(Math.random() * 7);

interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  // tags: string[];
}

const EditTrip = ({ params }: { params: { id: number } }) => {
  const [trip, setTrip] = useState<TripDetail>();
  const [managerList, setManagerList] = useState<DataType[]>();
  const [selectedManager, setSelectedManager] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [dateDeparture, setDateDeparture] = useState<string>();
  const [dateReturn, setDateReturn] = useState<string>();

  useEffect(() => {
    getDetailTrip(params.id);
    getManagers();
  }, []);

  useEffect(() => {
    if (trip) {
      const managerFound = managerList?.find(
        (manager) => manager.id === trip.managerId.id
      );
      if (managerFound) {
        setSelectedManager(
          managerFound.firstName + ' ' + managerFound.lastName
        );
      }
    }
  }, [trip, managerList]);

  const getDetailTrip = async (id: number) => {
    try {
      const data = await detailTrip(id);
      if (data.data && data.status === 200) {
        setTrip(data.data);
        setDateDeparture(data.data.departureDate);
        setDateReturn(data.data.returnDate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getManagers = async () => {
    try {
      const data = await getManagerList();
      if (data.data && data.data.length > 0 && data.status === 200) {
        setManagerList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const options =
    managerList &&
    managerList.map((user: any) => {
      return {
        label: user.firstName + ' ' + user.lastName,
        value: user.id,
      };
    });

  const handleChange = (value: string) => {
    setSelectedManager(value);
  };

  return (
    <>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: colorBgContainer,
        }}
        className="grid justify-center items-center relative"
      >
        <div>
          {/* <div className="absolute top-14 left-14">
            <div>
              <Button></Button>
            </div>
          </div> */}
          <div className="text-center">
            <Title level={2} title="Change Business Trip">
              Change Business Trip
            </Title>
          </div>
          <div className="grid grid-flow-col p-20">
            <div className="mr-16 grid grid-flow-row gap-4">
              <label>ID: </label>
              <label>Content: </label>
              <label>Destination: </label>
              <label>Schedule: </label>
              <label>Manager: </label>
              <label>Partner: </label>
            </div>
            <div className="grid grid-flow-row gap-4">
              <h2>{trip?.id}</h2>
              <h2>{trip?.content}</h2>
              <h2>{trip?.destination}</h2>
              <DatePicker.RangePicker
                value={[dayjs(dateDeparture), dayjs(dateReturn)]}
                onChange={(values: any) => {
                  setDateDeparture(values[0]['$d']);
                  setDateReturn(values[1]['$d']);
                }}
                format={'DD/MM/YYYY'}
              />
              <Select
                value={selectedManager}
                style={{ width: 120 }}
                onChange={handleChange}
                options={options}
                className="mb-1"
              />
              <h2>{trip?.partnerId.name}</h2>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default EditTrip;
