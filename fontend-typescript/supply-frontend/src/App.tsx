import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import { Home } from "./pages/Home";
import { CreateUser } from "./pages/CreateUser";
import { Profile } from "./pages/Profile";
import { CreateProduct } from "./pages/CreateProduct";
import { useLink } from "./hooks/useLink";
import { Default } from "./pages/Default";
import { AuthenticationContextProvider } from "./contexts/globalContext";
import { Road } from "./pages/Road";
import { Admin } from "./pages/Admin";
import { View } from "./pages/View";
import { ViewDetail } from "./pages/ViewDetail";

function App() {
  const link = useLink();

  return (
    <SnackbarProvider maxSnack={1}>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path={link.viewDetail() + "/:id" } element={<ViewDetail />} />
              <Route path={link.view()} element={<View />} />
              <Route path={link.login()} element={<Login />} />
              <Route path={link.road() + "/:id"} element={<Road />} />
              <Route path={link.signUp()} element={<CreateUser />} />
              <Route path={link.home()} element={<Home />} />
              <Route path={link.createProduct()} element={<CreateProduct />} />
              <Route path={link.admin()} element={<Admin />} />
              <Route path={link.profile() + "/:id"} element={<Profile />} />
              <Route path={link.default()} element={<Default />} />
            </Routes>
          </BrowserRouter>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
