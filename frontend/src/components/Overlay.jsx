// import React from 'react'

// const Overlay = ({setIsProfileOpen}) => {


//   return (
//     <div 
//     onClick={()=> setIsProfileOpen(false)}
//      className='h-[100vh] w-[70vw] bg-[#7E72727C] absolute top-0 left-0'>Overlay</div>
//   )
// }

// export default Overlay





import React, { useEffect, useState } from "react";

const Overlay = ({ handleClose, closing }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true)
  }, []);

  return (
    <div
      onClick={handleClose}
      className={`fixed top-0 left-0 w-full h-full z-40 transition-all duration-300 ease-in-out backdrop-blur-sm
      ${visible && !closing ? "bg-black/2 opacity-90" : "bg-black/0 opacity-0"}`}
    ></div>
  );
};

export default Overlay;
