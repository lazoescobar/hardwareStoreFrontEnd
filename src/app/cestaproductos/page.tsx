"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import LayoutPages from '../../layout/LayoutPages';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    
    <div>
      <LayoutPages>
      <h1>Cesta productos</h1>
      <pre>
        { /*<code>{JSON.stringify(session, null, 2)}</code>*/ }
      </pre>
    
    { /*(session) && 
      <>
        <button
          onClick={() => signOut()}
          className="btn btn-danger"
        >
          Sign out
        </button>
      </>*/
    }
      </LayoutPages>
      
    </div>


  );
};
export default Dashboard;
