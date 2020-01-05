import React from 'react';
import "antd/dist/antd.css";
import MyCarousel from './components/Carousel';
import MySelect from './components/Select';
import MySearch from './components/Search';


function App() {
  return (
    <>
      <MyCarousel/>
      <MySearch/>
      <MySelect/>
      
    </>
  );
}

export default App;
