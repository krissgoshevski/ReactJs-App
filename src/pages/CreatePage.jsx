import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Menu/NavBar';



export default function CreatePage() {

    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post('http://127.0.0.1:5000/create', inputs)
            .then(function (response) {
                console.log(response.data);
                navigate('/');
            });
    }


    return (

        <div>
            <NavBar />
            <div className='container h-100'>
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                        <h2>Create new user</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label>Name</label>
                                <input type='text' onChange={handleChange} className='form-control' name='name' placeholder='enter your name'></input>
                            </div>
                            <div className='mb-3'>
                                <label>Email</label>
                                <input type='email' onChange={handleChange} className='form-control' name='email' placeholder='enter your email'></input>
                            </div>
                            <div className='mb-3'>
                                <label>Password</label>
                                <input type='password' onChange={handleChange} className='form-control' name='password' placeholder='enter your pw'></input>
                            </div>
                            <button type='submit' className='btn btn-primary' name='add'>Create</button>
                        </form>
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
        </div>

    )
}
