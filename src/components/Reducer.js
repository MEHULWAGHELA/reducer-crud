import axios from "axios"

export const crudReducer = async (state, action) => {
    const getData = async () => {
        return await axios.get('https://student-api.mycodelibraries.com/api/user/get')
            .then(async (res) => {
                return res.data.data
            })
            .catch((err) => console.log(err))
    }
    switch (action.type) {
        case 'GET': {
            return await getData()
        }
        case 'ADD': {
            let formdata = new FormData()
            formdata.append('userImage', action.obj.userImage)
            formdata.append('firstName', action.obj.firstName)
            formdata.append('lastName', action.obj.lastName)
            formdata.append('age', action.obj.age)
            formdata.append('city', action.obj.city)
            formdata.append('gender', action.obj.gender)
            formdata.append('hobbies', action.obj.hobbies)
            return await axios.post('https://student-api.mycodelibraries.com/api/user/add', formdata)
                .then(async (res) => {
                    return await getData()
                })
                .catch((err) => console.log(err))
        }
        case 'DELETE': {
            return await axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${action.id}`).then(async (res) => {
                return await getData()
            }).catch((err) => {
                console.log(err)
            })
        }
        case 'EDIT': {
            let obj = await axios.get("https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=" + action.id).then(async (res) => {
                return await res.data.data
            }).catch((err) => { console.log(err) })
            obj.hobbies = await obj.hobbies.split(",")
            return await obj
        }
        default: {
            return state
        }
    }
}