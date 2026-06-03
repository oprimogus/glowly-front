import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { getServices, createService, updateService, deleteService } from "../../lib/db";
import { Service } from "../types";
import { toast } from "sonner";

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    duration: 30,
    price: 0,
    description: "",
  });

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setFormData({ name: "", duration: 30, price: 0, description: "" });
    setEditingService(null);
  };

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        duration: service.duration,
        price: service.price,
        description: service.description || "",
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || formData.price <= 0 || formData.duration <= 0) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setSaving(true);
    try {
      if (editingService) {
        const updated = await updateService(editingService.id, formData);
        setServices(services.map(s => s.id === editingService.id ? updated : s));
        toast.success("Serviço atualizado com sucesso");
      } else {
        const created = await createService(formData);
        setServices([...services, created]);
        toast.success("Serviço criado com sucesso");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      toast.error("Erro ao salvar serviço. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteService(id);
      setServices(services.filter(s => s.id !== id));
      toast.success("Serviço removido com sucesso");
    } catch {
      toast.error("Erro ao remover serviço.");
    }
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
            <h1 className="text-3xl font-bold mb-2">Gerenciar Serviços</h1>
            <p className="text-gray-600">Adicione, edite ou remova serviços</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingService ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
                <DialogDescription>Preencha os dados do serviço</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Serviço *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Corte Feminino"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (min) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                      min="15"
                      step="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrição do serviço"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
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
                    {editingService ? "Salvar" : "Criar"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duração:</span>
                    <span className="font-semibold">{service.duration} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Preço:</span>
                    <span className="font-semibold text-purple-600">R$ {service.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(service)} className="flex-1">
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)} className="flex-1">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
