load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_timer.js');
load('api_sys.js');
load('api_pwm.js');
load('servo.js');
load('api_rpc.js');


let state = {uptime: 0, arm_position: -1};             // arm_position: 0 wait. 1 push
let btn = Cfg.get('board.btn1.pin'); 


function loop(){
  state.uptime = Math.round(Sys.uptime());
  print(JSON.stringify(state));

}
// Update state every second
// Timer.set(1000, Timer.REPEAT, loop, null);

/* 
GPIO.set_button_handler(btn, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 20, function() {
    print('========== BUTTON PRESSED ==========');
    // state.arm_position = (state.arm_position + 1) % 6;
    state.arm_position = (state.arm_position + 1);
    move_arm(state.arm_position);
    print('========== EOF BUTTON PRESSED ======');
}, null); 
*/


RPC.addHandler("Duty", function(args){
  print(JSON.stringify(args));
  setDuty(args.duty);
  return args.duty;
});

RPC.addHandler("MoveArm", function(args){
  print(JSON.stringify(args));
  let duty = move_arm(args.angle);
  return duty;
});

RPC.addHandler("OpenArm", function(args){
  let duty = move_arm(-90);
  return duty;
});

RPC.addHandler("CloseArm", function(args){
  let duty = move_arm(90);
  return duty;
});