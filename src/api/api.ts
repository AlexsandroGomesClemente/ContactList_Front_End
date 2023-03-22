import axios from 'axios'

// const HOME: string = 'https://cors-anywhere.herokuapp.com/http://teste-frontend.saperx.com.br/'
 const WORK: string = 'http://teste-frontend.saperx.com.br/'

const httpCommons = axios.create({
    baseURL:  WORK,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
        "Content-Type": "application/json;charset=UTF-8"     
    },
})

export const api = { 
    getAllNumber : async () => {
        const response = await httpCommons.get(`api/schedule`)
        if (response.data.status) {
            return response.data
        }
    },

    getContact: async (id:number) => {
        const response = await httpCommons.get(`api/schedule/${id}`)
        if (response.data.status) {
            return response.data
        }
    },

    newContact: async (data:any) => {
        const response = await httpCommons.post(`api/schedule`, data)
        if (response.status === 200) {
            return response.data
        }
    },

    putContact: async (id:number, data:any) => {
        const response = await httpCommons.put(`api/schedule/${id}`, data)
        if (response.status === 200) {
            return response.data
        }
    },

    deleteContact: async (id:number) => {
        const response = await httpCommons.delete(`api/schedule/${id}`)
        if (response.status === 200) {
            return response.data
        }
    },

}