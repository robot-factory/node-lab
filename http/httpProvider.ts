import axios from 'axios'

class HttpProvider {
  timeout: number // timeout setting
  headers: HeaderConfig[] // header config
  token: string = ''
  instance: AxiosInstance

  public PREFIX = '/api/v1'

  public ROUTES = {
    users: '/user',
    stock: '/stock',
    combination: '/combination',
  }

  constructor(timeout?: number, headers?: HeaderConfig[]) {
    this.timeout = timeout || 0
    this.headers = headers || []
    this.instance = this.createAxiosInstance()

    this.instance.interceptors.request.use(
      config => {
        if (this.token !== '') {
          config.headers.token = this.token
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      response => {
        console.log(`response`, response)

        return Promise.resolve(response.data)
      },
      (error: AxiosError) => {
        let err: Error
        console.log('request error:', error, error.response)
        if (error.response) {
          switch (error.response.status) {
            case 404:
              err = new InvalidConnectionError(this.PREFIX)
              break
            case 405:
              err = new ResponseError(error.response.statusText)
              break
            case 500:
              err = new ResponseError(error.response.data.err_msg)
              break
            case 400:
              err = new ResponseError(error.response.data.err_msg)
              break
            default:
              err = new InvalidConnectionError(this.PREFIX)
              break
          }
        } else {
          err = new Error(error.message)
        }
        return Promise.reject(err)
      }
    )
  }

  private createAxiosInstance = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
    this.headers.forEach((header: HeaderConfig) => {
      headers[header.name] = header.value
    })
    return axios.create({
      baseURL: this.PREFIX,
      headers,
      method: 'post',
      timeout: this.timeout,
    })
  }

  setToken = (newToken: string) => {
    this.token = newToken
  }

  get = (url: string, params: string, config = {}) => {
    return this.instance({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  post = (url: string, data: string, config = {}) => {
    return this.instance({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  // wrapped specific api

  getSignMsg = async (address: string) => {
    const data = JSON.stringify({ address })
    const res = ((await this.post('/user/sign_msg', data)) as any) as SignMsgResponse
    if (res.success) {
      return res.data.msg
    }
    throw new Error(`GetSignMsg Error: ${res.err_msg}`)
  }

  sendSignedMsg = async (addr: string, sign: string) => {
    const data = JSON.stringify({ addr, sign })
    const res = await this.post('/user/sign', data) as any as LoginResponse
    if (res.success) {
      return res.data
    }
    throw new Error(`SendSignedMsg Error: ${res.err_msg}`)
  }

  getStockList = async () => {
    const res = await this.get('/stock/list','')
    return res
  }
}