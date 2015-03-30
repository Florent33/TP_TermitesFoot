/*
    TP: Florent FERRAND
 */
function World() {

  var WIDTH = 800;
  var HEIGHT = 600;
  var WALL_THICKNESS = 50;

  var agents = [];

  var botsContainer = new PIXI.DisplayObjectContainer();

  var ground    = Matter.Bodies.rectangle(WIDTH/2,
                                          HEIGHT-WALL_THICKNESS/2,
                                          WIDTH,
                                          WALL_THICKNESS,
                                          { isStatic: true });

  var leftWall  = Matter.Bodies.rectangle(WALL_THICKNESS/2,
                                          HEIGHT/2,
                                          WALL_THICKNESS,
                                          HEIGHT,
                                          { isStatic: true });

  var rightWall = Matter.Bodies.rectangle(WIDTH - WALL_THICKNESS/2,
                                          HEIGHT/2,
                                          WALL_THICKNESS,
                                          HEIGHT,
                                          { isStatic: true });

  var topWall   = Matter.Bodies.rectangle(WIDTH/2,
                                          WALL_THICKNESS/2,
                                          WIDTH,
                                          WALL_THICKNESS,
                                          { isStatic: true });
    var caseButGauche = Matter.Bodies.rectangle((WALL_THICKNESS+WALL_THICKNESS)/2,
        WALL_THICKNESS/2,
        5,
        50,
        { isStatic: true });

    var caseButDroit = Matter.Bodies.rectangle(WIDTH,
        WALL_THICKNESS/2,
        5,
        50,
        { isStatic: true });

    var spriteGauche = new PIXI.Graphics();
    spriteGauche.beginFill("#FFFFAA");
    spriteGauche.drawRect((WALL_THICKNESS+WALL_THICKNESS)/2, HEIGHT/2, 5, 50);
    spriteGauche.endFill();

    var spriteDroite = new PIXI.Graphics();
    spriteDroite.beginFill("#FFFFAA");
    spriteDroite.drawRect(WIDTH - ((WALL_THICKNESS+WALL_THICKNESS)/2), HEIGHT/2, 5, 50);
    spriteDroite.endFill();

    botsContainer.addChild(spriteGauche);
    botsContainer.addChild(spriteDroite);

  var physics = new Physics(WIDTH, HEIGHT, WALL_THICKNESS);
  physics.addBody(ground);
  physics.addBody(leftWall);
  physics.addBody(rightWall);
  physics.addBody(topWall);
    physics.addBody(caseButGauche);
    physics.addBody(caseButDroit);


  function add (agent) {
    agents.push(agent);
    botsContainer.addChild(agent.sprite);
    physics.addBody(agent.getBody());
    agent.getBody().agent = agent;
  }

  function setRandomPosition(agent) {
    agent.setPosition({x:WALL_THICKNESS + Math.random() * WIDTH - WALL_THICKNESS*2,
                       y:WALL_THICKNESS + Math.random() * HEIGHT - WALL_THICKNESS*2});
  }

  var physicsHelper = {
    attachAgents: function (agentA, agentB, stiffness) {
      var constraint = Matter.Constraint.create({bodyA:agentA.getBody(), bodyB:agentB.getBody(), stiffness:stiffness});
      physics.addConstraint(constraint);

      return constraint;
    },
    detachAgents: function (constraint) {
      physics.removeConstraint(constraint);
    }
  };


  function processCollisions() {
    var collisions = physics.collisions();
    _.each(collisions, function(collision) {
      if(collision.bodyA.agent && collision.bodyB.agent) {
        collision.bodyA.agent.handleCollision(collision.bodyB.agent, physicsHelper);
        collision.bodyB.agent.handleCollision(collision.bodyA.agent, physicsHelper);
      }
    });
  }

  function render (deltaTime) {
    agents.forEach(function(agent) {
      agent.update(deltaTime);
    });

    physics.update(deltaTime);
    //physics.patchPositions();
    processCollisions();
  }

  return extend(null, {
    add: add,
    render: render,
    sprite: botsContainer,
    agents: agents,

    setRandomPosition: setRandomPosition
  });
}
