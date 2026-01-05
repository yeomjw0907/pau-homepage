import React from 'react';
import { PageHeader } from './PageHeader';
import { SectionWrapper } from './SectionWrapper';

interface GenericPageProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export const GenericPage: React.FC<GenericPageProps> = ({ title, subtitle, icon, content }) => (
  <>
    <PageHeader title={title} subtitle={subtitle} icon={icon} />
    <SectionWrapper>
      <div className="max-w-4xl mx-auto prose prose-lg prose-blue text-gray-600">
        {content}
      </div>
    </SectionWrapper>
  </>
);

