import React, { useEffect, useState } from 'react';
import { Avatar, Space, List, Skeleton, Tag, Modal, notification, Button,message  } from 'antd';
import axios from 'axios';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment'; // 时间戳格式化
import { useHistory, useParams } from 'umi';

// trade.state: 订单进度，0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消

const colorList = [
  "gold", // 0 for 已下单待付款
  "cyan", // 1 for 已付款待发货
  "volcano", // 2 for 待收货
  "green", // 3 for 待评价
  "red", // 4 for 退款中
  "gray", // 5 for 已取消
]
const stateList = [
  "待付款", // 0 for 已下单待付款
  "待发货", // 1 for 已付款待发货
  "待收货", // 2 for 待收货
  "待评价", // 3 for 待评价
  "退款中", // 4 for 退款中
  "已取消", // 5 for 已取消
]
const handleList = [
  "付款", // 0 for 已下单待付款
  "催发货", // 1 for 已付款待发货
  "确认收货", // 2 for 待收货
  "去评价", // 3 for 待评价
  "查看进度", // 4 for 退款中
  "-", // 5 for 已取消
]
const cancelList = [
  "取消订单", // 0 for 已下单待付款
  "退款", // 1 for 已付款待发货
  "退款", // 2 for 待收货
  "申诉", // 3 for 待评价
  "取消退款", // 4 for 退款中
  "-", // 5 for 已取消
]
const allClosedStatus = [false, false, false, false, false]

const BoughtAll = () => {
  const [listData, setListData] = useState([]);
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent).id // JSON.parse // .id
  const history = useHistory()
  const [clickId, setClickId] = useState();
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [mergedData, setMergedData] = useState([]);
  const [handlingId, setHandlingId] = useState();
  const [displayPrice, setDisplayPrice] = useState();
  const [isModalOpen1, setIsModalOpen1] = useState(allClosedStatus);
  const [isModalOpen2, setIsModalOpen2] = useState(allClosedStatus);
  const [myBalance, setMyBalance] = useState();

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/trades/?buyerId=${myContent}&_sort=editTime&_order=desc`) // 按时间降序 // desc // state_ne
    const tradesData = res.data
    // setTradesData(res.data)
    // const res2 = await axios.get(`http://localhost:5000/goods/?buyerId=${params.id}&_sort=editTime&_order=desc`) // 按时间降序 // desc // state_ne
    // setTradeData(res2.data)
    // console.log("0",res.data)
    const requests = tradesData && tradesData.map(item => {
      // console.log("item", item)
      return axios.get(`http://localhost:5000/goods/${item.goodId}`)
    });
    axios.all(requests).then(axios.spread((...responses) => { // axios.all // axios.spread // 和这一层可能也有关
      const goodsData = responses.map(response => {
        // console.log("!",response.data)
        return response.data // return
      })
      // setGoodsData(tmp)
      // console.log("tmp",tmp)
      setMergedData(tradesData.map((trade, index) => {
        const good = goodsData[index]
        return {
          ...trade,
          good: good,
        };
      }))
    }))
    const res2 = await axios.get(`http://localhost:5000/users/${myContent}`)
    setMyBalance(res2.data.balance)
  }, []);
  const handleTrade = (itemId, itemState) => { // itemState: 0已下单待付款，1已付款待发货，2待收货，3待评价，4退款中，5已取消
    setHandlingId(itemId)
    setDisplayPrice(mergedData.find(obj => obj.id === itemId).price)
    setIsModalOpen1(prevState => {
      // 使用map方法创建一个新的数组，并在对应id的位置将值设置为true
      return prevState.map((isOpen, index) => {
        if (index === itemState) {
          return true; // 如果当前索引等于id，返回true
        }
        return isOpen; // 否则返回原值
      })
    })
  }
  const handleTrade2 = (itemId, itemState) => {
    setHandlingId(itemId)
    setIsModalOpen2(prevState => {
      // 使用map方法创建一个新的数组，并在对应id的位置将值设置为true
      return prevState.map((isOpen, index) => {
        if (index === itemState) {
          return true; // 如果当前索引等于id，返回true
        }
        return isOpen; // 否则返回原值
      })
    })
  };
  const handleOk01 = async () => {
    if (myBalance < displayPrice) {
      message.info('账户余额不足！')
      return
    } else {
      await axios.patch(`http://localhost:5000/users/${myContent}`, {
        balance: myBalance - displayPrice
      })
      const tradeInfo = mergedData.find(obj => obj.id === handlingId)
      const res = await axios.get(`http://localhost:5000/users/${tradeInfo.sellerId}`)
      const earnMoney = displayPrice - res.data.youfei // 邮费不算赚到的
      await axios.patch(`http://localhost:5000/users/${tradeInfo.sellerId}`, {
        balance: res.data.balance + earnMoney,
        earn: res.data.earn + earnMoney
      })
      await axios.patch(`http://localhost:5000/trades/${handlingId}`, {
        state: 1
      })
      setMergedData(mergedData.map(obj => {
        if (obj.id === handlingId) {
          return { ...obj, state: 1 };
        }
        return obj;
      }));
      notification.open({
        message: '通知',
        description:
          `请到【待发货】查看已支付商品`,
        duration: 2,
        placement: "bottomRight"
      });
      setIsModalOpen1(allClosedStatus);
    }
  };
  const handleCancel = () => {
    setIsModalOpen1(allClosedStatus);
    setIsModalOpen2(allClosedStatus);
  };
  const tradeDetail = (itemId) => {
    history.push(`/orders/${itemId}`)
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={mergedData}
        pagination={{ // 分页
          // onChange: (page) => { console.log(page); },
          pageSize: 6,
        }}
        // loading
        renderItem={(item) => (
          <List.Item
            actions={[
              <a onClick={() => history.push(`/snapshots/${item.id}`)}>查看快照</a>,
              <a onClick={() => { handleTrade(item.id, item.state) }}>{handleList[item.state]}</a>,
              <a style={{ color: "red" }} onClick={() => { handleTrade2(item.id, item.state) }}>{cancelList[item.state]}</a>
            ]}
          >
            <Modal
              title="订单支付"
              open={isModalOpen1[0]}
              closeIcon={false}
              footer={[ // footer
                <Button key='back' onClick={handleCancel}>取消</Button>,
                <Button key='ok' type="primary" onClick={handleOk01}>现在支付</Button>,
              ]}
            >
              <p>待支付金额：{displayPrice} (当前账户余额：{myBalance})</p>
            </Modal>
            <Skeleton avatar title={false} loading={item.good.loading} active>
              <List.Item.Meta
                avatar={<Avatar shape="square" size={96} src={require(`@/images/goods/${item.good.tupian}`)} onClick={() => history.push(`/goods/detail/${item.goodId}`)} style={{ cursor: 'pointer' }} />} // src require @/
                title={<a onClick={() => tradeDetail(item.id)}>订单详情-{item.good.introduction}</a>}
                description={
                  <>
                    <div style={{ color: "red" }}>¥ {item.price}</div>
                    <br />
                    <Space style={{ fontSize: 12 }}>
                      <div>
                        下单时间:{moment(item.orderTime).format('YY/MM/DD HH:mm:ss')}
                      </div>
                      <div>
                        快照时间:{item.editTime && item.editTime !== item.orderTime ? moment(item.editTime).format('YY/MM/DD HH:mm:ss') : "-"}
                      </div>
                    </Space>
                  </>
                }
              />
              <div><Tag color={colorList[item.state]}>{stateList[item.state]}</Tag></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
export default BoughtAll;