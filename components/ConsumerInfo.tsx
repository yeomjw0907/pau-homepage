
import React from 'react';
import { ConsumerInfoContent } from '../types';
import { InformationCircleIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

interface ConsumerInfoProps {
  content: ConsumerInfoContent;
}

export const ConsumerInfo: React.FC<ConsumerInfoProps> = ({ content }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 pt-44 pb-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
           <InformationCircleIcon className="h-12 w-12 text-pau-gold mx-auto mb-4" />
           <h1 className="text-3xl font-serif font-bold text-pau-blue sm:text-4xl">{content.title}</h1>
           <p className="mt-4 text-lg text-gray-600 font-light">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {content.sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-2">
                <DocumentCheckIcon className="h-6 w-6 text-pau-blue mr-2" />
                {section.title}
              </h2>
              
              {section.content && (
                <div className="prose prose-blue text-gray-600 mb-6 whitespace-pre-wrap">
                  {section.content}
                </div>
              )}

              {section.tableData && (
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {section.tableData.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {row.label}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* State Bar Registration & Accreditation Status */}
        <div className="mt-16 bg-white shadow-soft rounded-2xl border border-gray-100 p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-4">
            <DocumentCheckIcon className="h-6 w-6 text-pau-blue mr-2" />
            State Bar Registration & Accreditation Status
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Pacific American University School of Law is registered with the Committee of Bar Examiners of the State Bar of California as an unaccredited correspondence law school. PAUSL is not accredited by the State Bar of California or the American Bar Association.
            </p>
            <p>
              Study at, or graduation from, this law school may not qualify a student to take the bar examination or to satisfy the requirements for admission to practice in jurisdictions other than California. A student intending to seek admission to practice law in a jurisdiction other than California should contact the admitting authority in that jurisdiction for information regarding the legal education requirements in that jurisdiction for admission to the practice of law.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
          <p className="font-bold mb-2">Note regarding accuracy:</p>
          <p>
            The information provided on this page is compiled in accordance with the guidelines set forth by the Committee of Bar Examiners of the State Bar of California. Pacific American University School of Law certifies that the data presented here is accurate and current as of the last reporting period.
          </p>
        </div>
      </div>
    </div>
  );
};