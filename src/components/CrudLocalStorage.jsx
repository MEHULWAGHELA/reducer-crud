import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { reducerLocalStorage } from './ReducerLocalStorage'

const CrudLocalStorage = () => {
    const [state, dispatch] = useReducer(reducerLocalStorage, [])
    let [reference, setreference] = useState(null)
    let [count, setcount] = useState(1)
    let [obj, setobj] = useState({
        language: []
    })
    let [array, setarray] = useState([])

    const mainData = async (e) => {
        if (e.target.name === 'language') {
            if (e.target.checked) {
                obj.language.push(e.target.value)
            }
            else {
                obj.language = obj.language?.filter((x, i) => x !== e.target.value)
            }
        }
        else if (e.target.name === 'profile') {
            reference = e.target.value
            setreference(reference)
            obj[e.target.name] = await toBase64(e.target.files[0])
        }
        else {
            obj[e.target.name] = e.target.value
        }
        setobj({ ...obj })
    }
    const submitFunction = (e) => {
        e.preventDefault()
        dispatch({ type: 'SUBMIT', obj, setobj, setcount, count, array, setarray, setreference })
    }

    function editfun(id) {
        dispatch({ type: 'EDIT', array, obj, setobj, id })
    }
    function deletefun(id) {
        dispatch({ type: 'DELETE', array, setarray, id })
    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject
    })
    useEffect(() => {
        setarray(JSON.parse(localStorage.getItem('array')) || [])
        setcount(JSON.parse(localStorage.getItem('count')) || 0)
    }, [])
    return (
        <div>
            <Row>
                <Col xs={6} className="offset-3">
                    <Container className="mt-1 py-1 px-4 border border-1 border-black rounded-2 shadow-lg">
                        <h1 className="text-center py-3">Employee Form</h1>
                        <Form onSubmit={(e) => { submitFunction(e) }}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="username" className="fw-600 fs-5">
                                            User Name
                                        </Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            placeholder=""
                                            type="text"
                                            className="main"
                                            value={obj.username}
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email" className="fw-600 fs-5">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder=""
                                            type="email"
                                            value={obj.email}
                                            className="main"
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="pincode" className="fw-600 fs-5">
                                            Pincode
                                        </Label>
                                        <Input
                                            id="pincode"
                                            name="pincode"
                                            placeholder=""
                                            type="number"
                                            value={obj.pincode}
                                            className="main"
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phoneno" className="fw-600 fs-5">
                                            Number
                                        </Label>
                                        <Input
                                            id="phoneno"
                                            name="phoneno"
                                            placeholder=""
                                            value={obj.phoneno}
                                            type="number"
                                            className="main"
                                            onChange={mainData}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="">
                                    <Label
                                        check
                                        for="example"
                                        className="fw-600 fs-5
                                my-2"
                                    >
                                        Language
                                    </Label>
                                    <div className="d-flex justify-content-start">
                                        <div>
                                            <Input
                                                id="exampleCheck"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value="html"
                                                onChange={mainData}
                                                checked={obj.language.includes('html')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck"
                                                className="px-2"
                                            >
                                                HTML
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck1"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value="css"
                                                onChange={mainData}
                                                checked={obj.language.includes('css')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck1"
                                                className="px-2"
                                            >
                                                CSS
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck2"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value="javascript"
                                                onChange={mainData}
                                                checked={obj.language.includes('javascript')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck2"
                                                className="px-2"
                                            >
                                                JAVASCRIPT
                                            </Label>
                                        </div>
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="language"
                                                type="checkbox"
                                                className="language me-2"
                                                value='react'
                                                onChange={mainData}
                                                checked={obj.language.includes('react')}
                                            />
                                            <Label
                                                check
                                                for="exampleCheck3"
                                                className="px-2"
                                            >
                                                REACT
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Label for="example" className="fw-600 fs-5">
                                        Gender
                                    </Label>
                                    <div className="d-flex">
                                        <div>
                                            <Input
                                                id="exampleCheck3"
                                                name="gender"
                                                type="radio"
                                                className="gender me-2"
                                                value='male'
                                                onChange={mainData}
                                                checked={obj.gender === 'male'}
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
                                                value='female'
                                                onChange={mainData}
                                                checked={obj.gender === 'female'}
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
                                <Col md={6} className="imgheight">
                                    <Label
                                        check
                                        for=""
                                        className="py-2 fs-5"
                                    >
                                        Profile
                                    </Label>
                                    <div>
                                        <input type="file" className='form-control' value={reference} id="profile" name="profile" onChange={mainData} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="my-2">
                                        {(obj.profile) && < img src={obj.profile} alt="img" className="object-fit-cover" width={200} height={200} />}
                                    </div>
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
                <Table className='p-3'>
                    <thead>
                        <tr>
                            <th>
                                Sr No
                            </th>
                            <th>
                                Profile
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Pin Code
                            </th>
                            <th>
                                Phone No
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Language
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {array.map((x, i) => {
                            return <tr key={i}>
                                <td>{x.id}</td>
                                <td>
                                    <img src={x.profile} width={100} height={100} alt="img" />
                                </td>
                                <td>{x.username}</td>
                                <td>{x.email}</td>
                                <td>{x.pincode}</td>
                                <td>{x.phoneno}</td>
                                <td>{x.gender}</td>
                                <td>{x.language.join(",")}</td>
                                <td>
                                    <button className="me-2" onClick={() => editfun(x.id)}>Edit</button>
                                    <button onClick={() => deletefun(x.id)}>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CrudLocalStorage