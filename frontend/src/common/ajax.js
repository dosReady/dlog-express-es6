import axios from 'axios'
const ajaxplugin = {
  install (Vue) {
    Vue.prototype.$post = async (option, callback) => {
      try {
        const {data} = await axios.post(option.url, option.params)
        if (option.msg) alert(option.msg)
        if (callback) callback()
        return data
      } catch (error) {
        console.log(error)
        alert(option.errmsg)
      }
    }
  }
}

export default ajaxplugin
