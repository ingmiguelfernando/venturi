import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useAppContext } from "../../context";
import { useRouter } from "next/router";

export const SearchAppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const id = isMenuOpen ? "simple-popover" : undefined;
  const { logout } = useAppContext();
  const router = useRouter();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className="md:hidden">
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => setIsMenuOpen(!isMenuOpen)} size="large">
              <MenuIcon />
              <Popover id={id} open={isMenuOpen} anchorReference="anchorPosition" anchorPosition={{ top: 55, left: 10 }}>
                <div className="bg-black h-28 w-60 block p-4 capitalize">
                  <Button color="secondary">Learning pathways</Button>
                  <Button color="secondary">Aircraft library</Button>
                </div>
              </Popover>
            </IconButton>
          </div>

          <div className="hidden md:flex">
            <Image src="/venturi_logo.png" alt="logo" layout="fixed" width={260} height={45} />
          </div>
          <div className="ml-auto hidden md:flex">
            <Button color="inherit" className="capitalize">
              Learning pathways
            </Button>
            <Button color="inherit" className="capitalize">
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
                  <div className="bg-black h-28 w-60 grid p-4">
                    <Button color="secondary" onClick={logout}>
                      Sign out
                    </Button>
                    <Button color="secondary" onClick={() => router.push("/admin/courses")}>
                      Courses
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
