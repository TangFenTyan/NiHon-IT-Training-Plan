import React, { useState, useRef, useEffect } from 'react';
import { Input, Space, Select, Cascader, Button, Form, notification, message, Upload, Card, Image } from 'antd';
const { TextArea } = Input;
import axios from 'axios';
import { useHistory } from 'umi';
import { LoadingOutlined, PlusOutlined, CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useParams } from 'umi'; // useParams
import { cityArray } from './../../../components/cityData';
import MyBack from '../../../components/myBack';

const Modify = () => {
  const [form] = Form.useForm();
  const [selectedValue, setSelectedValue] = useState(true) // 是否允许修改邮费部分
  const tokenContent = localStorage.getItem('token')
  const myContent = tokenContent == '' ? { myContent: '' } : JSON.parse(tokenContent) // JSON.parse
  const history = useHistory()
  // const [api] = notification.useNotification() // antd notification
  const [finishState, setFinishState] = useState()
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const tagValue = Form.useWatch('biaoqian', form)
  // const [tagIdList, setTagIdList] = useState([])
  const formRef = useRef() // useRef // 不同渲染之间无法共享state状态值；采用useRef，作为组件实例的变量，保证获取到的数据肯定是最新的，且ref更改不会re-render
  const params = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [GoodsData, setGoodsData] = useState([]);
  // const [tags, setTags] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/goods/${params.id}`)
      if (res.data.userId !== myContent.id) {
        history.push('/404')
      } else {
        setGoodsData(res.data)
        const tagIdData = res.data.tagList
        // console.log("tagIdData",tagIdData)
        const requests = tagIdData && tagIdData.map(id => { return axios.get(`http://localhost:5000/tags/${id}`) });
        let tmpTags = []
        await axios.all(requests).then(axios.spread((...responses) => {
          tmpTags = responses.map(response => {
            return response.data.tagName
          })
          // setTags(tmp)
        }))
        // console.log("tmp",tmpTags)
        let { introduction, dizhi, fahuofangshi, youfei, yuanjia, shoujia, num } = res.data // 解构出所需数据
        formRef.current.setFieldsValue({ // 预填充默表单认值
          jianjie: introduction,
          biaoqian: `#${tmpTags.join("#")}`, // 每个tag前都添加#
          dizhi: dizhi,
          fahuo: { // fahuo是一个对象，包含fangshi和youfei两个属性
            fangshi: fahuofangshi, // 将fahuofangshi 赋值给fangshi
            youfei: youfei // 将youfei赋值给youfei
          },
          yuanjia: yuanjia,
          shoujia: shoujia,
          num: num
        })
      }
    } catch (error) {
      history.push('/404')
    }
  }, [])
  const selected = (value) => { // value = zishe / baoyou / ziti
    if (value === "zishe") {
      setSelectedValue(false)
    } else {
      setSelectedValue(true)
    }
  };
  const onFinish = async (values) => { // async
    // console.log(values)
    const tagIdList = []
    if (values.yuanjia < 0 || values.shoujia <= 0 || values.fahuo.fangshi === "zishe" && values.fahuo.youfei <= 0) {
      message.error('请输入正确的价格')
      return
    }
    const uniqueTag = Array.from(new Set(values.biaoqian.split('#'))) // 唯一化tagSet
    for (let item of uniqueTag) {
      const res = await axios.get(`http://localhost:5000/tags?tagName=${item}`)
      if (res.data && res.data.length > 0 && item !== "") { // !== ""
        await axios.patch(`http://localhost:5000/tags/${res.data[0].id}`, { tagNum: res.data[0].tagNum + 1 })  // /num // res.data.
        tagIdList.push(res.data[0].id)
      } else if (item !== "") { // !== ""
        await axios.post('http://localhost:5000/tags', { "tagName": item, "tagNum": 1, }) // 新tag // 0=>1
        const res2 = await axios.get(`http://localhost:5000/tags?tagName=${item}`)
        tagIdList.push(res2.data[0].id)
        // console.log(`http://localhost:5000/tags?tagName=${item}`, tagIdList, res2.data[0].id)
      }
    }
    await axios.patch(`http://localhost:5000/goods/${params.id}`, {
      userId: myContent.id,
      state: finishState, // 0草稿箱，1发布待审核，2已发布，3审核未通过，4卖家已下架 // 5已售罄
      // publishTime: GoodsData.publishTime, // 不变
      introduction: values.jianjie,
      yuanjia: values.yuanjia,
      shoujia: values.shoujia,
      dizhi: values.dizhi,
      fahuofangshi: values.fahuo.fangshi ? values.fahuo.fangshi : 'baoyou',
      youfei: values.fahuo.fangshi === 'zishe' ? values.fahuo.youfei : 0,
      tupian: values.tupian ? values.tupian[0].name : GoodsData.tupian, // values.tupian.file.name
      editTime: Date.now(),
      // starList: GoodsData.starList,
      // view: 0,
      tagList: tagIdList,
      num: values.num
    })
    // console.log("final2", tagIdList)
    history.push(finishState === 0 ? '/published/draft' : '/published/publishing')
    notification.open({
      message: `${finishState === 0 ? '暂存' : '发布'}成功`,
      description:
        `请到${finishState === 0 ? '草稿箱' : '发布页'}查看`,
      // onClick: () => { console.log('Notification Clicked!'); },
      duration: 2,
      placement: "bottomRight"
    });
  }
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
  const addTag = () => {
    // console.log("1",tagValue)
    // setTagList([...tagList,tagValue])
    // console.log("2",tagList)

    // console.log(tagValue, tagValue.split('#'))
    const uniqueArr = Array.from(new Set(tagValue.split('#')))
    // console.log(uniqueArr)
  }

  return (
    <div>
      <MyBack />
      {GoodsData.userId === myContent.id && <Form
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
        /*
        initialValues={{
          fangshi: "baoyou",
          youfei: 0,
          yuanjia: 0,
          shoujia: 0,
          dizhi: myContent.location ? myContent.location : []
        }}
        */
        ref={formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
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
          label="标签"
          name="biaoqian"
          rules={[
            {
              required: true,
              message: '请输入商品标签',
            },
          ]}
        >
          <Input
            placeholder="#分隔"
            onPressEnter={() => addTag()}
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
                // defaultValue={"baoyou"} // Warning: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.
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
          rules={[
            {
              pattern: /^(?!0\d)\d+(\.\d*)?$/,
              message: '金额格式不合规范'
            }
          ]}
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
            {
              pattern: /^(?!0\d)\d+(\.\d*)?$/,
              message: '金额格式不合规范'
            }
          ]}
        >
          <Input style={{ width: '120px' }} prefix="¥" suffix="RMB" type="number" />
        </Form.Item>

        <Form.Item
          label="存货数量"
          name="num"
          rules={[
            {
              pattern: /^[1-9]\d*$/,
              message: '数量格式不合规范'
            }
          ]}
        >
          <Input style={{ width: '80px' }} type="number" />
        </Form.Item>

        <Form.Item
          label="修改图片"
          name="tupian"
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
            <Button type="primary" htmlType="submit" onClick={() => setFinishState(1)}>发布</Button>
            <Button htmlType="submit" onClick={() => setFinishState(0)}>存草稿</Button>
          </Space>
        </Form.Item>

      </Form>}
    </div>
  );
};
Modify.wrappers = ['@/wrappers/Auth']
export default Modify;
