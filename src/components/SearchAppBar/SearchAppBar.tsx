import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Image from "next/image";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useAppContext } from "../../context";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  typography: { button: { textTransform: "capitalize" } },
  spacing: 25,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },

  menuButtonPopOver: {
    margin: "3px",
    width: "100%",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const id = isMenuOpen ? "simple-popover" : undefined;
  const { logout } = useAppContext();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className="md:hidden">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon />
                <Popover
                  id={id}
                  open={isMenuOpen}
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 55, left: 10 }}
                >
                  <div className="bg-black h-28 w-60 block p-4">
                    <Button
                      color="secondary"
                      classes={{ root: classes.menuButtonPopOver }}
                    >
                      Learning pathways
                    </Button>
                    <Button
                      color="secondary"
                      classes={{ root: classes.menuButtonPopOver }}
                    >
                      Aircraft library
                    </Button>
                  </div>
                </Popover>
              </IconButton>
            </div>

            <div className="hidden md:flex">
              <Image
                src="/venturi_logo.png"
                alt="logo"
                layout="fixed"
                width={260}
                height={45}
              />
            </div>
            <div className="ml-auto hidden md:flex">
              <Button color="inherit" classes={{ root: classes.menuButton }}>
                Learning pathways
              </Button>
              <Button color="inherit" classes={{ root: classes.menuButton }}>
                Aircraft library
              </Button>
            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    {...bindTrigger(popupState)}
                    color="inherit"
                  >
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
                      <Button
                        color="secondary"
                        classes={{ root: classes.menuButtonPopOver }}
                        onClick={logout}
                      >
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
    </ThemeProvider>
  );
};
