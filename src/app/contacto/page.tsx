'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Carga Map dinámicamente sin SSR
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Estamos aquí para responder tus preguntas y ayudarte a comenzar tu viaje fitness
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Información de Contacto</h2>
            <p>Dirección: Av. Principal #123, Ciudad de México, CDMX</p>
            <p>Teléfono: +52 (55) 1234-5678</p>
            <p>Email: info@clubactivecenter.com</p>
            <p>Horario: Lunes a Viernes: 6:00 AM - 10:00 PM</p>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-black">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Mensaje"
                className="w-full p-2 border rounded"
                required
              ></textarea>
              <button type="submit" className="w-full bg-black text-white py-2 rounded">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-white">Ubicación</h2>
        <div className="h-[400px] rounded-lg overflow-hidden">
          <Map
            center={{ lat: 19.4326, lng: -99.1332 }}
            zoom={15}
            markers={[{ lat: 19.4326, lng: -99.1332, title: "Club Active Center" }]}
          />
        </div>
      </div>
    </div>
  );
}
