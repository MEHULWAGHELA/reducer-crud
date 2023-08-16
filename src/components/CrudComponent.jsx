import React, { useEffect, useReducer, useRef, useState } from 'react'
import axios from 'axios'
import { Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { crudReducer } from './Reducer'
const CrudComponent = () => {
    let [state, dispatch] = useReducer(crudReducer, [])
    let [arr, setarr] = useState([])
    let [obj, setobj] = useState({ hobbies: '' })
    let reference = useRef()

    const setData = () => {
        dispatch({ type: 'ADD', obj: obj })
    }
    const getData = async () => {
        // if (typeof await state === 'object') {
        //     console.log(await state)
        // }
        // else {
        // }
        if (typeof await state === 'object') {
            setarr([... await state])
        }
        else {
            console.log(await state)
        }
    }
    useEffect(() => {
        getData()
    }, [state])

    useEffect(() => {
        dispatch({ type: 'GET' })
    }, [])

    const deleteapi = (id) => {
        dispatch({ type: 'DELETE', id: id })
    }

    const editFunction = (id) => {
        dispatch({ type: 'EDIT', id: id, obj: obj })
    }

    const updateapi = () => {
        obj.id = obj._id
        axios.post('https://student-api.mycodelibraries.com/api/user/update', obj).then((res) => {
            // getData()
        }).catch((err) => console.log(err))
    }

    const changeData = (e) => {
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
    }

    const submitFunction = (e) => {
        e.preventDefault();
        if (obj._id === undefined) {
            setData()
        }
        else {
            updateapi()
        }
        obj = { hobbies: '' }
        setobj({ ...obj })
        reference.current.value = ''
    }
    return (
        <div>
            <Row>
                <Col xs={6} className="offset-3">
                    <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">

                        <h1 className="text-center py-3">Student Form</h1>
                        <Form onSubmit={(e) => { submitFunction(e) }}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName" className="fw-600">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.firstName || ''}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName" className="fw-600 ">
                                            last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.lastName || ''}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="age" className="fw-600 ">
                                            Age
                                        </Label>
                                        <Input
                                            id="age"
                                            name="age"
                                            placeholder=""
                                            type="number"
                                            className="main"
                                            onChange={changeData}
                                            value={obj.age || ''}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="city" className="fw-600 ">
                                            City
                                        </Label>
                                        <select onChange={changeData} value={obj.city || ''} name="city" className="form-select">
                                            <option value="surat">Surat</option>
                                            <option value="bharuch">Bharuch</option>
                                            <option value="vadodara">Vadoadara</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <Label for="example" className="fw-600 ">
                                        Gender
                                    </Label>
                                    <div className="d-flex">
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                onChange={changeData}
                                                value="Male"
                                                checked={obj.gender === "Male" || obj.gender === "male"}
                                            />
                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Male
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                onChange={changeData}
                                                value="Female"
                                                checked={obj.gender === "Female" || obj.gender === "female"}
                                            />

                                            <Label
                                                check
                                                for="radio"
                                                className="px-2"
                                            >
                                                Female
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={12} className="">
                                    <Label
                                        check
                                        for="example"
                                        className="fw-600 
                                my-2"
                                    >
                                        hobbies
                                    </Label>
                                    <Row className="">
                                        <Col xs={3}>
                                            <Input
                                                id="Travelling"
                                                name="hobbies"
                                                type="checkbox"
                                                className="language me-2"
                                                onChange={changeData}
                                                value="Travelling"
                                                checked={obj.hobbies?.includes('Travelling')}
                                            />
                                            <Label
                                                check
                                                for="Travelling"
                                                className="px-2"
                                            >
                                                Travelling
                                            </Label>
                                        </Col>
                                        <Col xs={3}>
                                            <Input
                                                id="Reading"
                                                name="hobbies"
                                                type="checkbox"
                                                className="language me-2"
                                                onChange={changeData}
                                                value="Reading"
                                                checked={obj.hobbies?.includes('Reading')}
                                            />
                                            <Label
                                                check
                                                for="Reading"
                                                className="px-2"
                                            >
                                                Reading
                                            </Label>
                                        </Col>
                                        <Col xs={3}>
                                            <Input
                                                id="Exersice"
                                                name="hobbies"
                                                type="checkbox"
                                                className="language me-2"
                                                onChange={changeData}
                                                value="Exersice"
                                                checked={obj.hobbies?.includes('Exersice')}
                                            />
                                            <Label
                                                check
                                                for="Exersice"
                                                className="px-2"
                                            >
                                                Exersice
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row className='py-2'>
                                        <Col xs={12}>
                                            <Label
                                                check
                                                for="Exersice"
                                                className="py-2"
                                            >
                                                Profile
                                            </Label>
                                            <input
                                                id="userImage"
                                                name="userImage"
                                                type="file"
                                                className="language me-2 form-control"
                                                onChange={changeData}
                                                ref={reference}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <button className="my-2 btn btn-secondary submit fs-4">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Container>
                </Col>
            </Row>

            <div className="container bg-body-secondary mt-3">
                <h2 className='text-center py-3'>Form</h2>
                <Table className="">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Profile</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Gender</th>
                            <th>Hobbies</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr?.map((x, i) => {
                            return <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>
                                    <img src={x.image} alt="" width={40} height={40} />
                                </td>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.age}</td>
                                <td>{x.city}</td>
                                <td>{x.gender}</td>
                                <td>{x.hobbies}</td>
                                <td>
                                    <button onClick={() => deleteapi(x._id)} className='me-2 btn text-bg-danger'>Delete</button>
                                    <button onClick={() => editFunction(x._id)} className='btn text-bg-warning'>Edit</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CrudComponent