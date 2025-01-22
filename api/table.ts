import Mock from 'mockjs';

const list = Array.from({ length: 85 }).map((item, index) => {
  // 生成 1 到 4 之间的数字数组并打乱顺序
  const numbers = Mock.Random.shuffle([1, 2, 3, 4]);
  // 随机选择部分数字进行拼接
  const randomNumbers = numbers.slice(0, Mock.Random.integer(1, 4)).join(',');
  return {
    id: index + 1,
    name: Mock.Random.cname(),
    age: Mock.Random.integer(20, 40),
    class: '@integer(1, 6)',
    bridthday: Mock.Random.date(),
    fatherName: Mock.Random.cname(),
    montherName: Mock.Random.cname(),
    interest: randomNumbers,
    remark: Mock.Random.cparagraph(),
  }
});

export default [
  {
    url: '/api/table/list',
    method: 'get',
    response: (params) => {
      const { current = 1, pageSize = 10 } = params.query;
      const start = ((current - 1) * Number(pageSize))
      const end = start + Number(pageSize)
      const newList = list.slice(start, end)
      return Mock.mock({
        code: 200,
        message: 'success',
        data: newList,
        total: list.length,
      })
    },
  },
  {
    url: '/api/table',
    method: 'post',
    response: (res) => {
      const last = list.at(-1) || { id: 1 }
      list.unshift(Object.assign({}, res.body.data, { id: last.id + 1 }))
      return Mock.mock({
        code: 0,
        message: 'success',
        data: true,
      });
    },
  },
  {
    url: '/api/table',
    method: 'put',
    response: (res) => {
      const id = res.body.data.id;
      const index = list.findIndex(item => item.id === id);
      list[index] = res.body.data
      return Mock.mock({
        code: 0,
        message: 'success',
        data: true,
      });
    },
  },
  {
    url: '/api/table/:id',
    method: 'delete',
    response: (res) => {
      const id = res.query.id
      const index = list.findIndex(item => item.id === Number(id));
      list.splice(index, 1);
      return Mock.mock({
        code: 0,
        message: 'success',
        data: true,
      });
    },
  },
];
