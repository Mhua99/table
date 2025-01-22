import Mock from 'mockjs';

const list = [
  {
    id: 1,
    name: '篮球',
  },
  {
    id: 2,
    name: '足球',
  },
  {
    id: 3,
    name: '羽毛球',
  },
  {
    id: 4,
    name: '跑步',
  },
]

export default [
  {
    url: '/api/getDic',
    method: 'get',
    response: () => {
      return Mock.mock({
        'code': 0,
        'message': 'success',
        'data|5-10': [
          {
            id: '@id',
            name: '@name',
            age: '@integer(20, 40)',
          },
        ],
      });
    },
  },
  {
    url: '/api/getDicNew',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 0,
        message: 'success',
        data: list,
      });
    },
  },
];
