const addressBook = resolve => require(['./addressBook.vue'], resolve);
const property = resolve => require(['./property.vue'], resolve);
const group = resolve => require(['./group.vue'], resolve);
const importExportList = resolve => require(['./importExportList.vue'], resolve);
export default [
  {
    path: '/addressBook',
    component: addressBook,
    children: [
      {path: '', redirect: 'group'},
      {path: '/addressBook/group', component: group},
      {path: '/addressBook/property', component: property},
      {path: '/addressBook/importExportList', component: importExportList}
    ]
  }
]
