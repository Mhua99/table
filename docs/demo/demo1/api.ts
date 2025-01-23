const list = Array.from({ length: 89 }).map((item, index) => {
  return {
    id: `${index + 1}`,
    name: `name${index + 1}`,
    age: index + 1,
    class: index + 1,
    bridthday: '2020-01-01',
    fatherName: 'cs111111',
    montherName: 'cs22222',
    interest: '1,2',
    remark: 'remark',
  }
});

export interface FormData {
  id?: string
  name?: string
  age?: number
  class?: string
  bridthday?: string
  fatherName?: string
  montherName?: string
  interest?: string
  remark?: string
}

export function getList(params: FormData & { current: number, pageSize: number }) {
  const { current = 1, pageSize = 10 } = params;
  const start = ((current - 1) * Number(pageSize))
  const end = start + Number(pageSize)
  const newList = list.slice(start, end)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: newList,
        total: list.length,
      })
    }, 1000)
  });
}

export function create(data: Required<FormData>) {
  const maxId = Math.max(...list.map(item => Number(item.id))) || 0;
  list.unshift({ ...data, id: `${maxId + 1}` })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data,
      })
    }, 1000)
  });
}

export function update(data: Required<FormData>) {
  const index = list.findIndex(item => item.id === data.id)
  list[index] = { ...data }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data,
      })
    }, 1000)
  });
}

export function remove(id: FormData['id']) {
  const index = list.findIndex(item => item.id === id)
  list.splice(index, 1)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: id,
      })
    }, 1000)
  });
}
