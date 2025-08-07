import React from 'react'
import { useParams } from 'react-router'

function UserRepo() {
    const { repo } = useParams();
    console.log(repo);
    
  return (
      <div>
          <h1 className='text-center text-2xl mt-32'> THIS IS MY REPO { repo}</h1>
       {/* <CommitList username={submittedData.githubUsername} repo={submittedData.repository}/> */}
    </div>
  )
}

export default UserRepo
