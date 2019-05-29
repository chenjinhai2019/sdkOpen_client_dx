import {
  RECEIVE_BANNERIMGS,
  USER_INFO,
  REMOVE_USER_INFO,
} from './mutation-types'

export default{
  [RECEIVE_BANNERIMGS](state, { bannerImgs }) {
    state.bannerImgs = bannerImgs
  },

  [USER_INFO](state, { userInfo }) {
    state.username = userInfo.user;
  },

  [REMOVE_USER_INFO](state) {
    state.username = ''
  },
}
