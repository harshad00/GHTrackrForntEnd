import React from 'react';
import { useAuth } from '../hook/useAuth';

function Myrepo() {

  const { user, loading:userAuthLoding} = useAuth();

  if (userAuthLoding) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view your repositories.</p>;
  // console.log(user);
  
    

  return (
    <div>
      <h1 className='mt-11'>hello</h1>
      <h1>{ user._id}</h1>
    </div>
  )
}

export default Myrepo