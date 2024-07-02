import { request_chat } from '@/utils/request'

export const chatinfo = (ID: string) => {
  return request_chat<Back>({
    method: 'get',
    url: '/backend/user/chat',
    data: JSON.stringify({
      ID: ID
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

type Back = [
  [{ sender: 'server', text: '欢迎来带“智游”问答系统！！' }, { sender: 'user', text: '' }]
]
