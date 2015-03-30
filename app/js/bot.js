function Bot(CouleurEquipe) {
  var BOT_RADIUS = 3;
  var BOT_COLOR = CouleurEquipe;

  if (CouleurEquipe == null) {
    CouleurEquipe = 0x000000;
  }

  var agent = new Agent("Bot", BOT_RADIUS, BOT_COLOR);

  function setRandomVelocity(){
    Matter.Body.setVelocity(agent.getBody(), {x:Math.pow(-1,Math.round(Math.random()*10)) * 10 + Math.random()*2, y:Math.pow(-1,Math.round(Math.random()*10)) * 10 + Math.random()*2});
  }

  var delay = 0;

  function update(deltaTime) {
    agent.update(deltaTime);

    delay -= deltaTime;

    if(delay <= 0){
      setRandomVelocity();
      delay = 500 + Math.random() * 1000;
    }

  }

  function handleCollision(collided, physics){
    if(collided.type === "Bot"){
      if(!_.contains(attached, collided)){
        physics.attachAgents(agent, collided, 0.1);
        attached.push(collided);
      }
    }
  }

  return extend(agent, {
    update: update,

 });
}
