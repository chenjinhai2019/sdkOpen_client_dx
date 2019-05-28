import axios from 'axios'
import Cookies from 'js-cookie'
import { Message } from 'element-ui';
import {
  RECEIVE_BANNERIMGS,
  USER_INFO,
  REMOVE_USER_INFO
} from './mutation-types';

export default{
  // 获取banner数据
  getBannerImg({ commit }) {
    axios.get('/bannerList').then((res) => {
      const rs = res.data;
      if (rs.code === 0) {
        const bannerImgs = rs.data;
        commit(RECEIVE_BANNERIMGS, { bannerImgs })
      }
    })
  },

  userInfo({ commit }, username) {
    commit(USER_INFO, { username });
  },

  getUserInfo({ commit }) {
    const username = Cookies.get('username')
    commit(USER_INFO, { username });
  },

  removeUserInfo({ commit }, router) {
    axios.delete('/userinfo/logout').then((res) => {
      if (res.data.success === true) {
        Message({
          message: '退出成功',
          type: 'success'
        });
        Cookies.remove('username')
        commit(REMOVE_USER_INFO)
        router.replace('/login');
      }  
    })
  }
}
