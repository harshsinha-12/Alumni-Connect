import React from 'react';
import { ExternalLink, Building2, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { Alumni } from '../types/alumni';

interface AlumniCardProps {
  alumni: Alumni;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={alumni.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(alumni.name)}&background=random`}
          alt={alumni.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{alumni.name}</h3>
          <a 
            href={alumni.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
          >
            <ExternalLink size={14} /> LinkedIn Profile
          </a>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Building2 size={16} />
          <span>{alumni.company}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <GraduationCap size={16} />
          <span>{alumni.degree}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen size={16} />
          <span>{alumni.branch}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>Batch {alumni.batch} • Graduated {alumni.graduation_year}</span>
        </div>
      </div>
    </div>
  );
}