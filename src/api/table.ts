import type { CommObj } from '~/types';

import request from './request'

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

export function getList(params: FormData & CommObj) {
  return request.get('/api/table/list', { params })
}

export function create(data: FormData) {
  return request.post('/api/table', { data })
}

export function update(data: FormData) {
  return request.put('/api/table', { data })
}

export function remove(id: FormData['id']) {
  return request.delete(`/api/table/${id}`)
}
