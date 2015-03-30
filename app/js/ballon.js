function Ballon() {
    var RESOURCE_RADIUS = 10;
    var RESOURCE_COLOR = 0xFF0000;
    var TirePar = "";

    var agent = new Agent("Ballon", RESOURCE_RADIUS, RESOURCE_COLOR);

    var attached = [];

    function handleCollision(collided, physics){
        if(collided.type === "Ballon"){
            if(!_.contains(attached, collided)){

                physics.attachAgents(agent, collided, 0.1);
                attached.push(collided);
                Console(collided.getColor());
            }
        }
    }

    function update(deltaTime) {
        agent.update(deltaTime);

        if(agent.handleCollision()){

        }
    }

    return extend(agent, {
        handleCollision: handleCollision
    });
}
