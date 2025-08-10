// src/components/CityEventsChart.js file created in 4.10
// src/components/CityEventsChart.js

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CityEventsChart = ({ events }) => { // Note: I've added the 'events' prop for the next step
    // Data and chart jsx will go here
    const data = [
        { city: 'Tokyo', number: 30, z: 200 },
        { city: 'Munich', number: 8, z: 260 },
        { city: 'Vancouver', number: 15, z: 400 },
        { city: 'London', number: 35, z: 280 },
        { city: 'Berlin', number: 12, z: 500 },
        { city: 'Sydney', number: 22, z: 200 },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid />
                {/* CORRECTED XAxis type */}
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis type="number" dataKey="number" name="Number of events" allowDecimals={false} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {/* CORRECTED Scatter fill color */}
                <Scatter name="Number of events" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default CityEventsChart;


