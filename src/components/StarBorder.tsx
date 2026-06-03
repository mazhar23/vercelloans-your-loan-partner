import React from "react";
import "./StarBorder.css";

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = "span",
  className = "",
  color = "#00be8f",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}) => {
  const { style, ...restWithoutStyle } = rest;
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        ...style
      }}
      {...restWithoutStyle}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
