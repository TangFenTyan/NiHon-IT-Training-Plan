import React, { useState, useEffect } from 'react';
import { Input, Space, Select, Cascader, Button, Form, notification, message, Upload } from 'antd';
const { TextArea } = Input;
import axios from 'axios';
import { useHistory } from 'umi';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'umi'; // useParams
import { cityArray } from './../../../components/cityData';

const Modify = () => {
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [selectedValue, setSelectedValue] = useState(true) // 是否允许修改邮费部分
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const history = useHistory()
  // const [api] = notification.useNotification() // antd notification
  const [finishState, setFinishState] = useState()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [DetailData, setDetailData] = useState({});
  const [DizhiData, setDizhiData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/goods/${params.id}`).then( // http://localhost:5000/goods?id={params.id}&_expand=user
      res => {
        setDetailData(res.data)
        setDizhiData(res.data.dizhi)
      }
    )
  }, [])
  const selected = (value) => { // value = zishe / baoyou / ziti
    if (value === "zishe") {
      setSelectedValue(false)
    } else {
      setSelectedValue(true)
    }
  };
  const onFinish = (values) => {
    // console.log(myContent)
    // console.log('Success:', values)
    // console.log(values.tupian.file.name)
    // console.log(values.tupian[0].name)
    if (values.yuanjia < 0 || values.shoujia <= 0 || values.fahuo.fangshi === "zishe" && values.fahuo.youfei <= 0) {
      message.error('请输入正确的价格')
      return
    } else {
      axios.post('http://localhost:5000/goods', {
        // "userId": myContent.id,
        "state": 1, // 0草稿箱，1发布待审核，2已发布，3审核未通过，4修改待审核，5卖家已下架
        // "publishTime": Date.now(),
        "introduction": values.jianjie,
        "yuanjia": values.yuanjia,
        "shoujia": values.shoujia,
        "dizhi": values.dizhi,
        "fahuofangshi": values.fahuo.fangshi,
        "youfei": values.fahuo.youfei,
        // "tupian": values.tupian[0].name, // values.tupian.file.name // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        "editTime": Date.now(),
        // "starList": [],
      }).then(res => {
        history.push('/published/publishing') // /
        notification.open({
          message: `修改成功`,
          description:
            `请到发布页查看`,
          // onClick: () => { console.log('Notification Clicked!'); },
          duration: 2,
          placement: "bottomRight"
        });
      })
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  console.log(DetailData)

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        fangshi: DetailData?DetailData.fahuofangshi:"baoyou",
        youfei: DetailData?DetailData.youfei?DetailData:0:0,
        yuanjia: DetailData?DetailData.yuanjia?DetailData.yuanjia:10:11,
        shoujia: DetailData&&DetailData.shoujia,
        dizhi: myContent.location ? myContent.location : []
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        label="简介"
        name="jianjie"
        rules={[
          {
            required: true,
            message: '请输入商品描述',
          },
        ]}
      >
        <TextArea
          placeholder="请输入商品描述"
          showCount
          // required
          maxLength={500}
          autoSize={{
            minRows: 4,
            maxRows: 4,
          }}
        />
      </Form.Item>

      <Form.Item
        label="地址"
        name="dizhi"
        rules={[
          {
            required: true,
            message: '请选择地址',
          },
        ]}
      >
        <Cascader style={{ width: 200, }} options={cityArray} />
      </Form.Item>

      <Form.Item label="发货方式">
        <Space.Compact>
          <Form.Item
            name={['fahuo', 'fangshi']} // fahuo
            noStyle
          >
            <Select
              style={{
                width: 80,
              }}
              onChange={selected}
              defaultValue={"baoyou"} // Warning: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.
              options={[
                {
                  value: 'zishe',
                  label: '自设',
                },
                {
                  value: 'baoyou',
                  label: '包邮',
                },
                {
                  value: 'ziti',
                  label: '自提',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name={['fahuo', 'youfei']} // fahuo
            noStyle
          >
            <Input style={{ width: '50%' }} prefix="¥" suffix="RMB" type="number" disabled={selectedValue} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="原价"
        name="yuanjia"
      >
        <Input style={{ width: '120px' }} prefix="¥" suffix="RMB" type="number" />
      </Form.Item>

      <Form.Item
        label="售价"
        name="shoujia"
        rules={[
          {
            required: true,
            message: '请输入售价!',
          },
        ]}
      >
        <Input style={{ width: '120px' }} prefix="¥" suffix="RMB" type="number" />
      </Form.Item>

      <Form.Item
        label="商品图片"
        name="tupian"
        rules={[
          {
            required: true,
            message: '请上传商品图片',
          },
        ]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">提交修改</Button>
          <Button >取消</Button>
        </Space>
      </Form.Item>

    </Form>
  );
};
export default Modify;
