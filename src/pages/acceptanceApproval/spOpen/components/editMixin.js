export default {
  props:{
    preview:{type:String,default:''},
    preData:{type:Object,default:()=>({})},
    showBtn:{type:Boolean,default:true}
  },
  watch:{
    preData(data){
      this.formData=Object.assign({},this.formData,data);
    }
  }
}
