import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Alumni } from '../types/alumni';

interface AlumniFormProps {
  onSubmit: (alumni: Omit<Alumni, 'id' | 'user_id' | 'created_at'>) => void;
}

export function AlumniForm({ onSubmit }: AlumniFormProps) {
  const { session } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    batch: new Date().getFullYear(),
    graduation_year: new Date().getFullYear(),
    degree: '',
    branch: '',
    email: '',
    linkedin_url: '',
    company: '',
    profile_image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user) {
      onSubmit({
        ...formData,
        user_id: session.user.id
      });
      setFormData({
        name: '',
        batch: new Date().getFullYear(),
        graduation_year: new Date().getFullYear(),
        degree: '',
        branch: '',
        email: '',
        linkedin_url: '',
        company: '',
        profile_image: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Add Alumni Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Batch</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.graduation_year}
              onChange={(e) => setFormData({ ...formData, graduation_year: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Degree</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g., B.Tech, M.Tech"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              placeholder="e.g., Computer Science"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <input
            type="url"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.linkedin_url}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image URL (optional)</label>
          <input
            type="url"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.profile_image}
            onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Alumni
        </button>
      </div>
    </form>
  );
}