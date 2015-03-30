function init () {
  var canvasElement = document.querySelector("#canvas");

  var stage = new PIXI.Stage(0xcccccc);
  var renderer = new PIXI.autoDetectRenderer(800,600, canvasElement);

  var world = new World();

  _.times(11, function(){
    _.tap(new Bot(0x000000), function(bot){
      world.add(bot);
      world.setRandomPosition(bot);
    });
  });

  _.times(11, function(){
    _.tap(new Bot(0x0000FF), function(bot){
      world.add(bot);
      world.setRandomPosition(bot);
    });
  });

  _.times(1, function(){
    _.tap(new Ballon(), function(ballon){
      world.add(ballon);
      world.setRandomPosition(ballon);
    });
  });

    _.times(1, function(){
        _.tap(new CaseBut(), function(caseBut){
            world.add(caseBut);
            world.setRandomPosition(caseBut);
        });
    });

  //var bot = new Bot();
  //var resource = new Resource();

  stage.addChild(world.sprite);

  var prevTimestamp = 0;
  function animate(timestamp) {

    var deltaTime = timestamp - prevTimestamp;
    prevTimestamp += deltaTime;

    world.render(deltaTime);
    renderer.render(stage);

    requestAnimFrame(animate);
  }

  requestAnimFrame(animate);
}
