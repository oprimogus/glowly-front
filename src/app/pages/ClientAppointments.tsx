import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, User, AlertCircle, Loader2 } from "lucide-react";
import { getServices, getProfessionals, getAppointments, updateAppointmentStatus } from "../../lib/db";
import { Appointment, Service, Professional } from "../types";
import { toast } from "sonner";

export function ClientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAppointments(), getServices(), getProfessionals()])
      .then(([appts, svcs, profs]) => {
        setAppointments(appts);
        setServices(svcs);
        setProfessionals(profs);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await updateAppointmentStatus(id, "cancelled");
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: "cancelled" } : a));
      toast.success("Agendamento cancelado");
    } catch {
      toast.error("Erro ao cancelar agendamento.");
    }
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente" },
      confirmed: { variant: "default" as const, label: "Confirmado" },
      completed: { variant: "outline" as const, label: "Concluído" },
      cancelled: { variant: "destructive" as const, label: "Cancelado" },
    };
    return variants[status];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Agendamentos</h1>
          <p className="text-gray-600">Visualize e gerencie seus horários marcados</p>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-gray-600 mb-4">Você ainda não tem agendamentos</p>
              <Link to="/agendar">
                <Button>Agendar Agora</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const service = services.find(s => s.id === appointment.serviceId);
              const professional = professionals.find(p => p.id === appointment.professionalId);
              const statusBadge = getStatusBadge(appointment.status);

              return (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{service?.name}</CardTitle>
                        <CardDescription>{service?.description}</CardDescription>
                      </div>
                      <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          {new Date(appointment.date + "T12:00:00").toLocaleDateString("pt-BR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          {appointment.time} ({service?.duration} min)
                        </div>
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-2 text-gray-500" />
                          {professional?.name}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Cliente:</span> {appointment.clientName}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Telefone:</span> {appointment.clientPhone}
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Valor:</span> R$ {service?.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600"><strong>Observações:</strong> {appointment.notes}</p>
                      </div>
                    )}

                    {(appointment.status === "pending" || appointment.status === "confirmed") && (
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Remarcar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/agendar">
            <Button>Novo Agendamento</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
