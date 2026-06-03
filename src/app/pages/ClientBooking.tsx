import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Calendar } from "../components/ui/calendar";
import { Textarea } from "../components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { getServices, getProfessionals, createAppointment } from "../../lib/db";
import { useAuth } from "../contexts/AuthContext";
import { Service, Professional } from "../types";
import { toast } from "sonner";

export function ClientBooking() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    Promise.all([getServices(), getProfessionals()])
      .then(([svcs, profs]) => {
        setServices(svcs);
        setProfessionals(profs);
      })
      .finally(() => setLoading(false));
  }, []);

  const service = services.find(s => s.id === selectedService);
  const availableProfessionals = selectedService
    ? professionals.filter(p => p.services.includes(selectedService))
    : [];

  const generateTimeSlots = () => {
    if (!selectedProfessional || !selectedDate) return [];
    const professional = professionals.find(p => p.id === selectedProfessional);
    if (!professional) return [];
    const dayOfWeek = selectedDate.getDay();
    const schedule = professional.schedule.find(s => s.dayOfWeek === dayOfWeek);
    if (!schedule) return [];

    const slots: string[] = [];
    const [startHour, startMin] = schedule.startTime.split(":").map(Number);
    const [endHour, endMin] = schedule.endTime.split(":").map(Number);
    let h = startHour, m = startMin;
    while (h < endHour || (h === endHour && m < endMin)) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      m += 30;
      if (m >= 60) { m = 0; h++; }
    }
    return slots;
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para agendar");
      return;
    }

    if (!selectedService || !selectedProfessional || !selectedDate || !selectedTime) {
      toast.error("Por favor, selecione todos os campos");
      return;
    }

    setBooking(true);
    try {
      await createAppointment({
        clientName: user.name,
        clientPhone: user.phone,
        serviceId: selectedService,
        professionalId: selectedProfessional,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        status: "pending",
        notes: notes || undefined,
      });
      setIsBooked(true);
      toast.success("Agendamento realizado com sucesso!");
    } catch {
      toast.error("Erro ao realizar agendamento. Tente novamente.");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (isBooked) {
    const bookedProfessional = professionals.find(p => p.id === selectedProfessional);
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle>Agendamento Confirmado!</CardTitle>
            <CardDescription>Seu horário foi reservado com sucesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><strong>Serviço:</strong> {service?.name}</p>
              <p><strong>Profissional:</strong> {bookedProfessional?.name}</p>
              <p><strong>Data:</strong> {selectedDate?.toLocaleDateString("pt-BR")}</p>
              <p><strong>Horário:</strong> {selectedTime}</p>
              <p><strong>Duração:</strong> {service?.duration} minutos</p>
              <p><strong>Valor:</strong> R$ {service?.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <Link to="/meus-agendamentos" className="flex-1">
                <Button className="w-full">Ver Agendamentos</Button>
              </Link>
              <Link to="/portal" className="flex-1">
                <Button variant="outline" className="w-full">Portal</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <PageHeader />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agendar Serviço</h1>
          <div className="flex gap-2">
            {[1, 2].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded ${s <= step ? "bg-pink-500" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha o Serviço</CardTitle>
              <CardDescription>Selecione o serviço desejado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedService(svc.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedService === svc.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{svc.name}</h3>
                      <span className="text-pink-600 font-semibold">R$ {svc.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{svc.description}</p>
                    <p className="text-sm text-gray-500">{svc.duration} minutos</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => setStep(2)} disabled={!selectedService} className="w-full">
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Finalizar Agendamento</CardTitle>
              <CardDescription>Escolha o profissional, data e confirme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Profissional</Label>
                <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProfessionals.map((prof) => (
                      <SelectItem key={prof.id} value={prof.id}>{prof.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProfessional && (
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const professional = professionals.find(p => p.id === selectedProfessional);
                      if (!professional) return true;
                      const dayOfWeek = date.getDay();
                      const hasSchedule = professional.schedule.some(s => s.dayOfWeek === dayOfWeek);
                      return !hasSchedule || date < new Date(new Date().setHours(0,0,0,0));
                    }}
                    className="rounded-md border mx-auto"
                  />
                </div>
              )}

              {selectedDate && (
                <div className="space-y-2">
                  <Label>Horário</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {generateTimeSlots().map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma preferência ou observação?"
                  rows={2}
                />
              </div>

              {selectedService && selectedProfessional && selectedDate && selectedTime && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                  <h3 className="font-semibold mb-2">Resumo</h3>
                  <p className="text-sm"><strong>Serviço:</strong> {service?.name}</p>
                  <p className="text-sm"><strong>Profissional:</strong> {professionals.find(p => p.id === selectedProfessional)?.name}</p>
                  <p className="text-sm"><strong>Data:</strong> {selectedDate?.toLocaleDateString("pt-BR")}</p>
                  <p className="text-sm"><strong>Horário:</strong> {selectedTime}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Voltar</Button>
                <Button
                  onClick={handleBooking}
                  disabled={!selectedProfessional || !selectedDate || !selectedTime || booking}
                  className="flex-1"
                >
                  {booking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Confirmar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
