import {useState} from 'react';
import axios from "axios";
import Router from 'next/router';


const Index = () => {
  const [message, setMessage] = useState('Clear');

  const loginUser = async (event) => {
    event.preventDefault()
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }
    console.log(data)
    await axios.post("http://localhost:8080/signin",data)
    .then((res) => {
        if (res["data"]){
          // console.log(res.data.data.token,"dsf")
          localStorage.setItem('token', res.data.data.token);
          console.log(localStorage.token)
          setMessage("Logging in")
          Router.push('/dashboard')

          console.log(res["data"])
        }
    })
    .catch((e)=>{
      setMessage("Mismatch")
      console.log(e)
    })
  }

  return (
  
    <section className="h-screen">
    <div className="container px-6 py-12 h-full">
      <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone image" />
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form onSubmit={loginUser}>
            {/* Email input */}
            <div className="mb-6">
              <input type="text" id="email" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Email address" />
            </div>
            {/* Password input */}
            <div className="mb-6">
              <input type="password" id="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
            </div>
            {/* Submit button */}
            <button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" data-mdb-ripple="true" data-mdb-ripple-color="light">
              Sign in
            </button>

            <span className="flex items-center text-sm font-bold text-red-800">      
              {message} 
            </span>
            
          </form>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Index;
