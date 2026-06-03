import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ClientBooking } from "./pages/ClientBooking";
import { ClientAppointments } from "./pages/ClientAppointments";
import { ProfessionalSchedule } from "./pages/ProfessionalSchedule";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminServices } from "./pages/AdminServices";
import { AdminProfessionals } from "./pages/AdminProfessionals";
import { NotFound } from "./pages/NotFound";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";

function P({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/portal",
    element: <P><Home /></P>,
  },
  {
    path: "/agendar",
    element: <P><ClientBooking /></P>,
  },
  {
    path: "/meus-agendamentos",
    element: <P><ClientAppointments /></P>,
  },
  {
    path: "/profissional/agenda",
    element: <P><ProfessionalSchedule /></P>,
  },
  {
    path: "/admin",
    element: <P><AdminDashboard /></P>,
  },
  {
    path: "/admin/servicos",
    element: <P><AdminServices /></P>,
  },
  {
    path: "/admin/profissionais",
    element: <P><AdminProfessionals /></P>,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
