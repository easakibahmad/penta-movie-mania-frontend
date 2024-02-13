import React from "react";
import { Flex, Spin } from "antd";

const MovieLoader: React.FC = () => (
  <Flex align="center">
    <Spin size="large" />
  </Flex>
);

export default MovieLoader;
