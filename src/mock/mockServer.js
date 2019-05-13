/*
* 使用mockjs提供mock数据接口
* */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/bannerList', { code: 0, data: data.bannerLists });

