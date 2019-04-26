import React,{Component} from 'react';
import './index.css';
import Titles from './components/titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API='6b4b5e845a9c9f1ff580a2e1a3d940c9';
class App extends Component {
  state={
       temp:undefined,
       city:undefined,
       country:undefined,
       humidity:undefined,
       description:undefined,
       error:undefined    
  } 

  getWeather= async (e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    const API_CALL=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}&units=metric`);
    const data=await API_CALL.json();

    if(city && country){
    console.log(data);

    this.setState({
      temp:data.main.temp,
      city:data.name,
      country:data.sys.country,
      humidity:data.main.humidity,
      description:data.weather[0].description,
      error:""
    }
    );}else{
      console.log(data);

      this.setState({
        temp:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:'Please enter all the values.'
      });
    }
  }



  render(){
  return (
    <div>
        <div className="wrapper ">
        <div className="main">
        <div className="container">
        <div className="row">
        <div className="col-5 title-container">
              <Titles />
        </div>
        <div className="col-7 form-container">
        <Form getWeather={this.getWeather}/>
          <Weather 
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
          />
         
        </div>
        </div>
        </div>
        </div>
        </div>
    </div>
  );
}
}


export default App;
