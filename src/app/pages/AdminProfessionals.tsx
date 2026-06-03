import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Plus, Pencil, Trash2, Clock, Loader2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { getServices, getProfessionals, createProfessional, updateProfessional, deleteProfessional } from "../../lib/db";
import { Professional, Service } from "../types";
import { toast } from "sonner";

const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const DEFAULT_SCHEDULE = [1, 2, 3, 4, 5].map(d => ({ dayOfWeek: d, startTime: "09:00", endTime: "18:00" }));

export function AdminProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState<Professional | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    services: [] as string[],
    schedule: DEFAULT_SCHEDULE,
  });

  useEffect(() => {
    Promise.all([getServices(), getProfessionals()])
      .then(([svcs, profs]) => {
        setAllServices(svcs);
        setProfessionals(profs);
      })
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setFormData({ name: "", services: [], schedule: DEFAULT_SCHEDULE });
    setEditingProfessional(null);
  };

  const handleOpenDialog = (professional?: Professional) => {
    if (professional) {
      setEditingProfessional(professional);
      setFormData({
        name: professional.name,
        services: professional.services,
        schedule: professional.schedule,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || formData.services.length === 0) {
      toast.error("Preencha o nome e selecione pelo menos um serviço");
      return;
    }

    setSaving(true);
    try {
      if (editingProfessional) {
        await updateProfessional(editingProfessional.id, formData);
        setProfessionals(professionals.map(p =>
          p.id === editingProfessional.id ? { ...p, ...formData } : p
        ));
        toast.success("Profissional atualizado com sucesso");
      } else {
        const created = await createProfessional(formData);
        setProfessionals([...professionals, created]);
        toast.success("Profissional criado com sucesso");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error("Erro ao salvar profissional. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProfessional(id);
      setProfessionals(professionals.filter(p => p.id !== id));
      toast.success("Profissional removido com sucesso");
    } catch {
      toast.error("Erro ao remover profissional.");
    }
  };

  const toggleService = (serviceId: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(serviceId)
        ? formData.services.filter(id => id !== serviceId)
        : [...formData.services, serviceId],
    });
  };

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
        <PageHeader backTo="/admin" backLabel="Voltar ao Painel" />

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gerenciar Profissionais</h1>
            <p className="text-gray-600">Gerencie a equipe e horários de trabalho</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProfessional ? "Editar Profissional" : "Novo Profissional"}</DialogTitle>
                <DialogDescription>Preencha os dados do profissional</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome do profissional"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Serviços que Realiza *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {allServices.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service.id}`}
                          checked={formData.services.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <label htmlFor={`service-${service.id}`} className="text-sm cursor-pointer">
                          {service.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Horários de Trabalho</Label>
                  <p className="text-sm text-gray-600 mb-3">Configure os dias e horários de trabalho</p>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 0].map((dayOfWeek) => {
                      const scheduleItem = formData.schedule.find(s => s.dayOfWeek === dayOfWeek);
                      const isActive = !!scheduleItem;
                      return (
                        <div key={dayOfWeek} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Checkbox
                            id={`day-${dayOfWeek}`}
                            checked={isActive}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  schedule: [...formData.schedule, { dayOfWeek, startTime: "09:00", endTime: "18:00" }],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  schedule: formData.schedule.filter(s => s.dayOfWeek !== dayOfWeek),
                                });
                              }
                            }}
                          />
                          <label htmlFor={`day-${dayOfWeek}`} className="w-24 text-sm cursor-pointer">
                            {dayNames[dayOfWeek]}
                          </label>
                          {isActive && scheduleItem && (
                            <div className="flex items-center gap-2 flex-1">
                              <Input
                                type="time"
                                value={scheduleItem.startTime}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  schedule: formData.schedule.map(s =>
                                    s.dayOfWeek === dayOfWeek ? { ...s, startTime: e.target.value } : s
                                  ),
                                })}
                                className="w-28"
                              />
                              <span className="text-gray-500">até</span>
                              <Input
                                type="time"
                                value={scheduleItem.endTime}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  schedule: formData.schedule.map(s =>
                                    s.dayOfWeek === dayOfWeek ? { ...s, endTime: e.target.value } : s
                                  ),
                                })}
                                className="w-28"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => { setIsDialogOpen(false); resetForm(); }}
                    className="flex-1"
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="flex-1" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {editingProfessional ? "Salvar" : "Criar"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {professionals.map((professional) => (
            <Card key={professional.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{professional.name}</CardTitle>
                    <CardDescription className="mt-2">{professional.services.length} serviço(s)</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Serviços:</h4>
                    <div className="flex flex-wrap gap-2">
                      {professional.services.map((serviceId) => {
                        const service = allServices.find(s => s.id === serviceId);
                        return (
                          <span key={serviceId} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            {service?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Horários:
                    </h4>
                    <div className="space-y-1">
                      {professional.schedule
                        .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                        .map((sch) => (
                          <div key={sch.dayOfWeek} className="text-sm flex justify-between">
                            <span className="text-gray-600">{dayNames[sch.dayOfWeek]}:</span>
                            <span className="font-medium">{sch.startTime} - {sch.endTime}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenDialog(professional)} className="flex-1">
                      <Pencil className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(professional.id)} className="flex-1">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remover
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
