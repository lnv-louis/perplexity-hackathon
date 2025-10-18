'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative">
      {/* Shader Gradient Background */}
      <div className="fixed inset-0 z-0">
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=off&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.7&cAzimuthAngle=180&cDistance=4.8&cPolarAngle=90&cameraZoom=1&color1=%23dcffdb&color2=%2388ff85&color3=%2320d3a8&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=2.1&positionX=-1.5&positionY=1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&toggleAxis=false&type=plane&uAmplitude=0&uDensity=2.1&uFrequency=5.5&uSpeed=0.1&uStrength=5.3&uTime=0&wireframe=false&zoomOut=false"
          />
        </ShaderGradientCanvas>
      </div>

      <div className="relative z-10">
        <header className="p-6 border-b bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">Homiq</span>
            </Link>
            <Link href="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-12 px-6">
          <Card className="bg-white p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
              <p className="text-lg text-gray-600">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            <div className="mb-8">
              <Card className="p-6 bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">support@homiq.com</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us more about your question or feedback..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-medium"
            >
              Send Message
            </Button>
          </form>
        </Card>
      </main>
    </div>
    </div>
  );
}
