import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel} from 'react-bootstrap';
import './style.scss';

const Carrousel = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get('https://api.rawg.io/api/games?key=1622ce4169fb4ad38704cbffe8d9edad');
        setData(response.data.results);
        console.log(response)
      }
      fetchData()
    }, [])
  
    return(
      <div className='carousel'>
        <Carousel nextLabel='' prevLabel='' touch='true'>
            {data.map((item) => (
              <Carousel.Item className='itemCarousel' interval={3000}>
                <div className='imgDiv'>
                <img  resizeMode={'center'}className="img"
                  alt={item.name} src={item.background_image} />
                  </div>
                <Carousel.Caption>{item.name}</Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
      </div>
    )
}
export default Carrousel;