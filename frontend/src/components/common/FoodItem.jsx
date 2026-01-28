import React, { useState } from "react";
import { useLocation } from "react-router-dom";


const FoodItem = () => {

 const location = useLocation();
 console.log(location)
  const queryParams = new URLSearchParams(location.search); // Parses the search string

  const paramValue = queryParams.get('category'); // Ge

  const foodData = [
    {
      image:
        "https://media.istockphoto.com/id/996699224/photo/assorted-indian-food-for-lunch-or-dinner-rice-lentils-paneer-dal-makhani-naan-chutney-spices.jpg?b=1&s=612x612&w=0&k=20&c=OmZ9-3eVBwTPhSdh0Y7z5pNxDMzttlGpg9zm1DpWak4=",
      title: "Chef burger London",
      category: "burger",
    },
    {
      image:
        "https://www.foodiesfeed.com/wp-content/uploads/2023/12/pizza-salami-close-up.jpg",
      title: "Italian pizza",
      category: "pizza",
    },
    {
      image:
        "https://www.foodiesfeed.com/wp-content/uploads/2023/08/crunchy-pizza-rolls.jpg",
      title: "Grand Ai Cafe Surry",
      category: "vegan",
    },
  ];

  const [foodcategory, setfoodCategory] = useState(paramValue || "All");

  const filterfood = foodcategory === "All" ?
   foodData :
   
   foodData.filter((item)=>item.category === foodcategory)
    
   

  return (
    <div className="categories p-4 pb-8">
      <div className="itemlist flex justify-evenly gap-12 py-8">
        <h2 className="text-4xl">40% Discount On First Order</h2>

        <ul className="flex gap-6">
          <li
            onClick={() => setfoodCategory("All")}
            className="cursor-pointer hover:text-amber-500"
          >
            All
          </li>

          <li
            onClick={() => setfoodCategory("vegan")}
            className="cursor-pointer hover:text-amber-500"
          >
            vegan
          </li>

          <li
            onClick={() => setfoodCategory("burger")}
            className="cursor-pointer hover:text-amber-500"
          >
            burger's
          </li>

          <li
            onClick={() => setfoodCategory("pizza")}
            className="cursor-pointer hover:text-amber-500"
          >
            pizza
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-6 px-14">
        {filterfood.map((ele, key) => (
          <div key={key} className="bgImg overflow-hidden relative">
            <img
              src={ele.image}
              alt=""
              className="rounded-xl w-[350px] h-[300px] object-cover"
            />
            <span className="text-orange-500 left-3 p-1 absolute bottom-6">
              Restaurants
            </span>
            <h2 className="absolute bottom-2 left-3 text-white text-xl font-semibold">
              {ele.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItem;


