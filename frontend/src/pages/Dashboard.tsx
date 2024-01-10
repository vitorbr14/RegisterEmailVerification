import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { jwtStorage } from "../context/localStorageContext";

const Dashboard = () => {
  interface Usuario {
    email: string;
    emailCode: number;
    id: number;
    isActivated: boolean;
    name: string;
    password: string;
  }

    const jwtLocal = useContext(jwtStorage)
  const [data, setData] = useState<Usuario>();
  const retrivedToken = localStorage.getItem('tokenjwt');
  useEffect(() => {
    axios
      .get(`http://localhost:5003/api/v1/dashboard`, {
        headers:{
          Authorization: `Bearer ${jwtLocal}`
        }
      }) //enviar JWT ao invés do userID
      .then((data) => {
        setData(data.data);
        console.log(data.data);
       
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if(!retrivedToken) {
    return <h1>Por favor, faça login</h1>
  }
  return (
    <div className="w-full h-screen flex justify-center items-center text-center">
      <div>
        <p>Seja bem vindo, {data && data.name}</p>
        <br></br>
        <p>
          {data && data.isActivated
            ? "Email ativado"
            : "Te enviamos um email com o link para verificação!"}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
