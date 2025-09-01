load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_timer.js');
load('api_sys.js');
load('api_pwm.js');
load('servo.js');
load('api_rpc.js');

let appData = Cfg.get('appData');
if(!appData){
  appData = {
    arm : {
      position : -90,
      open: -90,
      closed: 90
    }
  }
}

Cfg.set({appData : appData});

print('++++++++++++++++++++++++');
print(JSON.stringify(appData));
print('++++++++++++++++++++++++');

let state = {uptime: 0};             // arm_position: 0 wait. 1 push

move_arm(appData.arm.position);

function loop(){
  state.uptime = Math.round(Sys.uptime());
  print(JSON.stringify(state));

}

Timer.set(1000, Timer.REPEAT, loop, null);



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
  let duty = move_arm(appData.arm.open);
  return duty;
});

RPC.addHandler("CloseArm", function(args){
  let duty = move_arm(appData.arm.closed);
  return duty;
});