import React from 'react';

function WeatherComponent(
    {city , celsius , temp_max , temp_min ,icon , description }
   ) 
    
    {
    return (
<div>
<div className="container text-white mt-2 shadow-lg">
    <div className="cards pt-4">
    <h1 className="shadow-lg">{city}</h1>
        <h5 className="py-4">
            <i className={`wi ${icon} display-1 `}/>
        </h5>
        {celsius ? <h1 className="py-2">{celsius}&deg;</h1> : null}
    
        {/* Show min and max temp */}
        {minmaxTemp(temp_min, temp_max)}
    <h3 className="p-3">{description.toUpperCase()}</h3>
    </div>
</div>
</div>
)
}



function minmaxTemp(min,max) {
   if(min && max) {
    return (
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>

        </h3>
    )
   }
}

export default WeatherComponent
