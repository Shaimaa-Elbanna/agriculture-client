import { useGetDeviceOneDataQuery } from "../../state/api";
import "./single.scss";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string }[];
};

const Single = (props: Props) => {
  const { data, isLoading } = useGetDeviceOneDataQuery("1")
  console.log("🚀 ~ Single ~ isLoading:", isLoading)
  console.log("🚀 ~ Single ~ data:", data)


  const deviceData = data?.[0].topics[0].data.slice(-50)
  console.log("🚀 ~  ~ deviceData:", deviceData)



  const formattedData = deviceData?.map(item => {
    const date = new Date(item.time)
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    const day = date.getUTCDate();
    const adjustedTime = date.toISOString().slice(11, 19);
    return { ...item, time: adjustedTime, year, month, day }

  })
  console.log("🚀 ~ formattedData ~ formattedData:", formattedData)

  const currentTime = new Date();
  const oneHourAgo = new Date(currentTime.getTime() - (60 * 60 * 1000)); // Subtract 1 hour in milliseconds
  
  const dataLastHour = formattedData?.filter(item => {
      const itemTime = new Date(item.time);
      return itemTime >= oneHourAgo && itemTime <= currentTime;
  });
  console.log("🚀 ~ dataLastHour ~ :", dataLastHour);

  // Get the start time of the current hour
const currentHourStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), 0, 0);

// Get the end time of the current hour
const currentHourEnd = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours() + 1, 0, 0);

// Filter data points within the current hour
const dataCurrentHour = deviceData?.filter(item => {
    const itemTime = new Date(item.time);
    return itemTime >= currentHourStart && itemTime < currentHourEnd;
});

console.log("🚀 ~ dataCurrentHour ~ dataCurrentHour:", dataCurrentHour);

  
  
  // const fullTime = deviceData?.map(({ time }) => {
  //   const date = new Date(time)
  //   date.setHours(date.getHours() + 2);
  //   const year = date.getUTCFullYear()
  //   const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
  //   const day = date.getUTCDate();

  //   const adjustedTime = date.toISOString().slice(11, 19);

  //   return { adjustedTime, month, day, year }
  // })
  // console.log("🚀 ~ fullTime ~ fullTime:", fullTime)


  return (
    <div className="single" key={data?.[0]._id}>
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />

        {formattedData && (



          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={"S"}
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey={"PH"}
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey={"T"}
                  stroke="#010111"
                />






              </LineChart>
            </ResponsiveContainer>
          </div>

        )}


        {/* {props.chart && (


          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />


                ))}



              </LineChart>
            </ResponsiveContainer>
          </div>
        )} */}

        {/* {deviceData} */}
      </div>
      {/* <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};


export default Single;
