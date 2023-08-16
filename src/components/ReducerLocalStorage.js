
export const reducerLocalStorage = async (state, action) => {
    switch (action.type) {
        case 'SUBMIT': {
            if (action.obj.id === undefined) {
                action.count++
                action.obj['id'] = action.count
                action.setobj({ ...action.obj })
                action.setcount(action.count)
                action.array.push(action.obj)
            }
            else {
                action.array.splice(action.array.findIndex((x) => x.id === action.obj.id), 1, action.obj)
                action.setarray([...action.array])
            }
            action.setarray([...action.array])
            action.setreference(null)
            localStorage.setItem('array', JSON.stringify(action.array))
            localStorage.setItem('count', action.count)
            action.obj = {
                username: '',
                email: '',
                phoneno: '',
                pincode: '',
                gender: '',
                language: []
            }
            action.setobj({ ...action.obj })
            action.reference = ''
            action.setreference(action.reference)
            return state
        }
        case 'DELETE': {
            action.array.splice(action.array.findIndex((x) => x.id === action.id), 1)
            action.setarray([...action.array])
            localStorage.setItem('array', JSON.stringify(action.array))
        }
        case 'EDIT': {
            action.obj = action.array.find(x => x.id === action.id)
            action.setobj({ ...action.obj })
        }
        default: {
            return state
        }
    }
}