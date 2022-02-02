import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Image from "next/image";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useAppContext } from "../../context";

const Search = styled("div")(({ theme }) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },

  menuButtonPopOver: {
    margin: "3px",
    width: "100%",
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchAppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const id = isMenuOpen ? "simple-popover" : undefined;
  const { logout } = useAppContext();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className="md:hidden">
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => setIsMenuOpen(!isMenuOpen)} size="large">
              <MenuIcon />
              <Popover id={id} open={isMenuOpen} anchorReference="anchorPosition" anchorPosition={{ top: 55, left: 10 }}>
                <div className="bg-black h-28 w-60 block p-4 capitalize">
                  <Button color="secondary" classes={{}}>
                    Learning pathways
                  </Button>
                  <Button color="secondary" classes={{}}>
                    Aircraft library
                  </Button>
                </div>
              </Popover>
            </IconButton>
          </div>

          <div className="hidden md:flex">
            <Image src="/venturi_logo.png" alt="logo" layout="fixed" width={260} height={45} />
          </div>
          <div className="ml-auto hidden md:flex">
            <Button color="inherit" className="capitalize" classes={{}}>
              Learning pathways
            </Button>
            <Button color="inherit" className="capitalize" classes={{}}>
              Aircraft library
            </Button>
          </div>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <IconButton edge="end" aria-label="account of current user" {...bindTrigger(popupState)} color="inherit" size="large">
                  <AccountCircle />
                </IconButton>
                <Popover
                  {...bindPopover(popupState)}
                  id="popover-user"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <div className="bg-black h-28 w-60 block p-4">
                    <Button color="secondary" classes={{}} onClick={logout}>
                      Sign out
                    </Button>
                  </div>
                </Popover>
              </div>
            )}
          </PopupState>
        </Toolbar>
      </AppBar>
    </div>
  );
};
