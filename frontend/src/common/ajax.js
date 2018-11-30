import axios from 'axios'
const ajaxplugin = {
  install (Vue, options) {
    Vue.prototype.$post = async (option) => {
      try {
        const {data} = await axios.post(option.url, option.params)
        return data
      } catch (error) {
        console.log(error)
        alert(option.errmsg)
      } finally {
        if (option.msg) alert(option.msg)
      }
    }
  }
}

export default ajaxplugin
