


import './LineCard.scss';

import Line1 from './Line1';
import { AdjustData } from './types';



interface LineChartProps {
  deviceData:  AdjustData;
}



export default function LineChart({ deviceData }:LineChartProps) {
 

 
 



  return (
    <>
      <div className="lineCard">
      
      </div>
      <div className="lines">
        <div className="box box7">
          <Line1 data={deviceData.T} value={"T/Tempreture"} />
        </div>
        <div className="box box7">
          <Line1 data={deviceData.S} value={"S/Soil"}/>
        </div>
      </div>
      <div className="lines">
        <div className="box box7">
          <Line1 data={deviceData.H} value={"H/humidity"}/>
        </div>
        <div className="box box7">
          <Line1 data={deviceData.PH} value={"PH"}/>
        </div>
        <div className="box box7">
          <Line1 data={deviceData.N} value={"N"}/>
        </div>
        <div className="box box7">
          <Line1 data={deviceData.PHO} value={"PHO"}/>
        </div>
        <div className="box box7">
          <Line1 data={deviceData.POT} value={"PHT"}/>
        </div>
      </div>
    </>
  );
}
