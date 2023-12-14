import React, { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from '../Menu/NavBar';

export default function EditPage() {

    const { id } = useParams();
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://127.0.0.1:5000/show/user/${id}`)
            .then(function (resp) {
                console.log(resp.data);
                setInputs(resp.data.user);  // Access 'user' property from the response
            })
            .catch(function (error) {
                console.error('Error fetching user:', error);
            });
    }

    // za da moze da se menuva tekstot na inputite
    const handleChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;

        setInputs(values => ({ ...values, [name]: value }));

    }

    // koga ke se submitira form
    const handleSubmit = (ev) => {
        ev.preventDefault();

        axios.put(`http://127.0.0.1:5000/update/${id}`, inputs)
            .then(function (resp) {
                console.log("Resp data", resp.data);
                console.log("Resp data user", resp.data.user);
                navigate('/');
            });
    }


    return (
        <div>
            <NavBar />
            <div className="container h-100">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name</label>
                                <input type="text" id="name" name="name" className="form-control" value={inputs.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control" value={inputs.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label >Password</label>
                                <input type="password" name="password" className="form-control" value={inputs.password} onChange={handleChange} />
                            </div>
                            <button type="submit" name='btn-update' className="btn btn-primary">Update User</button>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>

        </div>
    )
}