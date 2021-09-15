import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";


export default function Header() {
  return (
    <AppBar>
        <Toolbar>
            <Hidden>
                Ok
            </Hidden>
        </Toolbar>
    </AppBar>
  );
}