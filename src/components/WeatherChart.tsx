import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';

interface WeatherChartProps {
    selectedVariable: number | null;
}

export default function WeatherChart({ selectedVariable }: WeatherChartProps) {

    {/* Configuración */}

    let options = {
        title: "Precipitación, Humedad y Nubosidad vs Hora",
        curveType: "function",
        legend: { position: "right" },
    }

    {/* Datos de las variables meteorológicas */}

    const allData = [
        ["Hora", "Precipitación", "Humedad", "Nubosidad"],
        ["03:00", 13, 78, 75],
        ["06:00", 4, 81, 79],
        ["09:00", 7, 82, 69],
        ["12:00", 3, 73, 62],
        ["15:00", 4, 66, 75],
        ["18:00", 6, 64, 84],
        ["21:00", 5, 77, 99]
    ];

    let data = allData;

    if (selectedVariable !== null) {
        const variableMap = {
            0: "Precipitación",
            1: "Humedad",
            2: "Nubosidad"
        };

        data = [["Hora", variableMap[selectedVariable]]];
        for (let i = 1; i < allData.length; i++) {
            data.push([allData[i][0], allData[i][selectedVariable + 1]]);
        }
    }
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
                data={data}
                width="100%"
                height="400px"
                options={options}
        />
        </Paper>
    )
}	