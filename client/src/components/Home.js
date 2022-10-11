import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    const response = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.status == 201) {
      console.log("Data Received!!!", response);
      setData(response.data.data);
    }
  };

  const handleDelete = async(id) => {
    const res = await axios.delete(`/${id}`, {
      headers : {
        "Content-Type" : "application/json"
      }
    });
    if(res.data.status == 201) {
      getUserData()
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="container mt-2">
        <h1 className="text-center mt-2">
          Image Upload Project with MySQL database
        </h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-light text-decoration-none">
              Add User
            </NavLink>
          </Button>
        </div>
        {
          data.length>0 && (
            <div className="d-flex justify-content-between align-items-center mt-5">
              {
                data.map((d,i) => (
                  <Card style={{ width: "22rem", height: "18rem" }} className="mb-3" key={i}>
                  <Card.Img
                    variant="top"
                    src={`/uploads/${d.userimg}`}
                    style={{ width: "100px", textAlign: "center", margin: "auto" }}
                    className="mt-2"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>Username : {d.username}</Card.Title>
                    <Card.Text>Date Added : {new Date(d.date).toLocaleDateString('en-ES', {day : "numeric", weekday : "long", year :"2-digit", month : "long"})}</Card.Text>
                    <Button variant="danger" className="col-lg-6 text-center" onClick={() => handleDelete(d.id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
                ))
              }
          
          </div>
          )
        }
       
      </div>
    </>
  );
};

export default Home;
