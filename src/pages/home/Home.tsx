import  { useEffect, useState } from 'react'
import { io } from 'socket.io-client';





export default function Home() {
    const [mqttData, setMqttData] = useState({});

    const handleMqttData = async (data: any) => {
        await setMqttData(data);
    };

    useEffect(() => {
        const socket = io("http://localhost:4000");

        socket.on("mqttMessage", (data: any) => {
            handleMqttData(data);

        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log(mqttData)
    }, [mqttData])

    // const Item = styled(Paper)(({ theme }) => ({

    //     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }));

    return (
        <div className='home'>
            <div className='box box1'>
home
            </div>
        </div>

    )
}

