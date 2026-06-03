import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Clock, Phone, AlertCircle, Loader2 } from "lucide-react";
import { getProfessionals, getServices, getAppointments, updateAppointmentStatus } from "../../lib/db";
import { Appointment, Professional, Service } from "../types";
import { toast } from "sonner";

export function ProfessionalSchedule() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    Promise.all([getProfessionals(), getServices(), getAppointments()])
      .then(([profs, svcs, appts]) => {
        setProfessionals(profs);
        setServices(svcs);
        setAppointments(appts);
        if (profs.length > 0) setSelectedProfessional(profs[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  const professional = professionals.find(p => p.id === selectedProfessional);
  const dayAppointments = appointments.filter(
    a => a.professionalId === selectedProfessional && a.date === selectedDate
  );

  const handleUpdateStatus = async (id: string, status: Appointment["status"]) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
      toast.success(status === "confirmed" ? "Agendamento confirmado" : "Agendamento cancelado");
    } catch {
      toast.error("Erro ao atualizar status.");
    }
  };

  const getStatusColor = (status: Appointment["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageHeader />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agenda Profissional</h1>
          <p className="text-gray-600">Visualize seus compromissos do dia</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Profissional</label>
            <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>{prof.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{professional?.name}</CardTitle>
            <CardDescription>
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total de agendamentos:</span>{" "}
                <strong>{dayAppointments.length}</strong>
              </div>
              <div>
                <span className="text-gray-500">Confirmados:</span>{" "}
                <strong className="text-green-600">
                  {dayAppointments.filter(a => a.status === "confirmed").length}
                </strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {dayAppointments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Sem agendamentos</h3>
              <p className="text-gray-600">Não há agendamentos para esta data</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {dayAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment) => {
                const service = services.find(s => s.id === appointment.serviceId);
                return (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-semibold">
                            {appointment.time}
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.clientName}</h3>
                            <p className="text-sm text-gray-600">{service?.name}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)} variant="outline">
                          {appointment.status === "confirmed" && "Confirmado"}
                          {appointment.status === "pending" && "Pendente"}
                          {appointment.status === "completed" && "Concluído"}
                          {appointment.status === "cancelled" && "Cancelado"}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-500" />
                          {appointment.clientPhone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          {service?.duration} minutos
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">R$</span>
                          {service?.price.toFixed(2)}
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                          <strong>Obs:</strong> {appointment.notes}
                        </div>
                      )}

                      {appointment.status === "pending" && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleUpdateStatus(appointment.id, "confirmed")}
                          >
                            Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleUpdateStatus(appointment.id, "cancelled")}
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
      </div>
    </div>
  );
}
