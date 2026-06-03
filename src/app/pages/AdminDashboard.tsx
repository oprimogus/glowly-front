import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Calendar, DollarSign, Users, Scissors, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { getServices, getProfessionals, getAppointments } from "../../lib/db";
import { Service, Professional, Appointment } from "../types";

export function AdminDashboard() {
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getServices(), getProfessionals(), getAppointments()])
      .then(([svcs, profs, appts]) => {
        setServices(svcs);
        setProfessionals(profs);
        setAppointments(appts);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === "confirmed").length;
  const totalRevenue = appointments
    .filter(a => a.status !== "cancelled")
    .reduce((sum, a) => {
      const service = services.find(s => s.id === a.serviceId);
      return sum + (service?.price || 0);
    }, 0);

  const upcomingAppointments = appointments
    .filter(a => new Date(a.date) >= new Date() && a.status !== "cancelled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader backTo="/portal" />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie seu salão</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Agendamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalAppointments}</div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Confirmados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">{confirmedAppointments}</div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">R$ {totalRevenue.toFixed(0)}</div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Profissionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{professionals.length}</div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/servicos">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Scissors className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Gerenciar Serviços</CardTitle>
                <CardDescription>Adicione, edite ou remova serviços</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{services.length} serviços</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/profissionais">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Gerenciar Profissionais</CardTitle>
                <CardDescription>Gerencie a equipe e horários</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{professionals.length} profissionais</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Visualize a agenda</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{upcomingAppointments.length} próximos</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos</CardTitle>
            <CardDescription>Agendamentos confirmados e pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Nenhum agendamento próximo</p>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => {
                  const service = services.find(s => s.id === appointment.serviceId);
                  const professional = professionals.find(p => p.id === appointment.professionalId);
                  return (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{appointment.clientName}</p>
                        <p className="text-sm text-gray-600">
                          {service?.name} - {professional?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {new Date(appointment.date + "T12:00:00").toLocaleDateString("pt-BR")}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
