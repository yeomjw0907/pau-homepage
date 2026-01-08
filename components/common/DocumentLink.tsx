import React from 'react';
import { DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface DocumentLinkProps {
  title: string;
  type?: string;
}

export const DocumentLink: React.FC<DocumentLinkProps> = ({ title, type = "PDF" }) => (
  <div className="flex items-center justify-between p-4 md:p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-pau-gold transition-all cursor-pointer group">
    <div className="flex items-center">
      <div className="p-3 md:p-4 bg-red-50 text-red-500 rounded-xl mr-3 md:mr-5">
        <DocumentTextIcon className="h-5 md:h-6 w-5 md:w-6" />
      </div>
      <div>
        <h4 className="font-bold text-pau-darkBlue text-sm md:text-lg">{title}</h4>
        <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1">{type} Resource</p>
      </div>
    </div>
    <ArrowDownTrayIcon className="h-4 md:h-5 w-4 md:w-5 text-gray-300" />
  </div>
);











