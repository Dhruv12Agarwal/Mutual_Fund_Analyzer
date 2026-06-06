import { useState, useEffect } from "react";

function TestAPI() {
    const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("");
  async function getUsers() {
    try{
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  }
  catch(error){
    setError("Failed to load users");

    setLoading(false);
  }
}

  useEffect(() => {

    getUsers();

  }, []);

  if (loading) {
    return <h1>Loading Users...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
  <div>
    <h1>Users</h1>

    {users.map((user) => (
      <p key={user.id}>
        {user.name}
      </p>
    ))}
  </div>
);
}

export default TestAPI;