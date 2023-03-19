/*
 * @Descripttion: 
 * @Author: lwp
 * @Date: 2023-03-12 17:29:56
 * @LastEditTime: 2023-03-19 22:45:57
 */
import { AxiosRequestConfig } from 'axios'
export interface IResultOr { // 定义interface 规范返回结果的类型
  code: string,
  success: boolean,
  message: string,
  result: any
}

export interface IRoomListParams extends AxiosRequestConfig { // 定义interface 规范返回结果的类型
  pageNo: number,
  pageSize: number,
  cityCode: string,
}

export interface IRoomDetailParams extends AxiosRequestConfig { // 定义interface 规范返回结果的类型
  id: number
}
