import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
    const role = localStorage.getItem("role");


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/')
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Ha-Mi Coffee House
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={() => setLogoutDialogOpen(true)}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>

          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Kahve Sipariş İşlemleri" />
          </ListItem>

          {role === 'ROLE_ADMIN' && (
            <>
              <ListItem button onClick={() => navigate("/coffee-crud")}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Kahve Yönetim Sayfası" />
              </ListItem>

              <ListItem button onClick={() => navigate("/available-product-crud")}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Ürün Yönetim Sayfası" />
              </ListItem>

              <ListItem button onClick={() => navigate("/user-crud")}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Kullanıcı Yönetim Sayfası" />
              </ListItem>
            </>

          )}

        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: open ? `${drawerWidth}px` : 0,
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        {children}
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Çıkış Yap</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Çıkış yapmak istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
            Hayır
          </Button>
          <Button
            onClick={handleLogout}
            color="primary"
            autoFocus
            variant="contained"
          >
            Evet, çıkış yap
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DefaultLayout;
