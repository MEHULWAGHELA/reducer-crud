import axios from "axios"

/* reducer is one type of functio in which two parameter occur one is state and another is action. in action we get data on which we work and save in state and return that state where we call the reducer */


export const crudReducer = (state, action) => {
    switch (action.type) {
        case 'getData': {
            axios.get('https://student-api.mycodelibraries.com/api/user/get')
                .then((res) => {
                    state = res.data.data
                    setarr([...arr])
                }
                )
                .catch((err) => console.log(err))
            return state
        }
        case 'editData': {
            axios.get("https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=" + id).then((res) => {
                obj = res.data.data
                obj.hobbies = obj.hobbies.split(",")
                setobj({ ...obj })
            }).catch((err) => { console.log(err) })
            return state
        }
        case 'setData': {
            let formdata = new FormData()
            formdata.append('userImage', obj.userImage)
            formdata.append('firstName', obj.firstName)
            formdata.append('lastName', obj.lastName)
            formdata.append('age', obj.age)
            formdata.append('city', obj.city)
            formdata.append('gender', obj.gender)
            formdata.append('hobbies', obj.hobbies)
            for (let x of formdata.entries()) {
                console.log(x)
            }
            axios.post('https://student-api.mycodelibraries.com/api/user/add', formdata)
                .then((res) => {
                    getData()
                }
                )
                .catch((err) => console.log(err))
            return state
        }
        case 'deletData': {
            axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${id}`).then((res) => {
                getData()
            }).catch((err) => {
                console.log(err)
            })
            return state
        }
        case 'updateApi': {
            obj.id = obj._id
            axios.post('https://student-api.mycodelibraries.com/api/user/update', obj).then((res) => {
                getData()
            }).catch((err) => console.log(err))
            return state
        }
        case 'updateApi': {
            if (e.target.name === "hobbies") {
                if (e.target.checked) {
                    obj.hobbies = [...obj.hobbies, e.target.value]
                }
                else {
                    obj.hobbies = obj.hobbies.filter((x) => !x.includes(e.target.value))
                }
            }
            else if (e.target.name === 'userImage') {
                obj[e.target.name] = e.target.files[0]
            }
            else {
                obj[e.target.name] = e.target.value
            }
            setobj({ ...obj })
            return state
        }
        default: {
            return state
        }
    }
}