import {
  RECEIVE_BANNERIMGS,
  USER_INFO,
  REMOVE_USER_INFO,
  CERTIFY_STATE,
  CHECK_OEMAPPLICATION,
  GET_LOGO,
  GET_START_IMG,
  GET_INTRODUCE_IMG
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
  },

  [GET_START_IMG](state, { startImg }) {
    state.startImg = startImg;
  }, 

  // 保存当前的步骤
  stepNow(state, { active, active1 }) {
    /* state.active = active;
    state.active1 = active1;
     */
  },

  [GET_INTRODUCE_IMG](state, { introduceImgs, useIntroduceImg }) {
    state.introduceImgs = introduceImgs;
    state.useIntroduceImg = useIntroduceImg;
  }, 
  // 是否开启介绍图片
  useIntroduceImg(state, { useIntroduceImg }) {
    state.useIntroduceImg = useIntroduceImg
  }
}
