export const API_key="AIzaSyBn4XYnxX5eJOAFlbzcHkLSqrYABJrKm2Y";

export const value_Converter = (value) =>{
    if(value>=1000000){
        return Math.floor(value/1000000) + "M"
    }
   else if(value>=1000){
        return Math.floor(value/1000) + "K"
    }
    else{
        return value;
    }
}