// math fucntion 
function radiansToDegrees(radians) {
    return   radians * (180 / Math.PI);
}
function degreesToRadians(degrees) 
{
    return degrees * (Math.PI / 180);
}

function random (min,max){
    return ((Math.random()*(max-min))+min);
}
// ==================================
// exporting
export  { radiansToDegrees  , random , degreesToRadians};
