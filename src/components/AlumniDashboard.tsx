import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useAlumni } from '../hooks/useAlumni';
import { AlumniCard } from './AlumniCard';
import { Filters } from './Filters';
import { AlumniForm } from './AlumniForm';
import type { FilterOptions } from '../types/alumni';

export function AlumniDashboard() {
  const { alumni, isLoading, createAlumni } = useAlumni();
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const filterOptions = {
    degrees: [...new Set(alumni.map(a => a.degree))],
    branches: [...new Set(alumni.map(a => a.branch))],
    companies: [...new Set(alumni.map(a => a.company))],
    batches: [...new Set(alumni.map(a => a.batch))],
    graduationYears: [...new Set(alumni.map(a => a.graduation_year))]
  };

  const filteredAlumni = alumni.filter(a => {
    return (!filters.batch || a.batch === filters.batch) &&
      (!filters.graduation_year || a.graduation_year === filters.graduation_year) &&
      (!filters.degree || a.degree === filters.degree) &&
      (!filters.branch || a.branch === filters.branch) &&
      (!filters.company || a.company === filters.company);
  });

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Alumni Directory</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {showForm ? 'Close Form' : 'Add Alumni'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              {...filterOptions}
            />
          </div>
          
          <div className="lg:col-span-3">
            {showForm && (
              <div className="mb-6">
                <AlumniForm onSubmit={(data) => {
                  createAlumni(data);
                  setShowForm(false);
                }} />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAlumni.map(alumnus => (
                <AlumniCard key={alumnus.id} alumni={alumnus} />
              ))}
              {filteredAlumni.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No alumni found matching the selected filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}