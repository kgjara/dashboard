import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';

export default function WeatherChart({ weatherData, selectedVariable }) {

    {/* Configuración */}

    let options = {
        title: "Precipitación, Humedad y Nubosidad vs Hora",
        curveType: "function",
        legend: { position: "right" },
    }

    {/* Datos de las variables meteorológicas */}
    const data = [
        ["Hora", "Precipitación", "Humedad", "Nubosidad"],
        ...weatherData.map(item => [
            item.rangeHours.split(" - ")[0],
            parseFloat(item.precipitation) * 100,
            parseFloat(item.humidity),
            parseFloat(item.clouds)
        ])
    ];
    
    // Si no hay selección, se muestra todas las variables
    const chartData = selectedVariable === -1 
        ? data 
        : data.map(row => [row[0], row[selectedVariable + 1]]);
    
    

    {/* JSX */}

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Chart
                chartType="LineChart"
                data={chartData}
                width="100%"
                height="400px"
                options={options}
        />
        </Paper>
    )
}	