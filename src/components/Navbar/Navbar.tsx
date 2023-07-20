import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";

interface NavbarProps {
  currentPage: string;
  size: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  size,
  setCurrentPage,
}) => {
  interface NavObject {
    label: string;
    icon: ReactElement;
  }
  const navList: NavObject[] = [
    { label: "Edit", icon: <ModeEditOutlinedIcon /> },
    { label: "Enter", icon: <AddCircleOutlinedIcon /> },
    { label: "List", icon: <ChecklistOutlinedIcon /> },
  ];
  return (
    <BottomNavigation
      style={
        size === "large"
          ? {
              border: "2px solid #fff",
              borderRadius: "30px",
              backgroundColor: "transparent",
              height: "100%",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }
          : {
              border: "2px solid #fff",
              borderRadius: "30px",
              backgroundColor: "black",
              width: "100%",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
            }
      }
      showLabels
      value={currentPage}
    >
      {navList.map((item, i) => (
        <NavItem
          key={i}
          color={item.label.toLowerCase() === currentPage ? "#FFC000" : "white"}
          label={item.label}
          icon={item.icon}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </BottomNavigation>
  );
};

interface NavItemProps {
  color: string;
  label: string;
  icon: React.ReactElement;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}
const NavItem: React.FC<NavItemProps> = ({
  color,
  label,
  icon,
  setCurrentPage,
}) => {
  return (
    <BottomNavigationAction
      style={{ color: color }}
      showLabel
      label={label}
      icon={icon}
      onClick={() => {
        console.log(label);
        setCurrentPage(label.toLowerCase());
      }}
    />
  );
};

export default Navbar;
