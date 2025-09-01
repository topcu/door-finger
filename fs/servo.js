// Servo calibration values
let dutyMin = 0.0210167;
let dutyMax = 0.1285434;
let dutyZero = 0.0747801;   // Your measured "0°"
let rangeNeg = -90;         // Measured -90° at duty ≈ 0.027
let dutyNeg90 = 0.027;
let rangePos = 90;          // Measured +90° at duty ≈ 0.124
let dutyPos90 = 0.124;

let angleOffset = 0;        // Global offset adjustment (e.g. +5°)

function setDuty(duty){
    PWM.set(13, 50, duty);
}



// Map degree to duty cycle
function angleToDuty(angle) {
  angle += angleOffset; // apply offset

  let duty;
  if (angle < 0) {
    // interpolate between -90° and 0°
    duty = dutyNeg90 + (dutyZero - dutyNeg90) * (angle - rangeNeg) / (0 - rangeNeg);
  } else {
    // interpolate between 0° and +90°
    duty = dutyZero + (dutyPos90 - dutyZero) * (angle - 0) / (rangePos - 0);
  }

  // Clamp to physical servo min/max
  if (duty < dutyMin) duty = dutyMin;
  if (duty > dutyMax) duty = dutyMax;

  return duty;
}





function move_arm(angle) {
    let duty_debug = { angle: angle, duty: angleToDuty(angle), };
     print('====================');
     print(JSON.stringify(duty_debug));
     setDuty(duty_debug.duty);
     print('====================');
     return duty_debug.duty;
}

