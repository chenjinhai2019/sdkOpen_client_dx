import axios from 'axios'
import {
  RECEIVE_BANNERIMGS,
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
}
