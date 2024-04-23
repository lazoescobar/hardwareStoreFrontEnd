"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [cats, setCats] = useState([]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    
    { (session) && 
      <>
        <button
          onClick={() => signOut()}
          className="btn btn-danger"
        >
          Sign out
        </button>
      </>
    }
    </div>


  );
};
export default Dashboard;
