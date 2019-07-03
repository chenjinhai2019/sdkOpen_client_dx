import Cookies from 'js-cookie'

export default{
  bannerImgs: [],
  username: '',
  certifyState: '',
  // 应用管理，公版OEM
  oemApplication: {},
  originAppName: '',
  originAppPackName: '',
  originAppVersion: '',
  logo: '',
  startImg: '',
  active: Cookies.get('active') ? parseInt(Cookies.get('active'), 10) : 0,
  active1: Cookies.get('active1') ? parseInt(Cookies.get('active1'), 10) : 0,
  introduceImgs: '',
  useIntroduceImg: false,
}
