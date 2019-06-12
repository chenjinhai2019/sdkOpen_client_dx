import {
  RECEIVE_BANNERIMGS,
  USER_INFO,
  REMOVE_USER_INFO,
  CERTIFY_STATE,
  CHECK_OEMAPPLICATION,
  GET_LOGO
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
  },

  [CHECK_OEMAPPLICATION](state, { oemApplication }) {
    state.oemApplication = oemApplication
    state.originAppName = oemApplication.appName
    state.originAppPackName = oemApplication.appPackName
    state.originAppVersion = oemApplication.appVersion
  },

  [GET_LOGO](state, { logo }) {
    state.logo = logo;
  }
}
