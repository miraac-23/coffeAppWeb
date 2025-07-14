import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import DefaultLayout from "./layout/DefaultLyout";
import AvailableProductManagementPage from "./pages/AvailableProductManagementPage";
import CoffeeManagementPage from "./pages/CoffeCrudPage";
import CoffeeDetailPage from "./pages/CoffeeDetailPage";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import UserManagementPage from "./pages/UserManagerPage";
import theme from "./theme/theme";

function App() {
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        hideIconVariant
        dense
        maxSnack={5}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        preventDuplicate
      >
        {!token ? (
          <LoginForm />
        ) : (
          <Router>
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/coffee-detail" element={<CoffeeDetailPage />} />
                <Route path="/coffee-crud" element={<CoffeeManagementPage />} />
                <Route path="/available-product-crud" element={<AvailableProductManagementPage />} />
                <Route path="/user-crud" element={<UserManagementPage />} />
                <Route path="/order/:id" element={<OrderPage />} />

              </Routes>
            </DefaultLayout>
          </Router>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

