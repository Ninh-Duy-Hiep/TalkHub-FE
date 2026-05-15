import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuthInit } from "./features/auth/hooks/useAuthInit";

function App() {
  useAuthInit();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 8,
          fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            siderBg: "#ffffff",
          },
          Menu: {
            itemActiveBg: "#eff6ff",
            itemSelectedBg: "#eff6ff",
            itemSelectedColor: "#2563eb",
          },
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
