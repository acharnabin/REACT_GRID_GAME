import React, { useEffect, useMemo, useState } from "react";
import {
  Stage,
  Layer,
  Shape,
  Circle,
  Line,
  Image as KonvaImage,
  Group,
  
} from "react-konva";
import Konva from "konva";
import {
  applyToPoint,
  rotateDEG,
  translate,
  compose,
} from "transformation-matrix";
import Bunker from "../../media/Bunker.jpg";
import Water from "../../media/Water-texture.jpg";
import Green from "../../media/Green.jpg";
import Grass from "../../media/Grass.jpg";
import targetIcon from "../../media/pin-location-yellow.svg";

import { Helmet } from "react-helmet";
import Fairway from "../../media/Fairway.jpg";

const grnAreaWidth = 480;
const grnAreaHeight = 655;
const canvasBorder = 5;

const cornerPoints = [
  { x: 0, y: 0 },
  { x: 480, y: 0 },
  { x: 480, y: 740 },
  { x: 0, y: 740 },
];

const targetRedPoint={
  x: 200,
  y: 100,
}

const targetBluePoint={
  x: 100,
  y: 100,
}

const TestKonva = () => {
  const [greenPoints, setGreenPoints] = useState([
    {
      x: 0,
      y: 0,
    },
    {
      x: 48,
      y: 0,
    },
    {
      x: 38,
      y: 70,
    },
    {
      x: 0,
      y: 200,
    },
  ]);
  const imgGreen = useMemo(() => {
    const img = new Image();
    img.src = Green;
    return img;
  }, []);

  const imgWater = useMemo(() => {
    const img = new Image();
    img.src = Water;
    return img;
  }, []);

  const imgBunker = useMemo(() => {
    const img = new Image();
    img.src = Bunker;
    return img;
  }, []);

  const imgGrass = useMemo(() => {
    const img = new Image();
    img.src = Grass;
    return img;
  }, []);

  const imgFairway = useMemo(() => {
    const img = new Image();
    img.src = Fairway;
    return img;
  }, []);

  const imgTargetIcon = useMemo(() => {
    const img = new Image();
    img.src = targetIcon;
    return img;
  }, []);

  const get = (e) => {
    console.log(e.clientX, e.clientY);
  };

  return (
    <div onClick={get}>
      <h1>Test conva</h1>
      <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Stage width={grnAreaWidth} height={grnAreaHeight}>
        <Layer>
          <Shape
            sceneFunc={(context, shape) => {
              shape.fillPatternImage(imgGrass);
              context.beginPath();
              cornerPoints.map((point) => {
                context.lineTo(point.x, point.y);
              });
              context.closePath();
              context.fillStrokeShape(shape);
            }}
          />
          <Shape
            sceneFunc={(context, shape) => {
              shape.fillPatternImage(imgWater);
              context.beginPath();
              if (greenPoints.length) {
                greenPoints.forEach((point) => {
                  context.lineTo(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                  );
                });
              }

              context.closePath();
              context.fillStrokeShape(shape);
            }}
           
          />
          {/* REd points  */}
          <Circle x={targetRedPoint.x} y={targetRedPoint.y} radius={10} fill="red" />
          {/* green points */}
          <Circle x={targetBluePoint.x} y={targetBluePoint.y} radius={10} fill="blue" />
        
          <Group>
            <KonvaImage draggable image={imgTargetIcon}  onClick={(e)=>{console.log("CLICK",e);}}
            onTouchEnd={(e)=>{console.log("TOUCHEND",e)}}/>
                  <KonvaImage draggable image={imgTargetIcon}  onClick={(e)=>{console.log("CLICK",e);}}
            onTouchEnd={(e)=>{console.log("TOUCHEND",e)}}/>
          </Group>
          
        </Layer>

        {/* <Shape
          sceneFunc={(context, shape) => {
            shape.fillPatternImage(imgGreen);
            context.beginPath();
            if (greenPoints.length) {
              greenPoints.forEach((point) => {
                context.lineTo(point.x, point.y);
              });
            }
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          onTouchEnd={handler}
          onClick={handler}
        /> */}
      </Stage>
    </div>
  );
};

export default TestKonva;
