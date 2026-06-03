import { supabase } from "./supabase";
import { Service, Professional, Appointment } from "../app/types";

// ── Services ────────────────────────────────────────────────────────────────

function mapService(row: Record<string, unknown>): Service {
  return {
    id: row.id as string,
    name: row.name as string,
    duration: row.duration as number,
    price: Number(row.price),
    description: (row.description as string | null) ?? undefined,
  };
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("name");
  if (error) throw error;
  return data.map(mapService);
}

export async function createService(
  service: Omit<Service, "id">
): Promise<Service> {
  const { data, error } = await supabase
    .from("services")
    .insert({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description || null,
    })
    .select()
    .single();
  if (error) throw error;
  return mapService(data);
}

export async function updateService(
  id: string,
  service: Partial<Omit<Service, "id">>
): Promise<Service> {
  const { data, error } = await supabase
    .from("services")
    .update({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description ?? null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapService(data);
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
}

// ── Professionals ────────────────────────────────────────────────────────────

function mapProfessional(row: Record<string, unknown>): Professional {
  const services = (
    row.professional_services as Array<{ service_id: string }> | null ?? []
  ).map((ps) => ps.service_id);

  const schedule = (
    row.professional_schedules as Array<{
      day_of_week: number;
      start_time: string;
      end_time: string;
    }> | null ?? []
  ).map((s) => ({
    dayOfWeek: s.day_of_week,
    startTime: s.start_time.slice(0, 5),
    endTime: s.end_time.slice(0, 5),
  }));

  return {
    id: row.id as string,
    name: row.name as string,
    avatar: (row.avatar_url as string | null) ?? undefined,
    services,
    schedule,
  };
}

export async function getProfessionals(): Promise<Professional[]> {
  const { data, error } = await supabase
    .from("professionals")
    .select(
      "*, professional_services(service_id), professional_schedules(day_of_week, start_time, end_time)"
    )
    .order("name");
  if (error) throw error;
  return (data as Record<string, unknown>[]).map(mapProfessional);
}

export async function createProfessional(
  professional: Omit<Professional, "id">
): Promise<Professional> {
  const { data: prof, error: profError } = await supabase
    .from("professionals")
    .insert({ name: professional.name, avatar_url: professional.avatar ?? null })
    .select()
    .single();
  if (profError) throw profError;

  if (professional.services.length > 0) {
    const { error } = await supabase.from("professional_services").insert(
      professional.services.map((sid) => ({
        professional_id: prof.id,
        service_id: sid,
      }))
    );
    if (error) throw error;
  }

  if (professional.schedule.length > 0) {
    const { error } = await supabase.from("professional_schedules").insert(
      professional.schedule.map((s) => ({
        professional_id: prof.id,
        day_of_week: s.dayOfWeek,
        start_time: s.startTime,
        end_time: s.endTime,
      }))
    );
    if (error) throw error;
  }

  return {
    id: prof.id,
    name: prof.name,
    avatar: prof.avatar_url ?? undefined,
    services: professional.services,
    schedule: professional.schedule,
  };
}

export async function updateProfessional(
  id: string,
  professional: Omit<Professional, "id">
): Promise<void> {
  const { error: nameError } = await supabase
    .from("professionals")
    .update({ name: professional.name })
    .eq("id", id);
  if (nameError) throw nameError;

  await supabase.from("professional_services").delete().eq("professional_id", id);
  if (professional.services.length > 0) {
    const { error } = await supabase.from("professional_services").insert(
      professional.services.map((sid) => ({ professional_id: id, service_id: sid }))
    );
    if (error) throw error;
  }

  await supabase.from("professional_schedules").delete().eq("professional_id", id);
  if (professional.schedule.length > 0) {
    const { error } = await supabase.from("professional_schedules").insert(
      professional.schedule.map((s) => ({
        professional_id: id,
        day_of_week: s.dayOfWeek,
        start_time: s.startTime,
        end_time: s.endTime,
      }))
    );
    if (error) throw error;
  }
}

export async function deleteProfessional(id: string): Promise<void> {
  const { error } = await supabase.from("professionals").delete().eq("id", id);
  if (error) throw error;
}

// ── Appointments ─────────────────────────────────────────────────────────────

function mapAppointment(row: Record<string, unknown>): Appointment {
  return {
    id: row.id as string,
    clientName: row.client_name as string,
    clientPhone: row.client_phone as string,
    serviceId: row.service_id as string,
    professionalId: row.professional_id as string,
    date: row.appointment_date as string,
    time: (row.appointment_time as string).slice(0, 5),
    status: row.status as Appointment["status"],
    notes: (row.notes as string | null) ?? undefined,
  };
}

export async function getAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date")
    .order("appointment_time");
  if (error) throw error;
  return (data as Record<string, unknown>[]).map(mapAppointment);
}

export async function createAppointment(
  appointment: Omit<Appointment, "id">
): Promise<Appointment> {
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      client_name: appointment.clientName,
      client_phone: appointment.clientPhone,
      service_id: appointment.serviceId,
      professional_id: appointment.professionalId,
      appointment_date: appointment.date,
      appointment_time: appointment.time,
      status: appointment.status,
      notes: appointment.notes || null,
    })
    .select()
    .single();
  if (error) throw error;
  return mapAppointment(data as Record<string, unknown>);
}

export async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Promise<void> {
  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}
