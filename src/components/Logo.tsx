import React, { FC } from "react";
import LogoImg from "../assets/images/logo.png";

interface LogoProps {
  width: number;
  height: number;
}

const Logo: FC<LogoProps> = ({ width, height }) => (
  <img src={LogoImg} width={width} height={height} alt="logo" />
);

export default Logo;
