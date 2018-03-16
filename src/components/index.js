import Vue from 'vue'
import {
  Message,
  menu,
  submenu,
  menuItem,
  breadcrumb,
  breadcrumbItem,
  dropdown,
  dropdownMenu,
  dropdownItem,
  table,
  form,
  formItem,
  input,
  select,
  option,
  radio,
  col,
  datePicker,
  row,
  checkboxGroup,
  button,
  checkbox,
  radioGroup,
  Switch,
  tableColumn,
  loading,
  tag,
  pagination,
  MessageBox,
  dialog,
  Upload,
  Container,
  Header,
  Aside,
  Main,
  Carousel,
  CarouselItem,
  Tooltip,
  Popover,
  Tabs,
  TabPane
} from 'element-ui';

Vue.use(menu).use(submenu).use(menuItem).use(breadcrumb).use(breadcrumbItem).use(dropdown).use(dropdownMenu).use(dropdownItem).use(table).use(form).use(formItem).use(input).use(select).use(option).use(radio).use(col).use(datePicker).use(col).use(row).use(checkboxGroup).use(button).use(checkbox).use(radioGroup).use(Switch).use(tableColumn).use(tag).use(loading.directive).use(pagination).use(dialog).use(Upload).use(Container).use(Header).use(Aside).use(Main).use(Carousel).use(CarouselItem).use(Tooltip).use(Popover).use(Tabs).use(TabPane);
Vue.prototype.$ELEMENT = { size: 'small'};
Vue.prototype.$loading = loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;

Vue.component('Search', () => import('./Search/Search'))
Vue.component('List', () => import('./List/List'))

