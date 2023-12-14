import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Menu/NavBar';


const IndexPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://127.0.0.1:5000/users')
            .then(function (response) {
                console.log('Fetched users:', response.data);

                // Ensure that response.data.users is an array before setting the state
                if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                }
            })
            .catch(function (error) {
                console.error('Error fetching users:', error);
            });
    }

    function deleteUser(id) {

        axios.delete(`http://127.0.0.1:5000/delete/${id}`)
            .then(function (resp) {
                console.log("Resp data", resp.data);
                getUsers();
            })
        alert("Succesfully deleted user");
    }

    return (
        <div>
            <NavBar />
            <div className='container h-100'>
                <div className='row h-100'>
                    <div className='col-12'>
                        <p className='add-user'><Link to="/create" className='btn btn-success'> Add New User</Link></p>
                        <h2>List of all users</h2>
                        <table className='table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Created at</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.map((user, key) =>
                                    <tr key={key}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <Link to={`/edit/${user.id}`} className='btn btn-success' style={{ marginRight: '10px' }}>Edit</Link>
                                            <button onClick={() => deleteUser(user.id)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndexPage;