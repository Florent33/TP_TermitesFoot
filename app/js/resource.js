function Resource() {
  var RESOURCE_RADIUS = 4;
  var RESOURCE_COLOR = 0xFF0000;

  var agent = new Agent("Resource", RESOURCE_RADIUS, RESOURCE_COLOR);

  var attached = [];

 function handleCollision(collided, physics){
   if(collided.type === "Resource"){
     if(!_.contains(attached, collided)){
       physics.attachAgents(agent, collided, 0.1);
       attached.push(collided);
     }
   }
 }

 function update(deltaTime) {
   agent.update(deltaTime);
 }

 return extend(agent, {
   handleCollision: handleCollision
 });
}
