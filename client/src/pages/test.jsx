import React, { useEffect, useState } from "react";
import axios from "axios";

const Network = () => {
  const [networkData, setNetworkData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:8080/network/get")
      .then((response) => setNetworkData(response.data))
      .catch((error) => console.error("Error fetching network data:", error));
  }, []);

  return (
    <div>
      <h1>Network Data</h1>
      <ul>
        {networkData.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>Role: {user.role}</p>
            <p>Location: {user.location}</p>
            <p>Connections: {user.connections}</p>
            <p>Expertise: {user.expertise.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Network;
