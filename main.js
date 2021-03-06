var itemCollection = document.querySelectorAll(".shown");
var elem = itemCollection[0];

window.onload = function() {
  elem.classList.remove("shown");

  setTimeout(() => {
    elem.classList.add("shown-second");
    AOS.init();
  }, 1900);
};

setTimeout(function() {
  (function startAnimation() {
    window.CanvasSlideshow = function(options) {
      //  SCOPE
      /// ---------------------------

      var that = this;

      //  OPTIONS
      /// ---------------------------
      options = options || {};
      // options.stageWidth = options.hasOwnProperty("stageWidth") ? options.stageWidth : 800;
      // options.stageHeight = options.hasOwnProperty("stageHeight")
      //   ? options.stageHeight
      //   : 800;
      options.pixiSprites = options.hasOwnProperty("sprites")
        ? options.sprites
        : [];
      options.centerSprites = options.hasOwnProperty("centerSprites")
        ? options.centerSprites
        : false;
      options.autoPlay = options.hasOwnProperty("autoPlay")
        ? options.autoPlay
        : true;
      options.autoPlaySpeed = options.hasOwnProperty("autoPlaySpeed")
        ? options.autoPlaySpeed
        : [10, 3];
      options.fullScreen = options.hasOwnProperty("fullScreen")
        ? options.fullScreen
        : true;
      options.displacementImage = options.hasOwnProperty("displacementImage")
        ? options.displacementImage
        : "";
      options.displaceAutoFit = options.hasOwnProperty("displaceAutoFit")
        ? options.displaceAutoFit
        : false;
      options.wacky = options.hasOwnProperty("wacky") ? options.wacky : false;
      options.interactive = options.hasOwnProperty("interactive")
        ? options.interactive
        : false;
      options.interactionEvent = options.hasOwnProperty("interactionEvent")
        ? options.interactionEvent
        : false;
      options.displacementCenter = options.hasOwnProperty("displacementCenter")
        ? options.displacementCenter
        : false;
      options.dispatchPointerOver = options.hasOwnProperty(
        "dispatchPointerOver"
      )
        ? options.dispatchPointerOver
        : false;

      //  PIXI VARIABLES
      /// ---------------------------
      var renderer = new PIXI.autoDetectRenderer(
        options.stageWidth,
        options.stageHeight,
        { transparent: true }
      );
      var stage = new PIXI.Container();
      var slidesContainer = new PIXI.Container();
      var displacementSprite = new PIXI.Sprite.fromImage(
        options.displacementImage
      );
      var displacementFilter = new PIXI.filters.DisplacementFilter(
        displacementSprite
      );

      /// ---------------------------
      //  INITIALISE PIXI
      /// ---------------------------
      this.initPixi = function() {
        // Add canvas to the HTML
        //document.body.appendChild( renderer.view );
        document.getElementById("js-canvas-wrapper").appendChild(renderer.view);

        // Add child container to the main container
        stage.addChild(slidesContainer);

        // Enable Interactions
        stage.interactive = false;

        // Fit renderer to the screen
        if (options.fullScreen === true) {
          renderer.view.style.objectFit = "cover";
          renderer.view.style.objectPosition = "center";
          renderer.view.style.width = "100%";
          renderer.view.style.height = "100%";
          // renderer.view.style.backgroundColor = "red";
          // renderer.view.style.left = "50%";
          renderer.view.style.webkitTransform = "scale(1)";
          renderer.view.style.transform = "scale(1)";
        } else {
          renderer.view.style.maxWidth = "100%";

          // renderer.view.style.top = "50%";
          // renderer.view.style.left = "50%";
          renderer.view.style.webkitTransform = "translate( -50%, -50% )";
          renderer.view.style.transform = "translate( -50%, -50% )";
        }

        displacementSprite.texture.baseTexture.wrapMode =
          PIXI.WRAP_MODES.REPEAT;

        // Set the filter to stage and set some default values for the animation
        stage.filters = [displacementFilter];

        if (options.autoPlay === false) {
          displacementFilter.scale.x = 0;
          displacementFilter.scale.y = 0;
        }

        if (options.wacky === true) {
          displacementSprite.anchor.set(0.5);
          displacementSprite.x = renderer.width / 2;
          displacementSprite.y = renderer.height / 2;
        }
        // displacementFilter.style.backgroundColor = "rgba(0,0,0,1)";

        displacementSprite.scale.x = 2;
        displacementSprite.scale.y = 2;

        // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
        displacementFilter.autoFit = options.displaceAutoFit;

        stage.addChild(displacementSprite);
      };

      /// ---------------------------
      //  LOAD SLIDES TO CANVAS
      /// ---------------------------
      this.loadPixiSprites = function(sprites) {
        var rSprites = options.sprites;

        for (var i = 0; i < rSprites.length; i++) {
          var texture = new PIXI.Texture.fromImage(sprites[i]);
          var image = new PIXI.Sprite(texture);

          if (options.centerSprites === true) {
            image.anchor.set(0.5);
            image.x = renderer.width / 2;
            image.y = renderer.height / 2;
          }

          slidesContainer.addChild(image);
        }
      };

      /// ---------------------------
      //  DEFAULT RENDER/ANIMATION
      /// ---------------------------
      if (options.autoPlay === true) {
        var ticker = new PIXI.ticker.Ticker();

        ticker.autoStart = options.autoPlay;

        ticker.add(function(delta) {
          displacementSprite.x += options.autoPlaySpeed[0] * delta;
          displacementSprite.y += options.autoPlaySpeed[1];
          renderer.render(stage);
        });
      } else {
        var render = new PIXI.ticker.Ticker();

        render.autoStart = true;

        render.add(function(delta) {
          renderer.render(stage);
        });
      }

      /// ---------------------------
      //  INIT FUNCTIONS
      /// ---------------------------

      this.init = function() {
        that.initPixi();
        that.loadPixiSprites(options.pixiSprites);
      };

      this.init();
    };
  })();

  const svgPath = document.querySelectorAll(".path");
  var spriteImagesSrc = [];
  spriteImagesSrc.push(
    "https://raw.githubusercontent.com/artur8800/presentation/master/jungle.jpg"
  );

  var initCanvasSlideshow = new CanvasSlideshow({
    sprites: spriteImagesSrc,
    displacementImage:
      "https://raw.githubusercontent.com/Pierrinho/elephant/master/pattern-clouds.jpg",
    autoPlay: true,
    centerSprites: true,
    fullScreen: true,
    autoPlaySpeed: [1, 0],

    interactionEvent: "click", // 'click', 'hover', 'both'
    displaceAutoFit: true,
    displacementCenter: true,
    dispatchPointerOver: false // restarts pointerover event after click
  });
}, 1000);
