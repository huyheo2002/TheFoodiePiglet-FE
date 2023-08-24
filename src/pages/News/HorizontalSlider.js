import React, { useState } from 'react';

const HorizontalSlider = () => {
  const items = [
    { imageSrc: 'https://c4.wallpaperflare.com/wallpaper/764/505/66/baby-groot-4k-hd-superheroes-wallpaper-preview.jpg', cat: 'Item 1',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image2', cat: 'Item 2',text:'lorem',date:'1/1/2023' },
    { imageSrc: 'url_to_image3', cat: 'Item 3',text:'lorem',date:'1/1/2023' },
    { imageSrc: 'url_to_image3', cat: 'Item 4',text:'lorem',date:'1/1/2023' },
    { imageSrc: 'url_to_image3', cat: 'Item 5',text:'lorem',date:'1/1/2023' },
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},{ imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    { imageSrc: 'url_to_image3', cat: 'Item 6',text:'lorem' ,date:'1/1/2023'},
    // ... Add more items
  ];

  const itemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, Math.ceil(items.length / itemsPerPage) - 1));
  };

  return (
    <div className="flex overflow-hidden relative">
      <div className="flex transition-trans form duration-300 transform">
        {visibleItems.map((item, index) => (
          <div key={index} className="w-[310px] h-[350px] ml-4 bg-blue-300 relative top-0 left-0 right-0">
            {/* <div className="border rounded-lg  w-[300px] h-[300px]  bg-slate-700">
                   
            </div> */}
             <img  src={item.imageSrc} className="border rounded-lg  w-[310px] h-[300px] " />
                    <p className=" absolute top-1/2 left-0 right-0   text-center bg-black bg-opacity-50 text-white px-2 py-1 ">{item.cat}</p>
                    <p className=" absolute top-1/2 left-0 right-0 mt-[40px]   text-center bg-black bg-opacity-50 text-white px-2 py-1 ">{item.text}</p>
                    <p className=" absolute top-1/2 left-0 right-0 mt-[80px]   text-center bg-black bg-opacity-50 text-white px-2 py-1 ">{item.date}</p>
          </div>    
        ))}
      </div>
      <div className="absolute top-[280px]   left-1/2 transform -translate-x-1/2 bg- w-[220px]  p-[20px]">
        <button className='p-7 ' onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
        <button onClick={handleNext} disabled={currentPage === Math.ceil(items.length / itemsPerPage) - 1}>Next</button>
      </div>
    </div>
  );
};

export default HorizontalSlider;
