export interface Service {
  id: string;
  name: string;
  duration: number; // em minutos
  price: number;
  description?: string;
}

export interface Professional {
  id: string;
  name: string;
  avatar?: string;
  services: string[]; // IDs dos serviços
  schedule: {
    dayOfWeek: number; // 0-6 (domingo-sábado)
    startTime: string; // "09:00"
    endTime: string; // "18:00"
  }[];
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  professionalId: string;
  date: string; // ISO string
  time: string; // "14:30"
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export type UserRole = 'client' | 'professional' | 'admin';
