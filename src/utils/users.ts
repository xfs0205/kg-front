import { request_user, request } from '@/utils/request'

// const stores = useTokenStore()
// 登录验证
interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const login = (loginInfo: { number: string; password: string }) => {
  const formData = new FormData()
  formData.append('grant_type', '')
  formData.append('username', loginInfo.number)
  formData.append('password', loginInfo.password)
  formData.append('scope', '')
  formData.append('client_id', '')
  formData.append('client_secret', '')

  // 发送请求
  return request_user<TokenResponse>({
    method: 'post',
    url: '/token', 
    data: formData, 
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


// 注册用户信息
type BackEnroll ={
  "number_phone": "string",
  "username": "string",
  "id": 0,
  "is_active": true
}

export const enroll = (enrollInfo: { phone: any; name: any; password: any; }) => {
  return request_user<BackEnroll>({
    method: 'post',
    url: '/enroll',
    data:{
      number_phone: enrollInfo.phone,
      username: enrollInfo.name,
      hashed_password: enrollInfo.password
    }
  })
}

// 用户信息获取
export const userinfo = () => {
  return request_user<UserBack>({
    method: 'get',
    url: '/backend/user',
    headers: {
        'accept': 'application/json',
      }
  })
}

export const user_head_img = () => {
  return request_user({
    method: 'get',
    url: '/uploadfile/get/head/url',
    headers: {
        'accept': 'application/json',
      }
  })
}

type UserBack = {
    "number_phone": "",
    "username": "",
    "id": 0,
    "is_active": true
  }  


//用户退出
export const logout = (ID: string) => {
  return request({
    method: 'POST',
    url: '/backend/user/logout',
    data: JSON.stringify({
      ID: ID
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
