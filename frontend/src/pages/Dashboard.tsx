import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  interface Usuario {
    email: string;
    emailCode: number;
    id: number;
    isActivated: boolean;
    name: string;
    password: string;
  }

  let { userid } = useParams();
  const [data, setData] = useState<Usuario>();

  useEffect(() => {
    axios
      .get(`http://localhost:5003/api/v1/auth/users/${userid}`) //enviar JWT ao invés do userID
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
