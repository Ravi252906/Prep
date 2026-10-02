import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

const QuickActionCard = ({ label, description, icon, route, color }) => {
  const navigate = useNavigate();
  const Icon = Icons[icon];

  return (
    <button
      onClick={() => navigate(route)}
      className="card card-hover p-6 text-left group relative overflow-hidden"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-primary-700 transition-colors">
          {label}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <Icons.ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
    </button>
  );
};

export default QuickActionCard;
