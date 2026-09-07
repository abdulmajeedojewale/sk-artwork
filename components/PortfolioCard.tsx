'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Maximize2, UserCheck } from 'lucide-react';
import { PortfolioProject } from '@/types/database';
import { useImageViewer } from '@/context/ImageViewerContext';

interface PortfolioCardProps {
  project: PortfolioProject;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  const { openImage } = useImageViewer();

  return (
    <div className="group relative bg-[#121824] border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 shadow-xl flex flex-col justify-between">
      
      {/* Cover Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 cursor-pointer">
        <img
          src={project.cover_image}
          alt={project.title}
          onClick={() => openImage(project.cover_image, project.title, project.category?.name || 'Studio Commission')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-80 pointer-events-none" />

        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[11px] font-bold">
            {project.category?.name || 'Fine Art'}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openImage(project.cover_image, project.title, project.category?.name || 'Studio Commission');
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-900 transition-all shadow-lg"
            title="View Full Image"
            aria-label="View Full Image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <Link
            href={`/portfolio/${project.slug}`}
            className="p-2.5 rounded-xl bg-amber-500 text-slate-950 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-amber-500/20"
            aria-label="View Project Details"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/portfolio/${project.slug}`}>
            <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tools Badges & Info */}
        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex flex-wrap gap-1">
            {project.tools_used.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>

          {project.client_name && (
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <UserCheck className="w-3 h-3 text-amber-400" />
              {project.client_name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
