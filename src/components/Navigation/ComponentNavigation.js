import React from "react";
import { Link } from "react-router-dom";
import "./component.navigation.style.css";
import { Menu, MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link to="/about">About</Link>,
    key: "about",
  },
  {
    label: "Contact",
    key: "contact",
  },
];

export default function ComponentNavigation() {
  const [current, setCurrent] = React.useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
}
