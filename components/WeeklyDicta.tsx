import React, { useState } from 'react';
import { PageHeader } from './common/PageHeader';
import { SectionWrapper } from './common/SectionWrapper';
import { BookOpenIcon, ChevronDownIcon, ChevronUpIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { WeeklyDictaItem } from '../types';

interface WeeklyDictaProps {
    items: WeeklyDictaItem[];
}

export const WeeklyDicta: React.FC<WeeklyDictaProps> = ({ items }) => {
    const [expandedId, setExpandedId] = useState<string | null>(items.length > 0 ? items[0].id : null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const publishedItems = items.filter(item => item.isPublished);

    return (
        <>
            <PageHeader
                title={"Weekly\nDicta"}
                subtitle="Official announcements and updates for the PAU School of Law community."
                icon={BookOpenIcon}
            />

            <SectionWrapper>
                <div className="max-w-4xl mx-auto space-y-8">
                    {publishedItems.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p>No Weekly Dicta issues found.</p>
                        </div>
                    ) : (
                        publishedItems.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 ${expandedId === item.id
                                    ? 'shadow-xl border-pau-gold ring-1 ring-pau-gold/20'
                                    : 'shadow-md border-gray-100 hover:shadow-lg'
                                    }`}
                            >
                                {/* Header / Summary */}
                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="w-full text-left p-8 md:p-10 flex flex-col md:flex-row gap-6 md:items-center justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center text-pau-gold font-bold text-sm tracking-widest uppercase mb-2">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            {item.publishDate}
                                        </div>
                                        <h3 className={`text-2xl font-serif font-bold transition-colors ${expandedId === item.id ? 'text-pau-darkBlue' : 'text-gray-800 group-hover:text-pau-blue'}`}>
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-gray-600 line-clamp-2 md:line-clamp-1">{item.intro}</p>
                                    </div>

                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${expandedId === item.id ? 'bg-pau-gold text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-pau-blue/10 group-hover:text-pau-blue'
                                        }`}>
                                        {expandedId === item.id ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                {expandedId === item.id && (
                                    <div className="px-8 md:px-10 pb-10 pt-2 border-t border-gray-100 animate-fade-in">
                                        <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                                            {/* Intro */}
                                            <div className="mb-8 font-serif text-xl text-pau-darkBlue italic">
                                                {item.intro}
                                            </div>

                                            {/* Notices Dynamic Rendering */}
                                            {item.body ? (
                                                <div dangerouslySetInnerHTML={{ __html: item.body }} />
                                            ) : (
                                                <p className="text-gray-500 italic">[Content display under construction - Please update Admin to support full newsletter body]</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </SectionWrapper>
        </>
    );
};
