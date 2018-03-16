/*****************************************************************
*     参数:
*         props：
*            businessId:'1'  //string类型，非必填，业务方调用id
*
*     事件：
*         emit：
*
******************************************************************/

<template>
  <div class="editContact full-ctn">
      <el-form ref="contactForm"  :label-width="labelWidth" :inline="inline" :rules="rules" :model="contactData"  :class="{'isGroupEdit':isGroupEdit}" class="contactForm">
            <div class="white-bg">
                <div class="edit-contact-title">基础信息</div>
                <div class="p-20 text-align">
                  <el-form-item label="头像：" class="uploadAvatar">
                           <div >
                                 <el-upload
                                   v-loading="isUpload"
                                   element-loading-text="上传中..."
                                   class="form-uploader"
                                   :action="upLoadUrl"
                                   :show-file-list="false"
                                   accept="image/jpg,image/png,image/jpeg,image/bmp"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="handleBeforeAvatarUpload">
                                   <img :src="contactData.avatar" v-if="contactData.avatar"></img>
                                   <svg-icon iconClass="contactAvator" className="svg-icon-contactAvator font-s-14" v-if="!contactData.avatar"></svg-icon>
                                 </el-upload>
                           </div>
                  </el-form-item>
                  <el-form-item label="姓名：" prop="name" v-if="!contactHidden.name">
                           <el-input type="" v-model="contactData.name" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="性别：">
                      <el-radio-group v-model="contactData.sex" :style="{'width':itemWidth}">
                          <el-radio :label="3">男</el-radio>
                          <el-radio :label="6">女</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="群组："  prop="orgIdList">
                           <!-- <el-input type="" v-model="contactData.orgIdList" :style="{'width':itemWidth}"></el-input> -->
                           <div @click="handleSelectGroup" class="input-rest-tag contactGroup" :style="{'width':itemWidth}" v-model="contactData.orgIdList">
                                <el-tag type="gray" v-for="item in contactData.orgIdList" :key="item.id" class="member-tag">{{item.name}}</el-tag>
                           </div>
                  </el-form-item>
                  <el-form-item label="出生日期：" prop="birthday" >
                      <el-date-picker
                        v-model="contactData.birthday"
                        type="date"
                        :style="{'width':itemWidth}"
                        placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="标签："  prop="label">
                           <el-input type="" v-model="contactData.label" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="手机："  prop="mobile"  v-if="!contactHidden.name">
                           <el-input type="number" v-model="contactData.mobile" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱："  prop="email">
                           <el-input type="" v-model="contactData.email" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="固定电话："  prop="telephone">
                           <el-input type="" v-model="contactData.telephone" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="微信："  prop="desc">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="APP："  prop="desc">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="钉钉：">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item> -->
              </div>
            </div>
            <div class="white-bg">
                <div class="edit-contact-title">扩展信息</div>
                <div class="p-20">
                  <!-- <el-form-item label="通讯地址：">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="工号：">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item> -->
                  <el-form-item v-for="(item,index) in customData" :label="item.title + '：'" :prop="item.name" :key="item.name">
                       <el-input  v-model="contactData[item.name]" type="item.isRequrieNum?'number':''" :style="{'width':itemWidth}" v-if="item.type=='text'" :maxlength="item.maxlength?item.maxlength:''"></el-input>
                       <el-radio-group v-model="contactData[item.name]" :style="{'width':itemWidth}" v-if="item.type=='radio'">
                           <el-radio :label="val.value" v-for="(val,index) in item.list" :key="val.id">{{val.name}}</el-radio>
                       </el-radio-group>
                       <el-date-picker
                         v-model="contactData[item.name]"
                         type="date"
                         v-if="item.type=='date'"
                         :style="{'width':itemWidth}"
                         placeholder="选择日期">
                       </el-date-picker>
                       <el-checkbox-group v-model="contactData[item.name]" :style="{'width':itemWidth}" v-if="item.type=='checkbox'">
                            <el-checkbox  v-for="(value,inde) in item.list" :key="value.value" :label="value.value">{{value.name}}</el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
                </div>
            </div>
            <!-- <div class="white-bg">
                <div class="edit-contact-title">更多设置</div>
                <div class="p-20">
                  <el-form-item label="通讯方式隐藏：">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                  <el-form-item label="高管模式：">
                           <el-input type="" v-model="contactData.desc" :style="{'width':itemWidth}"></el-input>
                  </el-form-item>
                </div>
            </div> -->
            <div class="text-center white-bg bottomSave"  v-if="!isGroupEdit">
                  <el-button type="primary" >保存并新增下一个</el-button>
                  <el-button type="primary" @click="handleSave('contactForm')">保存</el-button>
                  <!-- <el-button type="primary" plain @click="handleCancel('contactForm')">取消</el-button> -->
            </div>
      </el-form>
      <div class="clearfix p-10 bottomOperate" v-if="isGroupEdit">
            <div class="pull-left">
                 <el-button type="primary" @click="handleSendEmail"  v-if="!bottomBtn.sendEmailVisible">发邮件</el-button>
                 <el-button type="primary" @click="handleSendMessage"  v-if="!bottomBtn.sendMessageVisible">发消息</el-button>
            </div>
            <div class="pull-right">
                <el-button type="primary" @click="handleStick"  v-if="!bottomBtn.stickVisible">置顶</el-button>
                <el-button type="primary" @click="handleSave('contactForm')"  v-if="!bottomBtn.saveVisible">保存</el-button>
                <el-dropdown trigger="click" class="m-l-10" @command="handleCommand"  v-if="!bottomBtn.moreVisible">
                    <span class="el-dropdown-link">
                        <el-button type="primary" >更多</el-button>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">加入群组</el-dropdown-item>
                        <el-dropdown-item command="b" >移动</el-dropdown-item>
                        <el-dropdown-item command="c">移出</el-dropdown-item>
                        <el-dropdown-item command="d">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
      </div>
  </div>
</template>

<script>
import {validateMdn,validateEmail,validateOrgs,validateText} from  '@/assets/js/validateForm.js';

const customData = [
    {name:'address',title:'通讯地址',type:'text',required:true,maxlength:10,isRequrieNum:true},
    {name:'gonghao',title:'工号',type:'text',required:true,maxlength:30,noRequrie:true},
    {name:'sex2',title:'性别',type:'radio',list:[{name:'男',value:'1'},{name:'女',value:'2'}],required:true},
    {name:'position',title:'职位',type:'checkbox',list:[{name:'java',value:'1'},{name:'前端',value:'2'}],required:false},
    {name:'date',title:'日期',type:'date',required:true}
]
const UploadUrl = 'https://jsonplaceholder.typicode.com/posts/';
const saveUrl = '';//保存url
export default {
  components: {},
  data() {
    return {
        contactData:{
            name:'',
            sex:'',
            orgIdList:[],
            birthday:'',
            label:'',
            mobile:'',
            email:'',
            telephone:'',
            avatar:''
        },
        contactHidden:{
            name:false,
            mobile:false
        },
        UploadUrl:UploadUrl,
        customData:[],
        isUpload:false,
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, trigger: 'blur',validator: validateMdn}
          ],
          orgIdList: [
            {type: 'array', required: true, trigger: 'blur',validator: validateOrgs}
          ],
          email: [
            {required: false,validator: validateEmail, trigger: 'blur'}
          ]
        },
    }
  },
  props: {
      businessId: {     //业务方调用id
          type: String,
          default: null
      },
      labelWidth:{
          type: String,
          default: '120px'
      },
      itemWidth:{
          type: String,
          default: '300px'
      },
      inline:{
          type:Boolean,
          default: true
      },
      personData:{        //联系人信息
          type:Object,
          default: () => {}
      },
      isGroupEdit:{
          type:Boolean,
          default: false
      },
      upLoadUrl:{
          type:String,
          default:''
      },
      type:{
          type:String,    //add:新增,edit:编辑
          default:'add'
      },
      bottomBtn:{
          type:Object,    //是否显示底部按钮
          default:() => {
              return {
                sendMessageVisible:false,     //false 按钮显示,true 按钮隐藏,
                sendEmailVisible:false,
                stickVisible:false,
                saveVisible:false,
                moreVisible:false
              }
          }
      }
  },
  methods:{
      handleAvatarSuccess(res, file){
          this.imageUrl = URL.createObjectURL(file);
      },
      handleBeforeAvatarUpload(file){

          var type = file.type?file.type:file.raw.type;
          if(type != 'image/png' && type != 'image/jpg' && type != 'image/jpeg' && type != 'image/bmp' && type != 'image/gif'){
              this.$x.toast({
                  showClose: true,
                  message: '请上传png/jpg/jpeg/bmp格式的图片！',
                  type: 'info'
              });
              return false;
          }else{
              return true;
          }
      },
      handleSendEmail(){  //发邮件
          this.$emit('handleSendEmail');
      },
      handleSendMessage(){  //发消息
          this.$emit('handleSendMessage');
      },
      handleStick(){    //置顶
          this.$emit('handleStick');
      },
      handleSave(formName){     //保存
          let that = this;
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  let params = Object.assign({},that.personData);
                  that.$x.post(saveUrl,params).then(res => {
                      if (res.success) {
                          that.$message({
                              showClose: true,
                              type: 'success',
                              message: res.errorMsg
                          });
                          that.$emit('saveSuccess',[].push(params));
                      } else {
                          that.$message({
                             showClose: true,
                             type: 'error',
                             message: res.errorMsg
                          });
                      }
                  }).catch(res => {

                  })
              } else {
                console.log('error submit!!');
                return false;
              }
          });

      },
      handleCommand(command){
          switch(command){
              case 'a':
                   this.$emit('handleJionGroup');   //加入群组
                   break;
              case 'b':
                   this.$emit('handlePersonMove');    //移动
                   break;
              case 'c':
                   this.$emit('handleShiftOut');      //移出
                   break;
              case 'd':
                   this.$emit('handlePersonDelete');   //删除
                   break;
          }
      },
      handleCancel(formName){
          this.$refs[formName].resetFields()
          this.$emit('handleCancel');   //删除
      },
      handleResetForm(){
          this.$refs['contactForm'].resetFields()   //重置表单
      },
      handleSelectGroup() {
          this.contactData.orgIdList = this.contactData.orgIdList ? this.contactData.orgIdList : []
          this.$emit('handleSelectGroup', this.contactData.orgIdList)    //选择群组
      },
      initData(){
          var that = this;
          customData.forEach(function(item){
              if(item.type == 'checkbox'){
                  that.$set(that.contactData, item.name, [])
              }else{
                  that.$set(that.contactData, item.name, '')
              }
          })
          this.customData = customData || [];
          this.customData.forEach(function(item){
                if(item.required){
                    switch(item.type){
                        case 'text':
                            that.rules[item.name] = {required: true, validator: validateText, trigger: 'blur',isRequrieNum:item.isRequrieNum || '',noRequrieChar:item.noRequrie||'',titleMess:item.title};
                            break;
                        case 'radio':
                            that.rules[item.name] = {required: true, message: `请选择${item.title}`, trigger: 'change'};
                            break;
                        case 'checkbox':
                            that.rules[item.name] = {required: true, message: `请至少选择一项${item.title}`, trigger: 'change'};
                            break;
                        case 'date':
                            that.rules[item.name] = {required: true, message: `请选择${item.title}`, trigger: 'change'};
                            break;
                    }
                }

          })
      }
  },
  mounted(){
      var that = this;
  },
  created(){
      var that = this;
      that.initData();
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/defines.scss";
  .editContact{
        .white-bg{
            background-color: $color-bg-white;
        }
       .edit-contact-title{
           font-size: $font-size;
           font-weight: bold;
           line-height: 42px;
           height: 42px;
           padding-left: 30px;
           position: relative;
           background-color: $addressBook-left-menu;
           border-bottom: 1px solid $tbody-boder-color;
           &:before{
              content:'';
              height:14px;
              width: 2px;
              position: absolute;
              top: 14px;
              left: 20px;
              background-color: $color-primary;
           }
       }
       .uploadAvatar{
            display: block !important;
            height: 110px;
            img,.svg-icon-contactAvator{
               width: 100px !important;
               height: 100px!important;
               color: $color-primary;
            }
       }
       .bottomOperate{
           position: absolute;
           bottom: 0;
           width: 100%;
           background-color:  $color-bg-white;
           border-top: 1px solid $tbody-boder-color;
           z-index: 1;
       }
       .bottomSave{
            padding:0 20px 20px;
       }
       .isGroupEdit{
           padding-bottom: 50px;
       }
       .contactForm{
           height:100%;
           overflow: auto;
           background-color: $color-bg-white;
       }
       .contactGroup{
           padding: 3px 15px;
           min-height: 32px;
           background-color: #fff;
           border-radius: 4px;
           border: 1px solid #eaeaea;
           cursor: pointer;
           // overflow-x: auto;
           .el-tag--small{
               max-width: 100%;
               white-space:normal;
               word-break:break-all;
               word-wrap:break-word;
               min-height: 22px;
               height: auto;
           }
       }
  }

</style>
