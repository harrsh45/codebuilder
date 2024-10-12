import React, { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import GridCard from "../components/GridCard";
import ListCard from "../components/ListCard";
import { useNavigate } from 'react-router-dom';
import { api_base_url } from "../helper";

function Home() {
  const [isGrid, setisGrid] = useState(false);
  const [isCreate, setisCreate] = useState(false)
  const [projectTitle,setprojectTitle]=useState("")
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");;

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setUserData(data.user);
      }
      else {
        setUserError(data.message);
      }
    })
  }, [])

  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) 
  ) : [];

  const createProj = (e) => {
    if (projectTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,
          userId: localStorage.getItem("userId")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setIsCreateModelShow(false);
          setprojectTitle("");
          alert("Project Created Successfully");
          console.log(data.projectId)
          navigate(`/editor/${data.projectId}`);
        } else {
          alert("Something Went Wrong");
        }
      });
    }
  };

  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.projects);
      } else {
        setError(data.message);
      }
    });
  };

  useEffect(() => {
    getProj();
  }, []);

  return (
    <>
      <Navbar  isGridLayout={isGrid} setIsGridLayout={setisGrid} />
      <div className="flex justify-between items-center px-[100px] my-[20px]">
        <h2 className="text-2xl">Hi,{userData?userData.name:""}</h2>
        <div className="flex items-center gap-1">
          <div className="inputbox rounded-lg !w-[350px] !my-2">
            <input onChange={(e)=>{setSearchQuery(e.target.value)}} value={searchQuery} type="text" placeholder="Search your project here" />
          </div>
          <div className="btnblue rounded-lg cursor-pointer">
            <button onClick={()=>{setisCreate(true)}}>+</button>
          </div>
        </div>
      </div>

      <div className="cards">
        {
          isGrid ?
            <div className='gridcard px-[100px]'>
              {
                filteredData.length > 0 ? filteredData.map((item, index) => (
                  <GridCard key={index} item={item} />
                )) : <p>No projects found</p>
              }
            </div>
            : <div className='list px-[100px]'>
              {
                filteredData.length > 0 ? filteredData.map((item, index) => (
                  <ListCard key={index} item={item} />
                )) : <p>No projects found</p>
              }
            </div>
        }
      </div>
     
      {
        isCreate?
        <div className="createmodelicon fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.1)] flex-col">
        <div className="createmodel w-[25vw] h-[30vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
          <h3 className="text-2xl">
            Create new project
            
          </h3>
          <div className="inputbox mt-2">
            <input onChange={(e)=>{setprojectTitle(e.target.value)}} value={projectTitle} type="text" placeholder="Project title" />
          </div>
          <div className="flex items-center gap-[10px] w-full mt-2 "> 
          <button onClick={createProj} className='btnblue rounded-[5px] w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]'>Create</button>
          <button onClick={()=>{setisCreate(false)}} className='btnblue !bg-[#1A1919]  w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]'>Cancel</button>
          </div>
        </div>
      </div>
      :""
      }
    </>
  );
}

export default Home;
