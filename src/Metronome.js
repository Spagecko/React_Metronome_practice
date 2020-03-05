
import click1 from './click1.wav';
import click2 from './click2.wav';
import React, { Component } from 'react';
import './Metronome.css';

var green = '#39D1B4';
var yellow = '#FFD712';
class Metronome extends Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            playing: false,
            count: 0 , 
            bpm: 100,
            beatsPerMeasure: 2,
            numberOfDots:2,
            arrayDots:[]
         
        };
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);

    }
    handleBpmChange = event =>{
        const bpm = event.target.value;
        
        if ( this.state.playing)
        {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            this.setState(
                {
                    count : 0, 
                    bpm
                }
            );
        }
        else
        {
            this.setState({bpm});
        }
    };

    handleBeatsPerMeasureChange = event =>
    {
        const beatsPerMeasure = event.target.value;
        const  numberOfDots = event.target.value;
        const arrayDots = [];
        var join;
        this.setState({
            
            arrayDots:[]
        }) // clearing dots
        for(var i = 0 ; i < numberOfDots ; i++)
        {
          join =this.state.arrayDots.push(i);
            this.setState({arrayDots:join})
        }
        if ( this.state.playing)
        {
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);

            this.setState(
                {
                    count : 0, 
                    beatsPerMeasure,
                    numberOfDots,
                    arrayDots
                }
            );
        }
        else
        {
            
            this.setState({beatsPerMeasure});
            this.setState({numberOfDots});
            this.setState({arrayDots});
        }

    };


    

    startStop = () =>
    {
       if ( this.state.playing)
       {
           clearInterval(this.timer);
           this.setState({
               playing: false
           });
       }
       else
       {
           this.timer = setInterval(
               this.playClick, (6 / this.state.bpm) * 1000
           );
           this.setState(
               {
                   count: 0,
                   playing: true
               },
               this.playClick
               
           );

       }
    };
    toggleColor = () =>
    {
        const newColor1 = this.state.color == green ? yellow : green;
        const newColor2 = this.state.color == green ? yellow : green;
       this.setState
       (
           {
            dotColor1: newColor1,
            dotColor2: newColor2
           }
       )

    };

    playClick = () => 
    {
        const{ count, beatsPerMeasure} = this.state; 


      
        if(count % beatsPerMeasure === 0)
        {
            this.click2.play();
            this.setState
            (
                {
                 dotColor1: green,
                 dotColor2: yellow
                }
            )
       
        

        }
        else
        {
            this.click2.play();
            this.setState
            (
                {
                 dotColor1: yellow,
                 dotColor2: green
                }
            )
       
        }

        this.setState(state => ({
            count: (state.count + 1 ) % state.beatsPerMeasure
        }));
        
    };
 
    render() {
        const{playing, bpm , beatsPerMeasure, arrayDots, numberOfDots , count} = this.state;
        const dots = numberOfDots;
        const arrayDot = [];
        for(var i = 0 ; i < dots ; i++)
        {
            
            arrayDot.push(i);
        }
        const rowDots = arrayDot.map((dot)=>
        <div class = "dot" id = {dot} ></div>);
    return (
      <div className="metronome">
        <div className="bpm-slider">
        <h2>beats per minute </h2>
          <div>{bpm} BPM</div>
          <input type="range" min="60" max="240" value={bpm} 
          onChange = {this.handleBpmChange}/>
          </div>

       
        <div className ="beats-slider">
        <h2>beats per measure </h2>
        <div>{beatsPerMeasure}</div>
          <input type="range" min="2" max="10" value={beatsPerMeasure} 
          onChange = {this.handleBeatsPerMeasureChange}/>
        </div>
        
         
        <button onClick = {this.startStop}>
        {playing ? 'Stop' : 'Start'}
        </button>
        <h2>count</h2>
        <div><h3>{count + 1}</h3></div>
        <div class = "counter">
        <ul>{rowDots}    </ul>

      </div>
      </div>
    );
   
  }
}

export default Metronome;
