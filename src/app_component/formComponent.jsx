import React from 'react'
import "./FormStyle.css";

function formComponent({loadWeather , error}) {
    return (
        <div className="container">
        <div>{error ? Error():null}</div>
        <form onSubmit={loadWeather}>
          <div className="row">
            <div className="col-md-3 offset-md-2">
                <input type="text" name="city"  className="form-control" autoComplete="off" placeholder="City"/>
            </div>
            <div className="col-md-3">
            <input type="text" name="country" className="form-control" autoComplete="off" placeholder="Country"/>
            </div>
            <div className="col-md-3 py-2">
            <button className="btn btn-warning mt-md-0 text-md-left" >Search</button>
            </div>
            </div>
            </form>
        </div>
    )
    function Error(){
        return(
            <div className="alert alert-danger mx-5 text-uppercase" role= "alert">Please Enter the city and country</div>
        );
    };
}




export default formComponent
