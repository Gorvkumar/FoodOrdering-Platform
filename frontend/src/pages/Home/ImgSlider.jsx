import { useEffect, useState } from "react";

const ImgSlider = ({ data = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const ImgPerPage = 4;
  const CurrentImg = data.slice(startIndex, startIndex + ImgPerPage);

  useEffect(() => {
    if (!data?.length) return;
  }, [data]);

  return CurrentImg.map((meal) => {
    return (
      <div className="">
        <div
          key={meal.idMeal}
          className="flex w-[300px] h-[120px] shadow-md shadow-grey rounded"
        >
          <div className="p-3">
            <h3 className=" bg-white rounded-2xl p-1  font-semibold text-orange-400 shadow-2xl">
              {meal.strMeal}
            </h3>

            <p>{meal.strCategory}</p>
            <span className="flex">price : $20</span>
          </div>

          <div className="images p-2 ">
            <img
              src={meal.strMealThumb}
              alt=""
              className="w-[170px] h-[100px] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    );
  });
};

export default ImgSlider;
