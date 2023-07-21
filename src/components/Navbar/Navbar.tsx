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

interface NavObject {
  label: string;
  icon: ReactElement;
}

const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  size,
  setCurrentPage,
}) => {
  const navList: NavObject[] = [
    { label: "Edit", icon: <ModeEditOutlinedIcon /> },
    { label: "Enter", icon: <AddCircleOutlinedIcon /> },
    { label: "List", icon: <ChecklistOutlinedIcon /> },
  ];

  return (
    <BottomNavigation
      style={
        size !== "small"
          ? {
              border: "2px solid #fff",
              borderRadius: "30px",
              backgroundColor: "transparent",
              width: "80px",
              height: "100%",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }
          : {
              borderTop: "2px solid #fff",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
              backgroundColor: "black",
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
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
