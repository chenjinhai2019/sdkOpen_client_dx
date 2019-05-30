import {
  RECEIVE_BANNERIMGS,
  USER_INFO,
  REMOVE_USER_INFO,
  CERTIFY_STATE
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

  [CERTIFY_STATE](state, { certifyState }) {
    state.certifyState = certifyState;
  }
}
