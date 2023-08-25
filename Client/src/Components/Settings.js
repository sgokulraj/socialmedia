import Form from 'react-bootstrap/Form';
import "../Stylesheet/Register.css";
import { Button, FloatingLabel, Alert } from 'react-bootstrap';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../ReduxState/index';
import Navbar from "./Navbar";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import FileBase from "react-file-base64"
import axios from "axios";

function Settings() {
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        occupation: "",

    })
    const [images, setImages] = useState(null)
    const navigate = useNavigate()
    const [disable, setDisable] = useState(true)
    const [editBtn, setEditBtn] = useState(false)
    const [updateBtn, setUpdateBtn] = useState(true)
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    async function getUserProfile() {
        const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const userDetails = await res.json();
        setUserData((preVal) => {
            return { ...preVal, userId: userDetails._id, firstName: userDetails.firstName, lastName: userDetails.lastName, email: userDetails.email, occupation: userDetails.occupation }
        })
        // console.log(userData);
        setImages(userDetails?.picturePath)
        setValue(userDetails?.location)
    }


    useEffect(() => {
        getUserProfile()
    }, [])


    function handleEditBtn(e) {
        e.preventDefault();
        setDisable(false)
        setEditBtn(true)
        setUpdateBtn(false)
    }


    function handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target;
        setUserData((preVal) => {
            return { ...preVal, [name]: value }
        })
    }
    const changeHandler = value => {
        setValue(value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const occupation = userData.occupation;
        const email = userData.email;
        let location;
        if (value.label) {
            location = value.label
        } else {
            location = value
        }

        const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${userId}/${firstName}/${lastName}/${occupation}/${location}/${email}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
        });

        const dataSaved = await res.json();
                       
        if (res.ok) {
            dispatch(setProfile({user: dataSaved}))
            alert("updated Successfully");
            navigate("/home")
        } else {
            alert("update failed");
        }
        setDisable(true)
        setEditBtn(false)
        setUpdateBtn(true)
    }


    async function deleteUser() {
        if (window.confirm("Are you sure about deleting your account?")) {

            const res = await fetch(`https://smoggy-lamb-waders.cyclic.cloud/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log(res);
            if (res.ok) {
                alert("User deleted successfully!!")
                navigate("/")
            }
        }
    }
    return (
        <>
            <Navbar />
            <section className="sec">
                <div className="main">
                    <h2>Your Profile</h2>
                    <form>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="firstName"
                                type="text"
                                placeholder="FirstName"
                                name='firstName'
                                value={userData.firstName}
                                onChange={handleChange}
                                disabled={disable}
                            />
                            <label htmlFor="username">FirstName</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="lastName"
                                type="text"
                                placeholder="LastName"
                                name='lastName'
                                value={userData.lastName}
                                onChange={handleChange}
                                disabled={disable}
                            />
                            <label htmlFor="username">LastName</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                name='email'
                                value={userData.email}
                                disabled
                            />
                            <label htmlFor="floatingInputCustom">Email address</label>
                        </Form.Floating>
                        <div className="input" style={{ marginBottom: "0px" }}>
                            <Select options={options} value={value} onChange={changeHandler} placeholder="Select Country" className="country" disabled={disable} />
                            <br />
                        </div>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="occupation"
                                type="text"
                                placeholder="occupation"
                                name='occupation'
                                value={userData.occupation}
                                onChange={handleChange}
                                disabled={disable}
                            />
                            <label htmlFor="username">Occupation</label>
                        </Form.Floating>
                        {/* <div className="dropzone">
                            <p> Update Profile Picture</p>
                            <FileBase
                                type="file"
                                multiple={false}
                                disabled={disable}
                                onDone={({ base64 }) =>
                                    // setFormFields({ ...formFields, fileUploads: base64 })
                                    setImages(base64)
                                }
                            />

                        </div> */}
                        <div className='my-3' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {editBtn ||
                                <Button type="submit" variant="primary" className='me-2' onClick={handleEditBtn}>Edit</Button>
                            }
                            {updateBtn ||
                                <Button type="submit" variant="primary" className='me-2' onClick={handleSubmit} >Update</Button>
                            }
                            <Button type="button" variant="danger" onClick={deleteUser}>Delete</Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Settings