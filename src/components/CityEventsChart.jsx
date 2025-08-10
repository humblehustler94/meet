// src/components/CityEventsChart.jsx

import { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = () => {
            const data = allLocations.map((location) => {
                const count = events.filter((event) => event.location === location).length;
                const city = location.split((/, | - /))[0];
                return { city, count };
            });
            return data;
        };

        if (allLocations.length) {
            setData(getData());
        }
    }, [allLocations, events]);

    return (
        <ResponsiveContainer width="99%" height={400}>
            {/* The data prop is now on the parent ScatterChart */}
            <ScatterChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: -30,
                }}
            >
                <CartesianGrid />
                <XAxis
                    type="category" dataKey="city" name="City"
                    angle={60} interval={0} tick={{ dx: 20, dy: 20, fontSize: 14 }}
                />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {/* The data prop has been removed from here */}
                <Scatter name="Events per city" fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default CityEventsChart;