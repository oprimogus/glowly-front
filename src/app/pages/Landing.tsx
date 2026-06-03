import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, Star, Scissors, Sparkles, Users, MapPin, Phone, Mail, Instagram, Facebook, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { getServices, getProfessionals } from "../../lib/db";
import { Service, Professional } from "../types";

export function Landing() {
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getServices(), getProfessionals()])
      .then(([svcs, profs]) => {
        setServices(svcs);
        setProfessionals(profs);
      })
      .catch(err => console.error("Error loading landing data:", err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen" style={{ background: '#fef5ff' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ background: 'rgba(254, 245, 255, 0.9)', borderColor: '#f3d9ff' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ color: '#4c0d5f' }}>Glowly</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-base" style={{ color: '#4c0d5f' }}>Serviços</a>
              <a href="#equipe" className="text-base" style={{ color: '#4c0d5f' }}>Equipe</a>
              <a href="#depoimentos" className="text-base" style={{ color: '#4c0d5f' }}>Depoimentos</a>
              <a href="#contato" className="text-base" style={{ color: '#4c0d5f' }}>Contato</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="rounded-2xl" style={{ color: '#4c0d5f' }}>
                  Entrar
                </Button>
              </Link>
              <Link to="/login">
                <Button className="rounded-2xl px-6" style={{ background: '#7c3aed', color: 'white' }}>
                  Agendar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32" style={{ background: '#4c0d5f' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full text-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
              Transforme seu visual
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" style={{ lineHeight: 1.1 }}>
              Beleza que encanta, agendamento que simplifica
            </h1>
            <p className="text-xl mb-10 text-white/90" style={{ lineHeight: 1.5, maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              Agendamento online inteligente para o salão de beleza mais moderno de São Paulo. Profissionais qualificados, ambiente acolhedor, resultados incríveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="rounded-2xl px-8 text-base" style={{ background: 'white', color: '#4c0d5f', padding: '12px 32px' }}>
                  Agendar Agora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#servicos">
                <Button size="lg" variant="ghost" className="rounded-2xl px-8 text-base border-2 text-white hover:bg-white/10" style={{ borderColor: 'white', padding: '12px 32px' }}>
                  Ver Serviços
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Calendar, title: "Agendamento 24/7", desc: "Reserve quando quiser" },
              { icon: Clock, title: "Pontualidade", desc: "Respeitamos seu tempo" },
              { icon: Users, title: "Equipe Expert", desc: "Profissionais certificados" },
              { icon: Sparkles, title: "Produtos Premium", desc: "Máxima qualidade" }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-8 text-center" style={{ background: 'white' }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f3d9ff' }}>
                  <item.icon className="w-7 h-7" style={{ color: '#7c3aed' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#4c0d5f', fontSize: '20px' }}>{item.title}</h3>
                <p className="text-base" style={{ color: '#6b7280', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium" style={{ background: '#f3d9ff', color: '#7c3aed' }}>
              Nossos Serviços
            </div>
            <h2 className="text-5xl font-bold mb-4" style={{ color: '#4c0d5f', lineHeight: 1.13 }}>
              Tudo que você precisa
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6b7280', lineHeight: 1.5 }}>
              Serviços completos de beleza com profissionais especializados e produtos de primeira linha
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {loading ? (
              <div className="col-span-3 flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : (
              services.map((service, index) => (
                <div
                  key={service.id}
                  className="rounded-2xl p-8"
                  style={{
                    background: index % 3 === 0 ? '#fff0f9' : index % 3 === 1 ? 'white' : '#f3d9ff'
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <Scissors className="w-8 h-8" style={{ color: '#7c3aed' }} />
                    <span className="text-2xl font-bold" style={{ color: '#7c3aed' }}>
                      R$ {service.price.toFixed(2)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#4c0d5f' }}>{service.name}</h3>
                  <p className="mb-4" style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1.5 }}>
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm" style={{ color: '#6b7280' }}>
                    <Clock className="w-4 h-4 mr-2" />
                    {service.duration} minutos
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/login">
              <Button size="lg" className="rounded-2xl px-8" style={{ background: '#7c3aed', color: 'white', padding: '12px 32px' }}>
                Agendar Seu Serviço
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Two Column Feature */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium" style={{ background: '#f3d9ff', color: '#7c3aed' }}>
                Agendamento Inteligente
              </div>
              <h2 className="text-5xl font-bold mb-6" style={{ color: '#4c0d5f', lineHeight: 1.13 }}>
                Reserve seu horário em segundos
              </h2>
              <p className="text-xl mb-8" style={{ color: '#6b7280', lineHeight: 1.5 }}>
                Nossa plataforma de agendamento online permite que você escolha o serviço, profissional e horário ideal para você. Simples, rápido e disponível 24/7.
              </p>
              <div className="space-y-4">
                {[
                  "Visualize a agenda em tempo real",
                  "Escolha seu profissional favorito",
                  "Receba confirmação instantânea",
                  "Gerencie seus agendamentos"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#7c3aed' }} />
                    <span className="text-lg" style={{ color: '#4c0d5f' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-12 flex items-center justify-center" style={{ background: '#f3d9ff', minHeight: '400px' }}>
              <Calendar className="w-32 h-32" style={{ color: '#7c3aed' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="equipe" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium" style={{ background: '#f3d9ff', color: '#7c3aed' }}>
              Nossa Equipe
            </div>
            <h2 className="text-5xl font-bold mb-4" style={{ color: '#4c0d5f', lineHeight: 1.13 }}>
              Profissionais talentosos
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6b7280', lineHeight: 1.5 }}>
              Especialistas apaixonados por transformar sua beleza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {loading ? (
              <div className="col-span-3 flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : (
              professionals.map((professional) => (
                <div key={professional.id} className="rounded-2xl p-8 text-center" style={{ background: 'white' }}>
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500 overflow-hidden">
                    {professional.avatar ? (
                      <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl text-white font-bold">
                        {professional.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#4c0d5f' }}>
                    {professional.name}
                  </h3>
                  <p className="mb-4" style={{ color: '#6b7280' }}>
                    {professional.services.length} especialidade(s)
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {professional.services.slice(0, 3).map((serviceId) => {
                      const service = services.find(s => s.id === serviceId);
                      return service ? (
                        <span key={serviceId} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#f3d9ff', color: '#7c3aed' }}>
                          {service.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20" style={{ background: 'white' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium" style={{ background: '#f3d9ff', color: '#7c3aed' }}>
              Depoimentos
            </div>
            <h2 className="text-5xl font-bold mb-4" style={{ color: '#4c0d5f', lineHeight: 1.13 }}>
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Maria Santos", service: "Coloração", comment: "Atendimento impecável! A Ana fez um trabalho incrível no meu cabelo." },
              { name: "João Silva", service: "Corte Masculino", comment: "Melhor corte que já fiz! O Carlos é muito profissional e atencioso." },
              { name: "Fernanda Lima", service: "Escova", comment: "Ambiente acolhedor e equipe super talentosa. Virei cliente fiel!" }
            ].map((testimonial, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ background: i === 1 ? '#fff0f9' : '#fef5ff' }}>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic" style={{ color: '#4c0d5f', lineHeight: 1.5 }}>
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-bold" style={{ color: '#4c0d5f' }}>{testimonial.name}</p>
                  <p className="text-sm" style={{ color: '#6b7280' }}>{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: '#4c0d5f' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 text-white" style={{ lineHeight: 1.13 }}>
              Pronto para transformar seu visual?
            </h2>
            <p className="text-xl mb-10 text-white/90" style={{ lineHeight: 1.5 }}>
              Agende seu horário agora e experimente o melhor em cuidados com a beleza
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="rounded-2xl px-8" style={{ background: 'white', color: '#4c0d5f', padding: '12px 32px' }}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Agora
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="rounded-2xl px-8 border-2 text-white hover:bg-white/10" style={{ borderColor: 'white', padding: '12px 32px' }}>
                  Acessar Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#4c0d5f' }}>Entre em Contato</h2>
            <p className="text-xl" style={{ color: '#6b7280' }}>Estamos aqui para atender você</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: MapPin, title: "Endereço", info: ["Av. Paulista, 1000", "São Paulo - SP"] },
              { icon: Phone, title: "Telefone", info: ["(11) 3000-0000", "(11) 99999-9999"] },
              { icon: Mail, title: "Email", info: ["contato@glowly.com.br", "agendamento@glowly.com.br"] }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-8 text-center" style={{ background: 'white' }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#f3d9ff' }}>
                  <item.icon className="w-6 h-6" style={{ color: '#7c3aed' }} />
                </div>
                <h3 className="font-bold mb-3 text-xl" style={{ color: '#4c0d5f' }}>{item.title}</h3>
                {item.info.map((line, j) => (
                  <p key={j} className="text-base" style={{ color: '#6b7280' }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ background: '#f3d9ff' }}>
              <Instagram className="w-5 h-5" style={{ color: '#7c3aed' }} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ background: '#f3d9ff' }}>
              <Facebook className="w-5 h-5" style={{ color: '#7c3aed' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ background: '#2d0a3d', color: 'white' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Glowly
              </h3>
              <p className="text-sm text-white/70">Beleza que brilha</p>
            </div>

            <div className="flex gap-8 text-sm">
              <Link to="/login" className="text-white/70 hover:text-white transition-colors">
                Portal do Cliente
              </Link>
              <Link to="/profissional/agenda" className="text-white/70 hover:text-white transition-colors">
                Área Profissional
              </Link>
              <Link to="/admin" className="text-white/70 hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-white/50" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <p>&copy; 2026 Glowly. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
