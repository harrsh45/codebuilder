import React, { useState } from "react";
import img from "../images/code.png";
import dltimg from "../images/delete.png";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import "../App.css";
const ListCard = ({ item }) => {
  const [isDelete, setisDelete] = useState(false);
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsDeleteModelShow(false);
          window.location.reload();
        } else {
          alert(data.message);
          setIsDeleteModelShow(false);
        }
      });
  };
  return (
    <>
      <div className="listcard  flex-row items-center justify-between p-[10px] bg-[#141414] cursor-pointer mb-2 rounded-lg hover:bg-[#202020]">
        <div
          onClick={() => {
            navigate(`/editor/${item._id}`);
          }}
        >
          <img className="w-[80px]" src={img} alt="" />
        </div>

        <div className="flex items-center gap-2 justify-between p-[10px] w-full">
          <div className="text-grey ">
            <h3 className=" text-[20px]  ">{item.title}</h3>
            <p className=" text-[gray] text-[14px]">
              created on {new Date(item.date).toDateString()}
            </p>
            </div>


            <div>
              <img
                onClick={() => {
                  setisDelete(true);
                }}
                className="w-[40px]  ml-[10px] cursor-pointer"
                src={dltimg}
                alt=""
              />
          </div>
        </div>
      </div>

      {isDelete ? (
        <div className="model fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.1)] flex-col">
          <div className="mainmodel h-[30vh] w-[30vw] bg-[#141414] rounded-lg p-[15px] ">
            <h3 className="text-3xl">Do you want so delete this project</h3>
            <div className="flex mt-5 w-full items-center gap-[8px]">
              <button
                onClick={()=>{deleteProj(item._id)}}
                className="rounded-lg p-[10px] min-w-[49%] bg-[#FF4343]"
              >
                {" "}
                Delete
              </button>
              <button
                onClick={() => {
                  setisDelete(false);
                }}
                className="rounded-lg p-[10px] min-w-[49%] bg-[#1A1919]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ListCard;
