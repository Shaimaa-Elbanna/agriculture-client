import './headFarm2.scss'
import img from '../../styles/img/bright-living-room-with-a-large-house-plant-copy-royalty-free-image-1580854667-removebg-preview.png'

export default function HeadFarm2() {
  return (
    <div className="secondFram">
    <h2>My State </h2>
    <div className="list">
      
        <div className="listItem headColor" >
Today
<br />
<br />
This Month
          <div className="user normalColor">
           4 Orders
            <br />
            <br />
            120 Order
           
          </div>
          <span className="amount">
          <img src={img} alt="" style={{height:"250px"}} />

          </span>
        </div>
      
    </div>
  </div>
)
}


