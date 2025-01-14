import React, { useState, useEffect } from 'react';
import MyList from '../../../components/myList';
import axios from 'axios';
import { useHistory, useParams } from 'umi';
import { Tag } from 'antd';
import MyBack from '../../../components/myBack';

const TagDisplay = () => {
  const paramsInfo = useParams() // 返回一个对象,其中包含URL参数和它们的值
  const [goodsData, setGoodsData] = useState([])
  const [tagData, setTagData] = useState({})
  const history = useHistory()
  useEffect(() => { // https://github.com/nuxt/content/discussions/1420 // https://content.nuxt.com/composables/query-content#wherequery
    /*
    const axiosParams = {
      where: {
        tagList: { $contains: `${paramsInfo.id}` }
      }
    };
    */
    axios.get(`http://localhost:5000/goods?_expand=user`).then( // { params: { "where": { "tagList": { "$contains": `${paramsInfo.id}` } } } }
      res => {
        setGoodsData(res.data.filter(item => {
          return item.tagList.includes(Number(`${paramsInfo.id}`)) // 字符串转数字
        }))
      }
    )
    axios.get(`http://localhost:5000/tags/${paramsInfo.id}`).then(
      res => {
        if(res.data.state===1){
          history.push('/404')
        }
        setTagData(res.data)
      }
    )
  }, [])
  return (
    <div>
      <div>
        <MyBack/>
        <Tag color="gold">{tagData.tagName}</Tag>
        的搜索结果:
      </div>
      <MyList data={goodsData ? goodsData : []} />
    </div>
  )
}
TagDisplay.wrappers = ['@/wrappers/Auth']
export default TagDisplay