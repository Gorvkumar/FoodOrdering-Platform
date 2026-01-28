import React from 'react'

const ImgUrl ="https://img2.oastatic.com/img2/56371058/600x300c/variant.jpg"

const MenuHero = () => {

    
  return (
    <div>
        <div className="menuinfo flex justify-center gap-6 h-[400px] items-center bg-[#03081F]">
            <div className="lefttext w-1/2    text-white">
                <span className=''>I am lovin it</span>
                <div className="title">
                    <h2 className='text-6xl'>McDonald’s East London</h2>
                    
                </div>
            </div>

            <div className="right-img rounded-4xl ">
                <img src={ImgUrl} alt="" className='shadow-lg shadow-amber-600 rounded-4xl'/>
            </div>
        </div>
    </div>
  )
}

export default MenuHero