import React from 'react';
import { FilterOptions } from '../types/alumni';

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  degrees: string[];
  branches: string[];
  companies: string[];
  batches: number[];
  graduationYears: number[];
}

export function Filters({
  filters,
  onFilterChange,
  degrees,
  branches,
  companies,
  batches,
  graduationYears,
}: FiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Batch</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.batch || ''}
            onChange={(e) => onFilterChange({ ...filters, batch: e.target.value ? Number(e.target.value) : undefined })}
          >
            <option value="">All Batches</option>
            {batches.map((batch) => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.graduation_year || ''}
            onChange={(e) => onFilterChange({ ...filters, graduation_year: e.target.value ? Number(e.target.value) : undefined })}
          >
            <option value="">All Years</option>
            {graduationYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Degree</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.degree || ''}
            onChange={(e) => onFilterChange({ ...filters, degree: e.target.value || undefined })}
          >
            <option value="">All Degrees</option>
            {degrees.map((degree) => (
              <option key={degree} value={degree}>{degree}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.branch || ''}
            onChange={(e) => onFilterChange({ ...filters, branch: e.target.value || undefined })}
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.company || ''}
            onChange={(e) => onFilterChange({ ...filters, company: e.target.value || undefined })}
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}