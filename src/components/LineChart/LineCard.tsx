


import './LineCard.scss';

import Line1 from './Line1';
import { AdjustData } from './types';
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import AlertData from './AlertData';



interface LineChartProps {
  deviceData: AdjustData;
}



export default function LineChart({ deviceData }: LineChartProps) {
  console.log("🚀 ~ LineChart ~ deviceData:", deviceData)






  return (
    <>


<AlertData data={deviceData}/>
      <div className="lineCard">

      <div className="lines">
        {Object.entries(deviceData).map(([key,value])=>(
  <div className="box box7">
  <Line1 data={value} value={key} />
</div>
  ))}
          
        </div>
      </div>
     
    </>
  );
}
