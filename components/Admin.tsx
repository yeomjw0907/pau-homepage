
import React, { useState, useRef, useEffect } from 'react';
import { 
  HomeContent, 
  AdmissionsContent, 
  AcademicsContent, 
  FacultyContent,
  FacultyMember,
  NoticesContent,
  NewsItem,
  GlobalAlert
} from '../types';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  CloudArrowUpIcon,
  PlusIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  NewspaperIcon, 
  PhotoIcon, 
  BellIcon, 
  BookmarkIcon as BookmarkOutlineIcon,
  CalendarIcon, 
  ListBulletIcon, 
  QueueListIcon, 
  MinusIcon as HorizontalRuleIcon,
  PencilSquareIcon,
  SwatchIcon,
  UserCircleIcon,
  BookOpenIcon,
  IdentificationIcon,
  XMarkIcon,
  MegaphoneIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// --- Rich Text Editor Toolbar Component ---
const RichTextToolbar = ({ onCommand }: { onCommand: (cmd: string, val?: string) => void }) => {
  const fontSizes = [
    { label: 'Small', value: '2' },
    { label: 'Normal', value: '3' },
    { label: 'Large', value: '5' },
    { label: 'Huge', value: '7' },
  ];
  const colors = ["#000000", "#003366", "#C49A6C", "#FF0000", "#38A169", "#718096", "#FFFFFF"];

  const handleBtnDown = (e: React.MouseEvent, cmd: string, val?: string) => {
    e.preventDefault(); // Keep focus in contentEditable
    onCommand(cmd, val);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50 border border-gray-300 border-b-0 rounded-t-xl sticky top-0 z-20 shadow-sm">
      <div className="flex items-center bg-white border border-gray-200 rounded px-2 mr-2">
        <span className="text-[10px] font-bold text-gray-400 mr-2">SIZE</span>
        <select 
          onMouseDown={(e) => e.stopPropagation()} 
          onChange={(e) => onCommand('fontSize', e.target.value)}
          className="text-xs py-1 bg-transparent outline-none cursor-pointer font-medium"
          defaultValue="3"
        >
          {fontSizes.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>

      <div className="flex bg-white border border-gray-200 rounded overflow-hidden mr-2">
        <button type="button" onMouseDown={(e) => handleBtnDown(e, 'bold')} className="p-2 hover:bg-gray-100 font-bold w-9 text-sm">B</button>
        <button type="button" onMouseDown={(e) => handleBtnDown(e, 'italic')} className="p-2 hover:bg-gray-100 italic w-9 text-sm border-l border-gray-100">I</button>
        <button type="button" onMouseDown={(e) => handleBtnDown(e, 'underline')} className="p-2 hover:bg-gray-100 underline w-9 text-sm border-l border-gray-100">U</button>
      </div>

      <div className="flex items-center bg-white border border-gray-200 rounded p-1 mr-2 gap-1">
        <SwatchIcon className="h-4 w-4 text-gray-400 ml-1 mr-1" />
        {colors.map(color => (
          <button
            key={color}
            type="button"
            onMouseDown={(e) => handleBtnDown(e, 'foreColor', color)}
            className="w-5 h-5 rounded border border-gray-200 hover:scale-110 shadow-inner"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex bg-white border border-gray-200 rounded overflow-hidden mr-2">
        <button type="button" onMouseDown={(e) => handleBtnDown(e, 'insertUnorderedList')} className="p-2 hover:bg-gray-100 border-r border-gray-100" title="Bullet List">
          <ListBulletIcon className="h-4 w-4" />
        </button>
        <button type="button" onMouseDown={(e) => handleBtnDown(e, 'insertOrderedList')} className="p-2 hover:bg-gray-100" title="Numbered List">
          <QueueListIcon className="h-4 w-4" />
        </button>
      </div>

      <button 
        type="button" 
        onMouseDown={(e) => handleBtnDown(e, 'insertHorizontalRule')} 
        className="px-3 py-2 bg-white border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-2 text-[10px] font-bold uppercase"
      >
        <HorizontalRuleIcon className="h-4 w-4" /> Divider
      </button>
    </div>
  );
};

// --- Stabilized Rich Text Input ---
const RichTextInput = ({ initialValue, onChange }: { initialValue: string, onChange: (html: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue || '<p><br></p>';
      document.execCommand('defaultParagraphSeparator', false, 'p');
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onChange(editorRef.current!.innerHTML);
      }, 400); // Faster sync for smoother feel
    }
  };

  const executeCommand = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    handleInput();
  };

  return (
    <div className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${
      isFocused ? 'border-pau-blue ring-4 ring-pau-blue/5 shadow-lg' : 'border-gray-300'
    }`}>
      <RichTextToolbar onCommand={executeCommand} />
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (editorRef.current) onChange(editorRef.current.innerHTML);
        }}
        className="w-full min-h-[350px] p-8 bg-white focus:outline-none text-gray-800 leading-relaxed font-sans editor-content"
      />
      <style>{`
        .editor-content { min-height: 350px; }
        .editor-content p { margin-bottom: 1em; }
        .editor-content b, .editor-content strong { font-weight: 700; }
        .editor-content ul { list-style-type: disc !important; padding-left: 2rem !important; margin: 1rem 0 !important; }
        .editor-content ol { list-style-type: decimal !important; padding-left: 2rem !important; margin: 1rem 0 !important; }
        .editor-content li { display: list-item !important; margin-bottom: 0.5rem; }
        .editor-content hr { border: 0; border-top: 2px solid #e5e7eb; margin: 2rem 0; }
        .editor-content:empty:before { content: 'Start typing academic content...'; color: #9ca3af; }
      `}</style>
    </div>
  );
};

// --- Multi-Image Local Uploader ---
const MultiImageUploader = ({ images, onUpdate }: { images: string[], onUpdate: (imgs: string[]) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files) as File[];
    const readers = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(newImgs => {
      onUpdate([...images, ...newImgs]);
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-white shadow-md group">
            <img src={img} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button type="button" onClick={() => onUpdate(images.filter((_, idx) => idx !== i))} className="p-2 bg-red-500 text-white rounded-full">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-pau-blue hover:text-pau-blue transition-all bg-white/50">
          <PhotoIcon className="h-6 w-6 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Add Image</span>
        </button>
      </div>
      <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

interface AdminProps {
  home: HomeContent;
  setHome: (c: HomeContent) => void;
  admissions: AdmissionsContent;
  setAdmissions: (c: AdmissionsContent) => void;
  academics: AcademicsContent;
  setAcademics: (c: AcademicsContent) => void;
  faculty: FacultyContent;
  setFaculty: (c: FacultyContent) => void;
  notices: NoticesContent;
  setNotices: (c: NoticesContent) => void;
  globalAlert: GlobalAlert;
  setGlobalAlert: (a: GlobalAlert) => void;
}

// --- Main Admin Dashboard ---
export const Admin: React.FC<AdminProps> = ({ 
  home, setHome, 
  admissions, setAdmissions, 
  academics, setAcademics, 
  faculty, setFaculty, 
  notices, setNotices,
  globalAlert, setGlobalAlert
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // HANDLERS
  const updateNewsItem = (index: number, field: string, value: any) => {
    const newList = [...home.latestNews];
    newList[index] = { ...newList[index], [field]: value };
    setHome({ ...home, latestNews: newList });
  };

  const updateNoticeItem = (index: number, field: string, value: any) => {
    const newList = [...notices.notices];
    newList[index] = { ...newList[index], [field]: value };
    setNotices({ ...notices, notices: newList });
  };

  const updateFacultyItem = (index: number, field: string, value: any) => {
    const newList = [...faculty.facultyList];
    newList[index] = { ...newList[index], [field]: value };
    setFaculty({ ...faculty, facultyList: newList });
  };

  const updateAcademicProgram = (index: number, field: string, value: any) => {
    const newList = [...academics.programs];
    newList[index] = { ...newList[index], [field]: value };
    setAcademics({ ...academics, programs: newList });
  };

  // RENDER DATE INPUT HELPER
  const DateInput = ({ value, onChange, colorClass = "text-pau-gold" }: any) => (
    <div className="relative w-full h-[58px] group cursor-pointer" onClick={(e) => {
      const input = e.currentTarget.querySelector('input');
      if (input) input.showPicker();
    }}>
      <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${colorClass} z-10`}>
        <CalendarIcon className="h-5 w-5" />
      </div>
      <input 
        type="date" 
        className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="w-full h-full pl-12 pr-4 flex items-center border border-gray-200 rounded-lg bg-gray-50 font-bold text-gray-700 group-hover:border-pau-blue transition-colors shadow-inner">
        {value || 'Select Date'}
      </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle, btnLabel, onBtnClick }: any) => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 pb-8 border-b border-gray-100 gap-4">
      <div>
        <h2 className="text-2xl font-serif font-bold text-pau-darkBlue">{title}</h2>
        <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
      </div>
      {btnLabel && (
        <button 
          onClick={onBtnClick}
          className="flex items-center justify-center bg-pau-blue text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-pau-darkBlue transition-all"
        >
          <PlusIcon className="h-4 w-4 mr-2" /> {btnLabel}
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-pau-blue rounded-2xl shadow-xl">
              <PencilSquareIcon className="h-8 w-8 text-pau-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-pau-darkBlue tracking-tight">University Management</h1>
              <p className="text-gray-400 text-sm font-medium tracking-wide">Pacific American University • Law School Admin</p>
            </div>
          </div>
          <button onClick={triggerToast} className="flex items-center justify-center bg-pau-gold text-white px-12 py-4 rounded-full font-bold shadow-glow hover:scale-105 transition-all">
            <CloudArrowUpIcon className="h-5 w-5 mr-3" /> Sync Updates Live
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-3">
            {[
              { id: 'general', label: 'Site Settings', icon: ComputerDesktopIcon },
              { id: 'admissions', label: 'Admissions Data', icon: UserGroupIcon },
              { id: 'news', label: 'Latest News', icon: NewspaperIcon },
              { id: 'notices', label: 'Notice Board', icon: BellIcon },
              { id: 'faculty', label: 'Faculty Profiles', icon: UserCircleIcon },
              { id: 'academics', label: 'Curriculum', icon: AcademicCapIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-5 text-[13px] font-bold uppercase tracking-widest rounded-2xl transition-all border ${
                  activeTab === tab.id 
                    ? 'bg-pau-blue text-white shadow-xl border-pau-blue translate-x-2' 
                    : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-100'
                }`}
              >
                <tab.icon className={`h-5 w-5 mr-4 ${activeTab === tab.id ? 'text-pau-gold' : 'text-gray-300'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-soft border border-gray-100 min-h-[900px] overflow-hidden">
            
            {/* 0. GENERAL SETTINGS (NEW) */}
            {activeTab === 'general' && (
              <div className="p-10 animate-fade-in">
                 <SectionHeader title="Global Site Settings" subtitle="Manage emergency alerts and homepage branding" />
                 
                 {/* Global Alert */}
                 <div className={`p-8 rounded-2xl border-2 mb-12 transition-colors ${globalAlert.active ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-bold text-pau-darkBlue flex items-center">
                         <MegaphoneIcon className="h-5 w-5 mr-2 text-pau-gold" />
                         Global Alert Banner
                       </h3>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={globalAlert.active} onChange={(e) => setGlobalAlert({...globalAlert, active: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pau-gold"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900">{globalAlert.active ? 'Active' : 'Inactive'}</span>
                        </label>
                    </div>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Alert Message (e.g., Campus closed due to weather)" 
                        className="w-full p-4 border border-gray-200 rounded-lg"
                        value={globalAlert.message}
                        onChange={(e) => setGlobalAlert({...globalAlert, message: e.target.value})}
                      />
                      <div className="flex gap-4">
                        {['info', 'warning', 'emergency'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setGlobalAlert({...globalAlert, type: type as any})}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                              globalAlert.type === type 
                              ? 'border-pau-blue bg-pau-blue text-white' 
                              : 'border-gray-200 text-gray-400 hover:border-gray-300'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                 </div>

                 {/* Hero Branding */}
                 <div className="p-8 rounded-2xl bg-white border border-gray-100">
                    <h3 className="font-bold text-pau-darkBlue mb-6 flex items-center">
                      <ComputerDesktopIcon className="h-5 w-5 mr-2 text-pau-gold" />
                      Homepage Hero
                    </h3>
                    <div className="space-y-6">
                       <div>
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Hero Headline</label>
                         <textarea 
                           rows={2} 
                           className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-serif font-bold text-lg text-pau-darkBlue"
                           value={home.heroTitle}
                           onChange={(e) => setHome({...home, heroTitle: e.target.value})}
                         />
                       </div>
                       <div>
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Hero Subtitle</label>
                         <textarea 
                           rows={2} 
                           className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                           value={home.heroSubtitle}
                           onChange={(e) => setHome({...home, heroSubtitle: e.target.value})}
                         />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* 1. ADMISSIONS (NEW) */}
            {activeTab === 'admissions' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader 
                  title="Admissions Management" 
                  subtitle="Update deadlines and tuition fees"
                  btnLabel="Add Deadline"
                  onBtnClick={() => setAdmissions({ ...admissions, deadlines: [...admissions.deadlines, { term: 'New Term', date: '', type: 'Regular Decision' }] })}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="bg-pau-blue/5 p-8 rounded-3xl border border-pau-blue/10">
                      <h3 className="text-sm font-bold text-pau-blue uppercase tracking-widest mb-6 flex items-center">
                        <CurrencyDollarIcon className="h-5 w-5 mr-2" /> Tuition Control
                      </h3>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Annual Tuition Cost</label>
                        <input 
                          type="text" 
                          className="w-full p-4 bg-white border border-gray-200 rounded-lg font-bold text-xl text-green-600"
                          value={admissions.tuitionCost}
                          onChange={(e) => setAdmissions({...admissions, tuitionCost: e.target.value})}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Tuition Info Blurb</label>
                        <textarea 
                          rows={3} 
                          className="w-full p-4 bg-white border border-gray-200 rounded-lg text-sm"
                          value={admissions.tuitionInfo}
                          onChange={(e) => setAdmissions({...admissions, tuitionInfo: e.target.value})}
                        />
                      </div>
                   </div>
                   
                   <div className="bg-white p-8 rounded-3xl border border-gray-100">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" /> Application Deadlines
                      </h3>
                      <div className="space-y-4">
                         {admissions.deadlines.map((dl, i) => (
                           <div key={i} className="flex gap-3 items-center group">
                              <input 
                                type="text" 
                                className="w-1/3 p-3 bg-gray-50 border border-gray-200 rounded text-sm font-bold" 
                                value={dl.term} 
                                onChange={(e) => {
                                  const newDL = [...admissions.deadlines];
                                  newDL[i].term = e.target.value;
                                  setAdmissions({...admissions, deadlines: newDL});
                                }}
                              />
                              <input 
                                type="text" 
                                className="w-1/3 p-3 bg-gray-50 border border-gray-200 rounded text-sm" 
                                value={dl.date} 
                                onChange={(e) => {
                                  const newDL = [...admissions.deadlines];
                                  newDL[i].date = e.target.value;
                                  setAdmissions({...admissions, deadlines: newDL});
                                }}
                              />
                              <button onClick={() => setAdmissions({...admissions, deadlines: admissions.deadlines.filter((_, idx) => idx !== i)})} className="p-2 text-gray-300 hover:text-red-500">
                                <TrashIcon className="h-5 w-5" />
                              </button>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* 2. LATEST NEWS */}
            {activeTab === 'news' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader 
                  title="Manage Latest News" 
                  subtitle="Publish articles and updates to the home page"
                  btnLabel="Add News Item"
                  onBtnClick={() => setHome({ ...home, latestNews: [{ id: Date.now().toString(), title: '', date: '', summary: '', body: '', category: 'General', images: [] }, ...home.latestNews] })}
                />
                
                {home.latestNews.map((item: any, i: number) => (
                  <div key={item.id} className={`relative p-10 border-2 rounded-3xl bg-white transition-all mb-12 shadow-sm ${item.isPinned ? 'border-pau-gold ring-1 ring-pau-gold/5' : 'border-gray-100'}`}>
                    <div className="absolute -top-5 right-8 flex items-center gap-3">
                      <button onClick={() => updateNewsItem(i, 'isPinned', !item.isPinned)} className={`p-3 rounded-full shadow-lg border-2 ${item.isPinned ? 'bg-pau-gold text-white border-white' : 'bg-white text-gray-300 border-gray-100'}`}>
                        {item.isPinned ? <BookmarkSolidIcon className="h-5 w-5" /> : <BookmarkOutlineIcon className="h-5 w-5" />}
                      </button>
                      <button onClick={() => setHome({ ...home, latestNews: home.latestNews.filter((_: any, idx: number) => idx !== i) })} className="p-3 bg-white text-red-400 border-2 border-gray-100 rounded-full hover:text-red-600 shadow-lg">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">News Headline</label>
                        <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-bold" value={item.title} onChange={(e) => updateNewsItem(i, 'title', e.target.value)} placeholder="Title" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Publication Date</label>
                        <DateInput value={item.date} onChange={(val: string) => updateNewsItem(i, 'date', val)} />
                      </div>
                    </div>
                    <div className="mb-10">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Attached Images</label>
                      <MultiImageUploader images={item.images || []} onUpdate={(imgs) => updateNewsItem(i, 'images', imgs)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Article Content (Editor)</label>
                      <RichTextInput initialValue={item.body} onChange={(html) => updateNewsItem(i, 'body', html)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. NOTICE BOARD */}
            {activeTab === 'notices' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader 
                  title="Campus Notices" 
                  subtitle="Important updates for students and staff"
                  btnLabel="Post New Notice"
                  onBtnClick={() => setNotices({ ...notices, notices: [{ id: Date.now().toString(), title: '', date: '', summary: '', body: '', category: 'Academic', images: [] }, ...notices.notices] })}
                />
                
                {notices.notices.map((notice: any, i: number) => (
                  <div key={notice.id} className={`relative p-10 border-2 rounded-3xl bg-white transition-all mb-12 shadow-sm ${notice.isPinned ? 'border-pau-blue ring-1 ring-pau-blue/5' : 'border-gray-100'}`}>
                    <div className="absolute -top-5 right-8 flex items-center gap-3">
                      <button onClick={() => updateNoticeItem(i, 'isPinned', !notice.isPinned)} className={`p-3 rounded-full shadow-lg border-2 ${notice.isPinned ? 'bg-pau-blue text-white border-white' : 'bg-white text-gray-300 border-gray-100'}`}>
                        {notice.isPinned ? <BookmarkSolidIcon className="h-5 w-5" /> : <BookmarkOutlineIcon className="h-5 w-5" />}
                      </button>
                      <button onClick={() => setNotices({ ...notices, notices: notices.notices.filter((_: any, idx: number) => idx !== i) })} className="p-3 bg-white text-red-400 border-2 border-gray-100 rounded-full hover:text-red-600 shadow-lg">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Notice Title</label>
                        <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-bold" value={notice.title} onChange={(e) => updateNoticeItem(i, 'title', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Effective Date</label>
                        <DateInput value={notice.date} onChange={(val: string) => updateNoticeItem(i, 'date', val)} colorClass="text-pau-blue" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Notice Body</label>
                      <RichTextInput initialValue={notice.body} onChange={(html) => updateNoticeItem(i, 'body', html)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. FACULTY PROFILES */}
            {activeTab === 'faculty' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader 
                  title="Faculty Management" 
                  subtitle="Edit professor bios and academic expertise"
                  btnLabel="Add Faculty Member"
                  onBtnClick={() => setFaculty({ ...faculty, facultyList: [{ name: 'New Professor', title: '', education: '', bio: '', expertise: [] }, ...faculty.facultyList] })}
                />
                
                {faculty.facultyList.map((member: any, i: number) => (
                  <div key={i} className="relative p-10 border border-gray-100 rounded-3xl bg-gray-50/30 mb-12 shadow-sm">
                    <div className="absolute top-4 right-4">
                      <button onClick={() => setFaculty({ ...faculty, facultyList: faculty.facultyList.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-red-300 hover:text-red-500 transition-colors">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                       <div className="md:col-span-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Full Name</label>
                          <input type="text" className="w-full p-4 bg-white border border-gray-200 rounded-lg font-bold" value={member.name} onChange={(e) => updateFacultyItem(i, 'name', e.target.value)} />
                       </div>
                       <div className="md:col-span-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Academic Title</label>
                          <input type="text" className="w-full p-4 bg-white border border-gray-200 rounded-lg font-serif italic" value={member.title} onChange={(e) => updateFacultyItem(i, 'title', e.target.value)} />
                       </div>
                       <div className="md:col-span-1">
                          <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Education</label>
                          <input type="text" className="w-full p-4 bg-white border border-gray-200 rounded-lg" value={member.education} onChange={(e) => updateFacultyItem(i, 'education', e.target.value)} />
                       </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Biography</label>
                      <textarea rows={4} className="w-full p-4 bg-white border border-gray-200 rounded-lg text-sm" value={member.bio} onChange={(e) => updateFacultyItem(i, 'bio', e.target.value)} />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Expertise Areas (Comma separated)</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white border border-gray-200 rounded-lg text-sm" 
                        value={member.expertise?.join(', ')} 
                        onChange={(e) => updateFacultyItem(i, 'expertise', e.target.value.split(',').map(s => s.trim()))} 
                        placeholder="e.g. Civil Rights, Tech Law, Criminal Justice"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. CURRICULUM (ACADEMICS) */}
            {activeTab === 'academics' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader 
                  title="Degree Curriculum" 
                  subtitle="Maintain degree programs and specialized concentrations"
                  btnLabel="Add Program"
                  onBtnClick={() => setAcademics({ ...academics, programs: [...academics.programs, { name: 'New Program', description: '' }] })}
                />
                
                <div className="space-y-8">
                  <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
                    <h3 className="text-sm font-bold text-pau-darkBlue uppercase tracking-widest mb-6 flex items-center">
                      <BookOpenIcon className="h-5 w-5 mr-3 text-pau-gold" /> Programs & Descriptions
                    </h3>
                    <div className="space-y-6">
                      {academics.programs.map((prog: any, i: number) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative group">
                          <button onClick={() => setAcademics({ ...academics, programs: academics.programs.filter((_: any, idx: number) => idx !== i) })} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-500 transition-all">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                          <input type="text" className="w-full p-3 bg-gray-50 border-none rounded mb-2 font-bold text-pau-blue focus:ring-1 focus:ring-pau-gold" value={prog.name} onChange={(e) => updateAcademicProgram(i, 'name', e.target.value)} />
                          <textarea rows={2} className="w-full p-3 border-none bg-transparent text-sm text-gray-600 focus:ring-0" value={prog.description} onChange={(e) => updateAcademicProgram(i, 'description', e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                      <IdentificationIcon className="h-5 w-5 mr-3" /> Area Concentrations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {academics.concentrations.map((conc: string, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          <input 
                            type="text" 
                            className="flex-grow p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium" 
                            value={conc} 
                            onChange={(e) => {
                              const newList = [...academics.concentrations];
                              newList[i] = e.target.value;
                              setAcademics({ ...academics, concentrations: newList });
                            }} 
                          />
                          <button onClick={() => setAcademics({ ...academics, concentrations: academics.concentrations.filter((_: any, idx: number) => idx !== i) })} className="p-2 text-gray-300 hover:text-red-400">
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => setAcademics({ ...academics, concentrations: [...academics.concentrations, 'New Concentration'] })}
                        className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-pau-blue hover:border-pau-blue transition-all"
                      >
                        + Add Concentration
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Persistence Toast */}
      {showToast && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up">
           <div className="flex items-center bg-pau-darkBlue text-white px-10 py-6 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-md">
             <div className="bg-pau-gold rounded-full p-2 mr-5 shadow-inner">
                <CheckCircleIcon className="h-6 w-6 text-pau-darkBlue" />
             </div>
             <div className="flex flex-col">
               <span className="font-bold tracking-tight text-lg">Changes synchronized!</span>
               <span className="text-[10px] uppercase tracking-widest opacity-60">Production Database Updated</span>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};
