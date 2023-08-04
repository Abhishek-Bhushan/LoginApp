import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Home() {
   const location = useLocation();
   const {email} = location.state || {};
    const [name,setName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9090/getname/${email}`)
    .then(response => {
      setName(response.data);
    })
    .catch(error => {
      console.error('Error fetching username',error);
    })
  }, []);

  return (
    <div className='container-fluid '>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 dashboard">
            <h1> Hello {name}</h1>
            <h2> Welcome to the Landing Page</h2>
            <h5> We will be back soon </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home