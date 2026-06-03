import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";

export function Wireframes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/portal">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Portal
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Wireframes - Glowly</h1>
          <p className="text-gray-600">Estrutura visual de todas as telas do sistema</p>
        </div>

        <div className="space-y-12">
          {/* Landing Page */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Landing Page (Página Inicial Pública)</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-6xl mx-auto border-2 border-gray-300 bg-white">
                  {/* Hero */}
                  <div className="bg-gradient-to-br from-pink-200 to-purple-200 p-12 text-center">
                    <div className="h-6 bg-white/30 w-48 mx-auto mb-4"></div>
                    <div className="h-12 bg-white/50 w-3/4 mx-auto mb-4"></div>
                    <div className="h-12 bg-white/50 w-2/3 mx-auto mb-6"></div>
                    <div className="h-6 bg-white/30 w-4/5 mx-auto mb-8"></div>
                    <div className="flex gap-4 justify-center">
                      <div className="h-12 bg-white w-40"></div>
                      <div className="h-12 bg-white/20 border-2 border-white w-40"></div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gray-50 p-8">
                    <div className="grid grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="text-center">
                          <div className="w-12 h-12 bg-purple-200 rounded-full mx-auto mb-3"></div>
                          <div className="h-4 bg-gray-300 w-2/3 mx-auto mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full mb-1"></div>
                          <div className="h-3 bg-gray-100 w-5/6 mx-auto"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="p-12">
                    <div className="text-center mb-8">
                      <div className="h-6 bg-purple-200 w-32 mx-auto mb-4"></div>
                      <div className="h-10 bg-gray-300 w-1/2 mx-auto mb-3"></div>
                      <div className="h-4 bg-gray-100 w-2/3 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="border-2 border-gray-300 p-4">
                          <div className="flex justify-between mb-3">
                            <div className="w-8 h-8 bg-purple-200"></div>
                            <div className="h-6 bg-purple-200 w-20"></div>
                          </div>
                          <div className="h-4 bg-gray-300 w-2/3 mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full mb-1"></div>
                          <div className="h-3 bg-gray-100 w-1/3 mt-3"></div>
                        </div>
                      ))}
                    </div>
                    <div className="h-10 bg-purple-300 w-48 mx-auto"></div>
                  </div>

                  {/* Team */}
                  <div className="bg-purple-50 p-12">
                    <div className="text-center mb-8">
                      <div className="h-6 bg-purple-200 w-32 mx-auto mb-4"></div>
                      <div className="h-10 bg-gray-300 w-1/2 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white border-2 border-gray-300 p-4 text-center">
                          <div className="w-20 h-20 bg-purple-200 rounded-full mx-auto mb-3"></div>
                          <div className="h-4 bg-gray-300 w-2/3 mx-auto mb-2"></div>
                          <div className="h-3 bg-gray-100 w-1/2 mx-auto mb-3"></div>
                          <div className="flex gap-2 justify-center">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-5 bg-gray-200 w-16"></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="p-12">
                    <div className="text-center mb-8">
                      <div className="h-10 bg-gray-300 w-1/2 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-2 border-gray-300 p-4">
                          <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((j) => (
                              <div key={j} className="w-4 h-4 bg-yellow-300"></div>
                            ))}
                          </div>
                          <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
                          <div className="h-3 bg-gray-100 w-full mb-1"></div>
                          <div className="h-3 bg-gray-100 w-full mb-1"></div>
                          <div className="h-3 bg-gray-100 w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-purple-200 p-12 text-center">
                    <div className="h-10 bg-gray-300 w-2/3 mx-auto mb-4"></div>
                    <div className="h-5 bg-gray-200 w-3/4 mx-auto mb-8"></div>
                    <div className="flex gap-4 justify-center">
                      <div className="h-12 bg-purple-400 w-40"></div>
                      <div className="h-12 bg-white w-40"></div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-800 p-8">
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-6 bg-gray-600 w-32"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-gray-600 w-24"></div>
                        <div className="h-4 bg-gray-600 w-24"></div>
                        <div className="h-4 bg-gray-600 w-24"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-700 w-1/3 mx-auto"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Portal Home */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Portal (Home Interna)</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-4xl mx-auto border-2 border-gray-300 p-8 bg-white">
                  {/* Header */}
                  <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
                    <div className="w-32 h-8 bg-gradient-to-r from-pink-200 to-purple-200 mx-auto mb-4 flex items-center justify-center text-sm font-bold">
                      LOGO
                    </div>
                    <div className="h-6 bg-gray-200 w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/2 mx-auto"></div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {['Agendar Serviço', 'Meus Agendamentos', 'Área Profissional'].map((title, i) => (
                      <div key={i} className="border-2 border-gray-300 p-6">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-5 bg-gray-300 w-3/4 mb-3"></div>
                        <div className="h-3 bg-gray-100 w-full mb-1"></div>
                        <div className="h-3 bg-gray-100 w-5/6 mb-4"></div>
                        <div className="h-10 bg-pink-200 w-full"></div>
                      </div>
                    ))}
                  </div>

                  {/* Admin Link */}
                  <div className="mt-8 text-center">
                    <div className="h-8 bg-gray-100 w-40 mx-auto"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Client Booking */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Agendamento - Cliente (Mobile First)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sm">Passo 1: Escolher Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-sm mx-auto border-2 border-gray-300 p-4 bg-white">
                    {/* Progress */}
                    <div className="flex gap-1 mb-6">
                      <div className="h-1 flex-1 bg-pink-300"></div>
                      <div className="h-1 flex-1 bg-gray-200"></div>
                      <div className="h-1 flex-1 bg-gray-200"></div>
                    </div>

                    {/* Title */}
                    <div className="h-6 bg-gray-300 w-2/3 mb-6"></div>

                    {/* Service Cards */}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-2 border-gray-300 p-3 mb-3">
                        <div className="flex justify-between mb-2">
                          <div className="h-4 bg-gray-300 w-1/3"></div>
                          <div className="h-4 bg-pink-200 w-1/4"></div>
                        </div>
                        <div className="h-3 bg-gray-100 w-full mb-1"></div>
                        <div className="h-3 bg-gray-100 w-1/4"></div>
                      </div>
                    ))}

                    {/* Button */}
                    <div className="h-10 bg-pink-300 w-full mt-4"></div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sm">Passo 2: Profissional e Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-sm mx-auto border-2 border-gray-300 p-4 bg-white">
                    {/* Progress */}
                    <div className="flex gap-1 mb-6">
                      <div className="h-1 flex-1 bg-pink-300"></div>
                      <div className="h-1 flex-1 bg-pink-300"></div>
                      <div className="h-1 flex-1 bg-gray-200"></div>
                    </div>

                    {/* Title */}
                    <div className="h-6 bg-gray-300 w-2/3 mb-6"></div>

                    {/* Professional Select */}
                    <div className="h-4 bg-gray-200 w-1/3 mb-2"></div>
                    <div className="h-10 bg-white border-2 border-gray-300 mb-6"></div>

                    {/* Calendar */}
                    <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>
                    <div className="border-2 border-gray-300 p-4 mb-6">
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }).map((_, i) => (
                          <div key={i} className="h-8 bg-gray-100"></div>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-8 bg-gray-100 border border-gray-300"></div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-6">
                      <div className="h-10 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                      <div className="h-10 bg-pink-300 flex-1"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sm">Passo 3: Dados do Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-w-sm mx-auto border-2 border-gray-300 p-4 bg-white">
                    {/* Progress */}
                    <div className="flex gap-1 mb-6">
                      <div className="h-1 flex-1 bg-pink-300"></div>
                      <div className="h-1 flex-1 bg-pink-300"></div>
                      <div className="h-1 flex-1 bg-pink-300"></div>
                    </div>

                    {/* Title */}
                    <div className="h-6 bg-gray-300 w-2/3 mb-6"></div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <div className="h-3 bg-gray-200 w-1/3 mb-2"></div>
                        <div className="h-10 bg-white border-2 border-gray-300"></div>
                      </div>
                      <div>
                        <div className="h-3 bg-gray-200 w-1/4 mb-2"></div>
                        <div className="h-10 bg-white border-2 border-gray-300"></div>
                      </div>
                      <div>
                        <div className="h-3 bg-gray-200 w-1/3 mb-2"></div>
                        <div className="h-20 bg-white border-2 border-gray-300"></div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-100 p-3 mt-4 mb-4">
                      <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-3 bg-gray-200 w-full mb-1"></div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <div className="h-10 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                      <div className="h-10 bg-pink-300 flex-1"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Client Appointments */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Meus Agendamentos - Cliente</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-4xl mx-auto border-2 border-gray-300 p-8 bg-white">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="h-8 bg-gray-300 w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/2"></div>
                  </div>

                  {/* Appointment Cards */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-2 border-gray-300 p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="h-5 bg-gray-300 w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-100 w-2/3"></div>
                          </div>
                          <div className="h-6 bg-green-200 w-24"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-4 bg-gray-100 w-full"></div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-4 bg-gray-100 w-full"></div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <div className="h-8 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                          <div className="h-8 bg-red-100 border-2 border-red-300 flex-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* New Appointment Button */}
                  <div className="mt-6 text-center">
                    <div className="h-10 bg-pink-300 w-48 mx-auto"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Professional Schedule */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Agenda - Profissional</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-4xl mx-auto border-2 border-gray-300 p-8 bg-white">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="h-8 bg-gray-300 w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/2"></div>
                  </div>

                  {/* Filters */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="h-4 bg-gray-200 w-1/3 mb-2"></div>
                      <div className="h-10 bg-white border-2 border-gray-300"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>
                      <div className="h-10 bg-white border-2 border-gray-300"></div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="border-2 border-gray-300 p-4 mb-6">
                    <div className="h-5 bg-gray-300 w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-2/3 mb-4"></div>
                    <div className="flex gap-4">
                      <div className="h-4 bg-gray-100 w-1/4"></div>
                      <div className="h-4 bg-green-200 w-1/4"></div>
                    </div>
                  </div>

                  {/* Appointments List */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-2 border-gray-300 p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-3 items-center">
                            <div className="w-16 h-12 bg-blue-200"></div>
                            <div>
                              <div className="h-5 bg-gray-300 w-32 mb-1"></div>
                              <div className="h-3 bg-gray-100 w-24"></div>
                            </div>
                          </div>
                          <div className="h-6 bg-green-200 w-24"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          {[1, 2, 3].map((j) => (
                            <div key={j} className="h-4 bg-gray-100"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Admin Dashboard */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Dashboard - Admin</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-6xl mx-auto border-2 border-gray-300 p-8 bg-white">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="h-8 bg-gray-300 w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/4"></div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['Agendamentos', 'Confirmados', 'Faturamento', 'Profissionais'].map((title, i) => (
                      <div key={i} className="border-2 border-gray-300 p-4">
                        <div className="h-3 bg-gray-200 w-2/3 mb-3"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-8 bg-purple-200 w-16"></div>
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {['Gerenciar Serviços', 'Gerenciar Profissionais', 'Próximos Agendamentos'].map((title, i) => (
                      <div key={i} className="border-2 border-gray-300 p-6">
                        <div className="w-12 h-12 bg-purple-200 rounded-full mb-4"></div>
                        <div className="h-5 bg-gray-300 w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 w-full mb-1"></div>
                        <div className="h-3 bg-gray-100 w-5/6 mb-4"></div>
                        <div className="h-6 bg-purple-200 w-1/2"></div>
                      </div>
                    ))}
                  </div>

                  {/* Appointments List */}
                  <div className="border-2 border-gray-300 p-6">
                    <div className="h-5 bg-gray-300 w-1/3 mb-4"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center border border-gray-300 p-3">
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 w-1/4 mb-1"></div>
                            <div className="h-3 bg-gray-100 w-1/3"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-4 bg-gray-300 w-24 mb-1 ml-auto"></div>
                            <div className="h-3 bg-gray-100 w-16 ml-auto"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Admin Services */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Gerenciar Serviços - Admin</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-6xl mx-auto border-2 border-gray-300 p-8 bg-white">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="h-8 bg-gray-300 w-64 mb-2"></div>
                      <div className="h-4 bg-gray-100 w-48"></div>
                    </div>
                    <div className="h-10 bg-purple-300 w-40"></div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="border-2 border-gray-300 p-4">
                        <div className="h-5 bg-gray-300 w-2/3 mb-2"></div>
                        <div className="h-3 bg-gray-100 w-full mb-1"></div>
                        <div className="h-3 bg-gray-100 w-4/5 mb-4"></div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <div className="h-3 bg-gray-100 w-1/3"></div>
                            <div className="h-3 bg-gray-200 w-1/4"></div>
                          </div>
                          <div className="flex justify-between">
                            <div className="h-3 bg-gray-100 w-1/4"></div>
                            <div className="h-3 bg-purple-200 w-1/3"></div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <div className="h-8 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                          <div className="h-8 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modal/Dialog */}
            <Card className="bg-white mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Modal: Criar/Editar Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-md mx-auto border-2 border-gray-300 p-6 bg-white">
                  <div className="h-6 bg-gray-300 w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-100 w-3/4 mb-6"></div>

                  <div className="space-y-4">
                    <div>
                      <div className="h-3 bg-gray-200 w-1/3 mb-2"></div>
                      <div className="h-10 bg-white border-2 border-gray-300"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="h-3 bg-gray-200 w-2/3 mb-2"></div>
                        <div className="h-10 bg-white border-2 border-gray-300"></div>
                      </div>
                      <div>
                        <div className="h-3 bg-gray-200 w-2/3 mb-2"></div>
                        <div className="h-10 bg-white border-2 border-gray-300"></div>
                      </div>
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 w-1/4 mb-2"></div>
                      <div className="h-20 bg-white border-2 border-gray-300"></div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <div className="h-10 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                    <div className="h-10 bg-purple-300 flex-1"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Admin Professionals */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Gerenciar Profissionais - Admin</h2>
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="max-w-6xl mx-auto border-2 border-gray-300 p-8 bg-white">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="h-8 bg-gray-300 w-80 mb-2"></div>
                      <div className="h-4 bg-gray-100 w-64"></div>
                    </div>
                    <div className="h-10 bg-purple-300 w-48"></div>
                  </div>

                  {/* Professionals Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-2 border-gray-300 p-4">
                        <div className="h-5 bg-gray-300 w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-100 w-1/3 mb-6"></div>

                        {/* Services */}
                        <div className="mb-4">
                          <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((j) => (
                              <div key={j} className="h-6 bg-purple-100 w-20"></div>
                            ))}
                          </div>
                        </div>

                        {/* Schedule */}
                        <div className="mb-4">
                          <div className="h-4 bg-gray-200 w-1/4 mb-2"></div>
                          <div className="space-y-1">
                            {[1, 2, 3, 4].map((j) => (
                              <div key={j} className="flex justify-between">
                                <div className="h-3 bg-gray-100 w-1/3"></div>
                                <div className="h-3 bg-gray-200 w-1/3"></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 pt-2">
                          <div className="h-8 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                          <div className="h-8 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modal/Dialog */}
            <Card className="bg-white mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Modal: Criar/Editar Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto border-2 border-gray-300 p-6 bg-white">
                  <div className="h-6 bg-gray-300 w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-100 w-3/4 mb-6"></div>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <div className="h-3 bg-gray-200 w-1/3 mb-2"></div>
                      <div className="h-10 bg-white border-2 border-gray-300"></div>
                    </div>

                    {/* Services */}
                    <div>
                      <div className="h-3 bg-gray-200 w-1/4 mb-3"></div>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-white border-2 border-gray-300"></div>
                            <div className="h-3 bg-gray-100 w-2/3"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div>
                      <div className="h-3 bg-gray-200 w-1/3 mb-3"></div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center gap-3 border-2 border-gray-300 p-3">
                            <div className="w-4 h-4 bg-white border-2 border-gray-300"></div>
                            <div className="h-3 bg-gray-100 w-20"></div>
                            <div className="flex items-center gap-2 flex-1">
                              <div className="h-8 bg-white border-2 border-gray-300 w-24"></div>
                              <div className="h-3 bg-gray-100 w-8"></div>
                              <div className="h-8 bg-white border-2 border-gray-300 w-24"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <div className="h-10 bg-gray-100 border-2 border-gray-300 flex-1"></div>
                    <div className="h-10 bg-purple-300 flex-1"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Legend */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Legenda</h2>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-gray-300"></div>
                    <span className="text-sm">Título / Heading</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-gray-100"></div>
                    <span className="text-sm">Texto / Label</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-white border-2 border-gray-300"></div>
                    <span className="text-sm">Input / Campo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-pink-300"></div>
                    <span className="text-sm">Botão Principal (Cliente)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-purple-300"></div>
                    <span className="text-sm">Botão Principal (Admin)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-blue-200"></div>
                    <span className="text-sm">Destaque (Profissional)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-gray-100 border-2 border-gray-300"></div>
                    <span className="text-sm">Botão Secundário</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8 border-2 border-gray-300"></div>
                    <span className="text-sm">Card / Container</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <span className="text-sm">Ícone / Avatar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
