import {useState,useEffect} from 'react';
import axios from "axios";
import Router from 'next/router';


// reactstrap components
import { Modal } from "reactstrap";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const [data, setData] = useState([]);
  const [eData, setEData] = useState({});



  const getData = async () => {
    const { data } = await axios.get("http://localhost:8080/posts");
    // console.log(data.data)
    setData(data.data);
  };

  const deleteData = async (id) => {
    await axios.delete("http://localhost:8080/posts/"+id, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }).catch((e)=>{console.log(e)});
    
    getData()
    // setData(data.data);
  };

  const createPost = async (event) => {
    event.preventDefault()
    const post = {
      Title: event.target.title.value,
      Content: event.target.content.value,
    }
    console.log(post)

    await axios.post("http://localhost:8080/posts", post, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }).then(()=>{
      setModalOpen(!modalOpen)
      getData()
    })
    .catch((e)=>{console.log(e,"error in posting")});    
  };

  const editPost = async (event) => {
    event.preventDefault()
    const post = {
      Title: event.target.title.value,
      Content: event.target.content.value,
    }
    console.log(post)

    await axios.patch("http://localhost:8080/posts/"+eData.id, post, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }).then(()=>{
      setModalOpen2(!modalOpen2)
      getData()
    })
    .catch((e)=>{console.log(e,"error in posting")});    
  };

  const setEditData = (index) => {
    setEData(data[index])
    console.log(eData)
  };

  const checkLogin = async () => {
    const { data } = await axios.get("http://localhost:8080/check",{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    });
    console.log(data.data)
    if (data.data == false){
      localStorage.clear()
      Router.push('/')
    }
  };

  useEffect(() => {
    const item = localStorage.getItem('token')
    console.log("hi",item)
    checkLogin()
    getData();
  },[])

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <div className="mb-4">
        <h1 className="font-serif text-3xl font-bold underline decoration-gray-400"> Dashboard</h1>
        <div className="flex justify-end">
          <button className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600" onClick={() => setModalOpen(!modalOpen)}>Create Post</button>
          <button className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600" onClick={()=>{localStorage.clear();Router.push('/')}}>Logout</button>

        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    ID</th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Title</th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Description</th>
                  
                  <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colSpan={3}>
                    Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
              {data.map((item, index) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        {item.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">                        {item.title}

                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <p>{item.content}</p>
                    </td>
                
                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                      <button onClick={() => {setModalOpen2(!modalOpen2); setEditData(index)}} className="text-indigo-600 hover:text-indigo-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </td><td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                      <a href="#" className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </a>
                    </td>
                    <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
                      <button onClick={() => deleteData(item.id)}><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg></button>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div>
          
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={createPost}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        
                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Create</h3>
                          <br/>
                          
                              <div>
                                <label className="block text-sm font-bold text-gray-700" htmlFor="title">
                                  Title
                                </label>
                                <input id ="title" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" name="email" placeholder={180} defaultValue="" />
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="password">
                                  Description
                                </label> 
                                <textarea id ="content" name="description" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows={4} placeholder={400} defaultValue={""} />
                              </div>                              
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Create</button>
                      <button  onClick={() => setModalOpen(!modalOpen)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" >Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal toggle={() => setModalOpen2(!modalOpen2)} isOpen={modalOpen2}>
        <div>
          
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={editPost}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        
                        <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Edit</h3>
                          <br/>
                          
                              <div>
                                <label className="block text-sm font-bold text-gray-700" htmlFor="title">
                                  Title
                                </label>
                                <input id ="title" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" name="email" placeholder={180} defaultValue={eData.title} />
                              </div>
                              <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="password">
                                  Description
                                </label> 
                                <textarea id ="content" name="description" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows={4} placeholder={400} defaultValue={eData.content} />
                              </div>                              
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Edit</button>
                      <button  onClick={() => setModalOpen2(!modalOpen2)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" >Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>



    </div>



  )
};

export default Dashboard;
