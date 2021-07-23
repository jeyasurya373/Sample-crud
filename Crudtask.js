import React, { Component } from "react";
import axios from "axios";

class Crudtask extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            id: "",
            name: "",
            username: "",
            email: "",


        }
    }

    componentDidMount = () => {
        this.getPost();
    }

    getPost = async () => {

        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users")
            this.setState({ user: response.data })
        } catch (err) {
            console.error(err);
        }
    }

    createPost = async () => {
        try {
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/users",
                {
                    Id: this.state.id,
                    Name: this.state.name,
                    User: this.state.username,
                    Email: this.state.email,
                })
            let user = [...this.state.user]
            user.push(data);

            this.setState({ user })


        } catch (err) {
            console.error(err)
        }
    }

    handleedit = () => {
        console.log("Editing")
    }

    handlechange = ({ target: { name, value } }) => {

        this.setState({ [name]: value })

    }

    handlesubmit = (e) => {
        e.preventDefault();
        this.createPost();

    }
    render() {
        return (
            <>

                <form>
                    <label>Id :</label>
                    <input type="number" name="id" value={this.state.id} onChange={this.handlechange} />
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handlechange} />
                    <label>User:</label>
                    <input type="text" name="user" value={this.state.username} onChange={this.handlechange} />
                    <br />
                    <br />
                    <label>Email:</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handlechange} />
                </form>
                <table >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user.map(user => {
                            return (

                                <tr >
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={this.handleedit}>Edit</button>
                                        <button>Create</button>
                                        <button onClick={this.handlesubmit}>Submit</button></td>


                                </tr>


                            )

                        })}

                    </tbody>
                </table>
            </>
        )
    }
}

export default Crudtask;






