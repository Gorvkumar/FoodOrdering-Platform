import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

const ExploreCard = ({
  discount = "-30%",
  title = " McDonald’s East London",
  image = "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}) => {
  return (
    <div>
      <div className="explore-products">
        <div className="bgImg flex flex-col justify-between rounded-2xl w-[300px] h-[270px] shadow-md" style={{backgroundImage:`url(${image})`, backgroundSize:"cover"}}> 
          <div className="add  text-black text-center flex justify-end px-5 rounded-tl-2xl shadow rounded-br-2xl">
            <span className="bg-black p-2 rounded-b-lg text-white">
              {discount}
            </span>
          </div>

          <div className="explore-title text-white flex justify-between">
            <div className="p-2">
              <span className="text-orange-500 ">First Order Discount</span>
              <h3 className="text-white text-lg font-medium">{title}</h3>
            </div>

            <div className="add bg-white text-black text-center flex items-center p-1 px-4 rounded-tl-2xl shadow rounded-br-2xl">
              <BsFillPlusCircleFill className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
