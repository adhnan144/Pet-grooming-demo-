import React from "react";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs: string[];
  onNavigateBreadcrumb?: (index: number) => void;
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative pt-36 pb-20 bg-forest text-white overflow-hidden" id="page-header-container">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 rounded-full border border-gold/30 blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-10 w-80 h-80 rounded-full border border-gold/20 blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-1.5 text-xs tracking-wider uppercase text-gold font-sans mb-4">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className={idx === breadcrumbs.length - 1 ? "text-gold font-medium" : "text-white/60"}>
                {crumb}
              </span>
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3 h-3 text-white/30" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 font-medium text-white max-w-3xl mx-auto leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
