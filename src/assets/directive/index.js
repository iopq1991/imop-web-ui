import Vue from 'vue'
import {getStorage, setStorage} from '@/assets/js/utils'
import { Message } from 'element-ui';

Vue.directive('spcode', {
  bind: (el,binding,node) => {
    this.$data = {
      $el:el,
      $node:node,
      $input: null,
      $timer:null,
      focus(e) {
        let searchList = getStorage('spCodeSearchList') || []
        if(e.target.value && !searchList.includes(e.target.value)) {
          searchList.unshift(e.target.value)
          this.createList(searchList)
          setStorage('spCodeSearchList',searchList.slice(0,4))
        }
        this.searchContainer.style.display = 'block'
      },
      blur(e){
        this.$timer = setTimeout(()=>{
          let value = e.target.value.replace(/，/g,',')
          let codeList = value.split(',')
          for(let i = 0 ; i < codeList.length;i++){
            if(codeList[i].length !== 6 && codeList[i]){
              Message({
                message: '企业编号输入不正确',
                type: 'warning'
              });
              this.searchContainer.style.display = 'none'
              break
            }
          }
          this.searchContainer.style.display = 'none'
          clearTimeout(this.$timer)
        },200)
      },
      createList(searchList){
        this.searchContainer.remove()
        this.searchContainer = document.createElement('ul')
        this.searchContainer.innerHTML= searchList.reduce((total, currentValue)=>(total + '<li >'+currentValue+'</li>'),'')
        this.searchContainer.className = 'input_search'
        this.$el.appendChild(this.searchContainer)
        let lis = [...this.searchContainer.children]
        lis.forEach(item=>{
          item.addEventListener('click',()=>{
            this.$node.data.model.callback(item.innerText)
            this.searchContainer.style.display = 'none'
          })
        })
      },
      searchContainer: document.createElement('ul')
    }
  },
  inserted: (el) => {
    let _this = this.$data
    _this.$input = el.querySelector('input[type=text]')
    if (!_this.$input) return
    _this.$input.addEventListener('focus', _this.focus.bind(_this))
    _this.$input.addEventListener('blur', _this.blur.bind(_this))
    let searchList = getStorage('spCodeSearchList') || []
    if(!searchList.length) return
    el.style.position = 'relative'
    _this.createList(searchList)
  },
  unbind: () => {
    let _this = this.$data
    if (!_this.input) return
    _this.searchContainer.innerHTML = ''
    _this.$input.removeEventListener('focus', _this.focus.bind(_this))
    _this.$input.removeEventListener('blur', _this.blur.bind(_this))
    clearTimeout(_this.$timer)
  }
})
