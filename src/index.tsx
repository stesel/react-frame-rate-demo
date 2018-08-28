import * as React from "react";
import * as ReactDOM from "react-dom";
import { BaseUpdateProps, withReactFrameRate } from "react-frame-rate";

type CircleProps = Readonly<{
  deg: number;
  frameRate: number;
}> &
  BaseUpdateProps;

class Circle extends React.PureComponent<CircleProps> {
  private static radius = 100;

  public render() {
    const rad = ((this.props.deg - 90) / 180) * Math.PI;
    return (
      <div>
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          <circle
            cx={Circle.radius}
            cy={Circle.radius}
            r="99"
            stroke="black"
            strokeWidth="1"
            fill="yellow"
          />
          <line
            x1={Circle.radius}
            y1={Circle.radius}
            x2={Circle.radius + Circle.radius * Math.cos(rad)}
            y2={Circle.radius + Circle.radius * Math.sin(rad)}
            strokeWidth="1"
            stroke="red"
          />
          <text x="70" y="50" fill="black">{`FPS: ${
            this.props.frameRate
          }`}</text>
        </svg>
      </div>
    );
  }
}

const updateState = (state: CircleProps) => {
  const newDeg = (state.deg + 60 / state.frameRate) % 360;
  return {
    ...state,
    deg: newDeg
  };
};

const initialState = {
  deg: 0,
  frameRate: 60,
  isAnimating: true
};

const options = {
  frameRate: 60,
  updateState
};

const WithAnimation60fps = withReactFrameRate<CircleProps>(options)((props) => (
    <div style={{display: "flex"}}>
        <Circle {...props} />
        <Circle {...props} />
        <Circle {...props} />
    </div>
));
const WithAnimation30fps = withReactFrameRate<CircleProps>({
  ...options,
  frameRate: 30
})((props) => (
    <div style={{display: "flex"}}>
        <Circle {...props} />
        <Circle {...props} />
        <Circle {...props} />
    </div>
));
const WithAnimation15fps = withReactFrameRate<CircleProps>({
  ...options,
  frameRate: 15
})((props) => (
    <div style={{display: "flex"}}>
        <Circle {...props} />
        <Circle {...props} />
        <Circle {...props} />
    </div>
));
const WithAnimation5fps = withReactFrameRate<CircleProps>({
  ...options,
  frameRate: 5
})((props) => (
    <div style={{display: "flex"}}>
        <Circle {...props} />
        <Circle {...props} />
        <Circle {...props} />
    </div>
));

const App = () => (
  <div>
    <WithAnimation60fps {...{ ...initialState, frameRate: 60 }} />
    <WithAnimation30fps {...{ ...initialState, frameRate: 30 }} />
    <WithAnimation15fps {...{ ...initialState, frameRate: 15 }} />
    <WithAnimation5fps {...{ ...initialState, frameRate: 5 }} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
