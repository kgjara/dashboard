
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';

function App() {

  return (
    <Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={12}>
        <Summary></Summary>
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={6} sm={4} md={3} lg={2}>
        <ControlPanel />
      </Grid>
      <Grid xs={12} sm={4} md={3} lg={2}></Grid>
      <Grid xs={6} sm={4} md={6} lg={2}></Grid>
      <Grid xs={4} sm={12} md={12} lg={12}>
        <WeatherChart></WeatherChart>
      </Grid>
      <Grid lg={6}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid lg={6}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
      </Grid>
      <Grid xs={4} sm={12} md={12} lg={12}>
        <Grid lg={9}>
          <BasicTable />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
