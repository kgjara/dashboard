
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './App.css'
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';

function App() {

  {/* 
         1. Agregue la variable de estado (dataTable) y función de actualización (setDataTable).
     */}

  let [rowsTable, setRowsTable] = useState([])

  {/* Variable de estado y función de actualización */ }
  //let[variable,setVariable] = useState(-1);
  let [indicators, setIndicators] = useState([])


  {/* Hook: useEffect */ }

  useEffect(() => {


    (async () => {

      {/* Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */ }

      let savedTextXML = localStorage.getItem("openWeatherMap")
      let expiringTime = localStorage.getItem("expiringTime") //cache guardada en el navegador

      {/* Estampa de tiempo actual */ }

      let nowTime = (new Date()).getTime();

      {/* Realiza la petición asicrónica cuando: 
                 (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
                 (2) La estampa de tiempo actual es mayor al tiempo de expiración */}

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {

        {/* Request */ }

        let API_KEY = "56d8803fc7e622813c339634933e49f7"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        savedTextXML = await response.text();

        {/* Diferencia de tiempo */ }

        let hours = 1
        let delay = hours * 3600000


        {/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */ }

        localStorage.setItem("openWeatherMap", savedTextXML)
        localStorage.setItem("expiringTime", (nowTime + delay).toString())

      }
      {/* XML Parser */ }

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");


      {/* Arreglo para agregar los resultados */ }

      let dataToIndicators = new Array()

      {/* 
                  Análisis, extracción y almacenamiento del contenido del XML 
                  en el arreglo de resultados
              */}

      let location = xml.getElementsByTagName("location")[1]

      /*let city = xml.getElementsByTagName("name")[0].innerHTML
      dataToIndicators.push(["city", "Ciudad", city])*/

      let geobaseid = location.getAttribute("geobaseid")
      dataToIndicators.push(["Location", "geobaseid", geobaseid])

      let latitude = location.getAttribute("latitude")
      dataToIndicators.push(["Location", "Latitude", latitude])

      let longitude = location.getAttribute("longitude")
      dataToIndicators.push(["Location", "Longitude", longitude])

      //console.log(dataToIndicators)

      {/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

      let indicatorsElements = Array.from(dataToIndicators).map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      )

      {/* Modificación de la variable de estado mediante la función de actualización */ }

      setIndicators(indicatorsElements)

      // 2. Procese los resultados de acuerdo con el diseño anterior. Revise la estructura del documento XML para extraer los datos necesarios.
      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");

        let temperatureElement = timeElement.getElementsByTagName("temperature")[0];
        let temperature = temperatureElement.getAttribute("value") + " " + temperatureElement.getAttribute("unit");

        let pressureElement = timeElement.getElementsByTagName("pressure")[0];
        let pressure = pressureElement.getAttribute("value") + " " + pressureElement.getAttribute("unit");

        let humidityElement = timeElement.getElementsByTagName("humidity")[0];
        let humidity = humidityElement.getAttribute("value") + " " + humidityElement.getAttribute("unit");

        let cloudsElement = timeElement.getElementsByTagName("clouds")[0];
        let clouds = cloudsElement.getAttribute("all") + " " + cloudsElement.getAttribute("unit");

        return { rangeHours, windDirection, temperature, pressure, humidity, clouds };

      });

      arrayObjects = arrayObjects.slice(0, 8);

      // 3. Actualice de la variable de estado mediante la función de actualización
      setRowsTable(arrayObjects);

    })()


  }, [])

  return (
    <Grid container spacing={3}>
      <Grid xs={12} >
        <Summary></Summary>
      </Grid>
      <Grid container spacing={3} xs={12}>
        {indicators.map((indicator, index) => (
          <Grid key={index} xs={12} sm={4} md={4}>
            {indicator}
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} xs={12}>
      <Grid xs={12} sm={6} md={4}>
        <ControlPanel />
        </Grid>
        <Grid xs={12} sm={6} md={8}>
        <WeatherChart></WeatherChart>
        </Grid>
        </Grid>
      <Grid xs={12}>
        <BasicTable rows={rowsTable}></BasicTable>
      </Grid>
    </Grid>
  )
}

export default App
