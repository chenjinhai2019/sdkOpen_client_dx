import {
  RECEIVE_BANNERIMGS,
} from './mutation-types'

export default{
  [RECEIVE_BANNERIMGS](state, { bannerImgs }) {
    state.bannerImgs = bannerImgs
  },
}
