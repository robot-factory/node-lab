import axios, { AxiosError } from 'axios'
// import { ResponseError, InvalidConnectionError } from '@utils/errors'
import { DEFAULT_TIMEOUT } from 'Globals/constants'

/**
 * header config
 */
export interface HeaderConfig {
  name: string
  value: string
}

const DEFAULT_HEADER = [
  {
    name: 'Content-Type',
    value: 'application/json',
  },
  {
    name: 'Access-Control-Allow-Origin',
    value: '*',
  },
]

const PREFIX = '/api/v1'

export const createAxiosInstance = (
  basehost: string = PREFIX,
  timeout: number = DEFAULT_TIMEOUT,
  headers: HeaderConfig[] = DEFAULT_HEADER
) => {
  headers.forEach((header: HeaderConfig) => {
    headers[header.name] = header.value
  })
  const instance = axios.create({
    baseURL: basehost,
    headers,
    method: 'post',
    timeout,
  })
  const token = window.localStorage.getItem('token')
  instance.interceptors.request.use(
    config => {
      if (token) {
        config.headers.token = token
      }
      return config
    },
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    response => 

       Promise.resolve(response.data)
    ,
    (error: AxiosError) => {
      // let err: Error
      console.log('request error:', error, error.response)
      if (error.response) {
        switch (error.response.status) {
          case 404:
            // err = new InvalidConnectionError(PREFIX)
            break
          case 405:
            // err = new ResponseError(error.response.statusText)
            break
          case 500:
            // err = new ResponseError(error.response.data.err_msg)
            break
          case 400:
            // err = new ResponseError(error.response.data.err_msg)
            break
          default:
            // err = new InvalidConnectionError(PREFIX)
            break
        }
      } else {
        // err = new Error(error.message)
      }
      return Promise.reject("error")
    }
  )
  return instance
}

export const postRequest = (url: string, data?: any, config = {}) => {
  const instance = createAxiosInstance()
  return instance({
    method: 'post',
    url,
    data,
    ...config,
  })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export const getRequest = (url: string, params?: any, config = {}) => {
  const instance = createAxiosInstance()
  return instance({
    method: 'get',
    url,
    params,
    ...config,
  })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}


