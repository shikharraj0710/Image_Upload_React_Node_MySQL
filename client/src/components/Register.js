import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Register = () => {
 
    const [info, setInfo] = useState({});
    const history = useNavigate()
    const handleChange = (e) => {
        setInfo(prev => {
            if(e.target.name === "photo") return {...prev, [e.target.name] : e.target.files[0]}
            return {...prev, [e.target.name] : e.target.value}
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        var formdata = new FormData()
        formdata.append("username", info.username);     
        formdata.append("photo", info.photo);    
        const config = {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }
        const response = await axios.post("/register", formdata, config);
        
        if(response.data.status == 201) {
          history("/");
        } else {
          console.log("error")
        }

    }
  return (
    <>
    <div className='container mt-5'>
       <h1>Upload Your Image here</h1> 
   
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" name="username" onInput={handleChange}/>
     
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select your Image</Form.Label>
        <Form.Control type="file" placeholder="File" name="photo" onInput={handleChange} accept="image/*"/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>
    </>
  )
}

export default Register