import type { AxiosError } from "axios"
import axiosInstance from ".."

interface ErrorMessages {
    [key: string]: string[]
}

interface IErrorResponse {
    error: string
    message: string | ErrorMessages
    request_id: string
}

export type UserData = {
    age: number
    department: string
    gender: string
    hobby: string
    name: string
    photo: string
}

type IGlobalUserResponse = {    
    data: UserData[] | []
} & IErrorResponse

interface IUser {
    body: {
        name: string
        age: number
        gender: string
        hobby: string
        department: string
    }
}

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/trial-test/frontend')
        return response.data as IGlobalUserResponse
    } catch (error) {
        const errors = error as AxiosError<IErrorResponse, any>
        return errors.response?.data as IGlobalUserResponse
    }
}

export const createUser = async (userData: IUser['body']) => {
    try {
        const response = await axiosInstance.post('/api/v1/trial-test/frontend', userData)
        return response.data as IGlobalUserResponse
    } catch (error) {
        const errors = error as AxiosError<IErrorResponse, any>
        console.log(JSON.stringify(errors))
        return errors.response?.data as IGlobalUserResponse
    }
}