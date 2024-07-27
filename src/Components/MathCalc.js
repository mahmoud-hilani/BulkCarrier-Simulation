// math fucntion 
function calcdegre(pi){
    return parseFloat(parseFloat((pi) * 360)/ (2 * Math.PI));
}
function calcRadean(degre){
    return (parseFloat(parseFloat((degre)*Math.PI)/180)/Math.PI);
}
function random (min,max){
    return ((Math.random()*(max-min))+min);
}
// ==================================
// exporting
export  { calcdegre , random , calcRadean};
