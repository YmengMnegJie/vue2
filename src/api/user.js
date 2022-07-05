import request from '../utils/request'

export const login = (model) =>
  request.post(
    'login',
    `username=${model.username}&password=${model.password}&code=${model.code}&token=${model.token}`
  )

export const captcha = () => request.get('captcha')
