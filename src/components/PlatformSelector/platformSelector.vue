<template>
  <div class="platformSelector-contianer el-input el-input--small">
    <input :disabled="preview" v-model="platformName" @input="search" @blur="blur" class="el-input__inner"
           @focus="isShow=true" :style="{width:showCity?'49%':'100%'}"/>
    <el-select :disabled="preview" style="width: 48%" v-model="city_id" v-if="showCity" @change="handelChange">
      <el-option v-for="item in citiesOption" :key="item.name" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <div v-show="isShow">
      <div class="platformSelector" v-show="!showSearchTab">
        <div class="platformTab">
          <p class="tip">直接输入可搜索省份(支持汉字/以及首字母)</p>
          <dl v-for="(item ,key) in platformObj" :key="key" class="clearfix">
            <dt>{{key}}</dt>
            <dd>
              <a v-for="subItem in item" :key="subItem.id" :value="subItem.id" @click.stop="selectPlatform(subItem)">
                {{subItem.name}}
              </a>
            </dd>
          </dl>
        </div>
      </div>
      <div class="searchTab" v-show="showSearchTab">
        <ul class="platformslide mCustomScrollbar">
          <template v-if="searchList.length">
            <li v-for="search in searchList" @click.stop="selectPlatform(search)" :key="search.id">
              <span>{{search.name}}</span><span class="fr">{{search.shortName}}</span>
            </li>
          </template>
          <li v-else class="empty">对不起，没有找到 "<span style="color: red">{{platformName}}</span>"</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';
  import {getStorage, setStorage} from '@/assets/js/utils';

  let time = null
  export default {
    name: "platformSelector",
    data() {
      return {
        isShow: false,
        city_id: '',
        platform_id: '',
        platformName: '',
        citiesOption: [],
        showSearchTab: false,
        searchList: [],
      }
    },
    computed: {
      ...mapState('common', ['platformInfo']),
      platformObj() {
        const obj = {};
        this.platformInfo.forEach((platformVo) => {
          const firstCharacter = (platformVo.pinyin || platformVo.shortName).slice(0, 1).toUpperCase();
          if (!obj[firstCharacter]) {
            obj[firstCharacter] = [platformVo];
          } else {
            obj[firstCharacter].push(platformVo);
          }
        });
        const sortObj = {};
        for (let i = 65; i < 91; i++) {
          let key = String.fromCharCode(i);
          if (obj[key]) {
            sortObj[key] = obj[key];
          }
        }
        sortObj['Z'] = sortObj['Z'] || [];
        return sortObj
      }
    },
    props: {
      showCity: {
        type: Boolean,
        default: true
      },
      city: {
        type: [String, Number],
        default: '3301'
      },
      platform: {
        type: [String, Number],
        default: '1'
      },
      preview: {type: Boolean, default: false}
    },
    watch: {
      city(newVal) {
        this.city_id = newVal
      },
      platform(newVal) {
        this.platform_id = newVal
        if (!newVal) {
          return this.platformName = "";
        }
        this.platformName = this.platformInfo.find(item => item.id == newVal)['name'] || ''
      }
    },
    async created() {
      if (!this.platformInfo.length) {
        await this.$store.dispatch('common/getPlatform')
      }
      let platform = this.platform || '1'
      let initPlatform = this.platformInfo.find(item => item.id == platform)
      this.selectPlatform(initPlatform)
    },
    methods: {
      blur() {
        time = setTimeout(() => {
          this.isShow = false;
          clearTimeout(time)
        }, 200)
      },
      selectPlatform(obj) {
        this.platformName = obj.name;
        this.platform_id = obj.id;
        this.$emit('update:platform', this.platform_id);
        if (this.showCity) {
          this.city_id = "";
          this.citiesOption = obj.cities;
          this.handelChange();
        }
      },
      handelChange() {
        this.$emit('update:city', this.city_id)
      },
      search() {
        this.platform_id = "";
        const name = this.platformName.toLowerCase();
        this.showSearchTab = name ? true : false;
        if (!name) return
        this.searchList = this.platformInfo.filter(item => item.name.indexOf(name) !== -1 || item.pinyin.indexOf(name) !== -1)
      }
    },
    beforeDestroy() {
      clearTimeout(time);
    }
  }
</script>

<style rel="stylesheet/scss" scoped lang="scss">
  @mixin tab {
    border: 1px solid #B3CDC0;
    overflow: hidden;
    font-size: 12px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 10;
    background-color: #fff;
  }

  .platformSelector-contianer {
    position: relative;
  }

  .platformSelector {
    width: 325px;
    @include tab;
    p {
      color: #999;
      line-height: 20px;
      padding: 5px;
      margin: 0;
      text-indent: 3px;
      border-bottom: 1px solid #DDD;
    }

    .platformTab dl dt {
      float: left;
      padding-left: 3px;
      color: #3a8fc8;
      text-indent: 5px;
      line-height: 25px;
      font-size: 14px;
      width: 20px;
      font-weight: 700;
    }

    .platformTab dl dd {
      margin-left: 2px;
      float: left;
      width: 300px;
      margin-top: -4px;
    }

    .platformTab dl dd a {
      font-size: 12px;
      padding-left: 5px;
      min-width: 66px;
      line-height: 25px;
      display: inline-block;
      color: #333;
      text-decoration: none;
      &:hover {
        color: #3a8fc8;
      }
    }

  }

  .searchTab {
    width: 250px;
    @include tab;
    li {
      height: 30px;
      padding: 0 10px;
      line-height: 30px;
      &:hover {
        background: #3a8fc8;
        color: #fff;
        cursor: pointer;
      }
      &.empty {
        background: #fff2e8;
        color: #666;
      }
    }
  }
</style>
