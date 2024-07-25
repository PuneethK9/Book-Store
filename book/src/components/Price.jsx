import * as React from 'react';
import "../assets/Price.css";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';

function valuetext(value) {
    //console.log(value);
}

const minDistance = 100;

export default function Price({Pricedata}) {
  const [value1, setValue1] = React.useState([100, 1500]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }

  };

  useEffect(()=>{
    Pricedata(value1);
  },[value1]);

  return (

    <div className='h-100 w-100'>

        <div id="pricecont">

            <Box sx={{ width:"90%"}}>

                <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={100}
                max={1500}
                disableSwap
                sx={{color:"blueviolet"}}
                />

            </Box>
        </div>

        <div id='pricebtn'>
            <input onChange={(e)=>{setValue1([e.target.value,value1[1]])}} value={value1[0]} id='pbtn' type='number' min={100} max={value1[1]-100}></input>
            <input onChange={(e)=>{setValue1([value1[0],e.target.value])}} value={value1[1]} id='pbtn' type='number' min={value1[0]+100} max={1500}></input>
        </div>

    </div>
                    
  );
}

