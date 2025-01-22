import Mock from 'mockjs'

const tree = [{
  label: '根部门',
  id: '0',
  children: [{
    label: '市场部',
    id: '1',
    children: [{
      label: '市场一部',
      id: '2',
    }, {
      label: '市场二部',
      id: '3',

    }, {
      label: '市场三部',
      id: '4',
    }],
  }, {
    label: '销售部',
    id: '5',
    children: [{
      label: '销售一部',
      id: '6',
    }, {
      label: '销售二部',
      id: '7',
    }],
  }],
}]

export default [
  {
    url: '/api/dic/tree',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 0,
        message: 'success',
        data: tree,
      });
    },
  },
];
