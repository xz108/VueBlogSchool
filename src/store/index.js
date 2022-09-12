import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  passage:{
    title:'none',
    posterName:'',
    avatar:'',
    image:'',
  },
  state: {
    username:'游客',
    avatar:'',
    nowPostId:0,
    type:'',
    loginStatus:false
  },
  getters: {
    getUsername: state => state.username,
    getAvatar: state => state.avatar,
    getPostId: state => state.nowPostId,
    getType: state => state.type,
    getLoginStatus: state => state.loginStatus,

    getTitle:passage=>passage.title,
    getPosterName:passage=>passage.posterName,
    getPostAvatar:passage=>passage.avatar,
    getImage:passage=>passage.image
  },
  mutations: {
    setUsername(state,value){
      state.username = value
    },
    setAvatar(state,value){
      state.avatar = value
    },
    setPostId(state,value){
      state.nowPostId = value
    },
    setType(state,value){
      state.type = value
    },
    setTitle(passage,value){
      passage.title = value
    },
    setLoginStatus(state,value){
      state.loginStatus = value
    },
    setPosterName(passage,value){
     passage.posterName=value
    },
    setPosterAvatar(passage,value){
      passage.avatar=value
    },
    setImage(passage,value){
      passage.image=value
    },

  },
  actions: {
  },
  modules: {
  },
  plugins:[
      createPersistedstate({
        key: 'savePostID',
        paths: 'nowPostId'
      },{
        key: 'saveUsername',
        paths: 'username'
      },{
        key: 'saveAvatar',
        paths: 'avatar'
      },{
        key: 'saveType',
        paths: 'type'
      },{
        key: 'saveLoginStatus',
        paths: 'loginStatus'
      })
  ]
})
