import axios from 'axios'
import Cookies from 'js-cookie'
import { Message } from 'element-ui';
import {
  RECEIVE_BANNERIMGS,
  USER_INFO,
  REMOVE_USER_INFO,
  CHECK_OEMAPPLICATION,
  GET_LOGO
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

  userInfo({ commit }, userInfo) {
    commit(USER_INFO, { userInfo });
  },

  getUserInfo({ commit }) {
    const user = Cookies.get('username');
    const userInfo = {
      user,
    }
    commit(USER_INFO, { userInfo });
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
  },

  // 检查账号是否拥有OEM应用
  checkOemApplication({ commit }) {
    axios.get('/userinfo/checkOemApplication').then((res) => {
      if (res.data.success === true) {
        const oemApplication = res.data.data.oemApplication;
        console.log(oemApplication);
        commit(CHECK_OEMAPPLICATION, { oemApplication });
      }
    })
  },

  // 获取logo
  getLogo({ commit }) {
    axios.get('/oemApplication/ui/logo').then((res) => {
      if (res.data.success === true) {
        const logo = res.data.data.logo;
        commit(GET_LOGO, { logo });
      }
    })
  }
}
