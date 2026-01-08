let a={name:'piyush', age:20 , grade:'A'};//making object

a.country={   //object within object
    india:{
        city1:'delhi',
        city2:'bangalore',   
        city3:'kolkata',
    }

}
console.log(a); //main object
console.log(a.country.india.city1); //accessing nested object value
  
console.log(a.name.toUpperCase()); //string method to convert to uppercase
console.log(a.name.length); //string method to find length of string