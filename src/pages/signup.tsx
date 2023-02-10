import axios from "axios";
import {useState} from 'react';



const SignUp = () => {
  const [message, setMessage] = useState('');

  const createUser = async (event) => {
    event.preventDefault()
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      role:"member"
    }
    console.log(data)
    await axios.post("http://localhost:8080/signup",data)
    .then((res) => {
        if (res["data"]){
          setMessage("You can login now")
          console.log("success")
        }
    })
    .catch((e)=>{
      setMessage("Email exist or You're email is not right")
      console.log(e)
    })
  }

  // const [success, setSuccess] = useState('');
  return (
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="w-full" alt="Phone image" />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={createUser}>
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
                Sign up
              </button>
              <span className="flex items-center text-sm font-bold text-red-800">  
                {message} 
              </span>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default SignUp;
