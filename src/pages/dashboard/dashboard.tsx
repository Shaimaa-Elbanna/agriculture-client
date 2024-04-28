import "./dashboard.scss";

import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxRevenue,
} from "../../data";
import HeadFarm from "../../components/headFarm/HeadFarm";
import HeadFarm2 from "../../components/headFarm2/HeadFarm2";
import FirstPlant from "../../components/plantsList/firstPlant/FirstPlant";
import SecondPlant from "../../components/plantsList/secondPlant/SecondPlant";
import ThirdPlant from "../../components/plantsList/thirdPlant/ThirdPlant";

const Dashboard = () => {
  return (
    <div className="home">
       <div className="box box7">
        <HeadFarm />
      </div>
    
     
     
       <div className=" box7 " style={{ marginLeft: '2%' }}>
        <HeadFarm2 />
      </div>
      <div className="plantbox ">
        <FirstPlant />
      </div>
      <div className="plantbox">
        <SecondPlant  />
      </div>
      <div className="plantbox">
        <ThirdPlant/>
      </div>
      
      {/* <div className="box box1">
        <TopBox />
      </div> */}
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <br />
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <br />
      <div className="box box7">
        <BigChartBox />
      </div>
     
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Dashboard;
