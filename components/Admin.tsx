import React, { useState, useRef, useEffect } from 'react';
import {
  HomeContent,
  AdmissionsContent,
  AcademicsContent,
  FacultyContent,
  FacultyMember,
  NoticesContent,
  NewsItem,
  GlobalAlert,
  WeeklyDictaItem,
  RequestInfoItem
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
  ComputerDesktopIcon,
  EnvelopeIcon,
  InboxArrowDownIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { splitAndTrim } from '../utils/stringUtils';
import * as adminService from '../services/adminService';

// --- Components ---

const RichTextToolbar = ({ onCommand }: { onCommand: (cmd: string, val?: string) => void }) => {
  const fontSizes = [
    { label: 'Small', value: '2' },
    { label: 'Normal', value: '3' },
    { label: 'Large', value: '5' },
    { label: 'Huge', value: '7' },
  ];
  const colors = ["#000000", "#003366", "#C49A6C", "#FF0000", "#38A169", "#718096", "#FFFFFF"];

  const handleBtnDown = (e: React.MouseEvent, cmd: string, val?: string) => {
    e.preventDefault();
    onCommand(cmd, val);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 bg-gray-50 border border-gray-300 border-b-0 rounded-t-xl sticky top-0 z-20 shadow-sm">
      <div className="flex items-center bg-white border border-gray-200 rounded px-2 mr-2">
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
    </div>
  );
};

const RichTextInput = ({ initialValue, onChange }: { initialValue: string, onChange: (html: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && initialValue !== undefined && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue || '<p><br></p>';
    }
  }, [initialValue]);

  const handleInput = () => {
    if (editorRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onChange(editorRef.current!.innerHTML);
      }, 500);
    }
  };

  const executeCommand = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    handleInput();
  };

  return (
    <div className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${isFocused ? 'border-pau-blue ring-4 ring-pau-blue/5 shadow-lg' : 'border-gray-300'
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
      `}</style>
    </div>
  );
};

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
      onUpdate([...(images || []), ...newImgs]);
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {(images || []).map((img, i) => (
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
  const [isSyncing, setIsSyncing] = useState(false);

  // New State for additional features
  const [weeklyDicta, setWeeklyDicta] = useState<WeeklyDictaItem[]>([]);
  const [requestInfos, setRequestInfos] = useState<RequestInfoItem[]>([]);

  // Initial Data Fetch
  useEffect(() => {
    const loadData = async () => {
      try {
        const dictas = await adminService.fetchWeeklyDicta();
        setWeeklyDicta(dictas);

        const requests = await adminService.fetchRequestInfos();
        setRequestInfos(requests);
      } catch (error) {
        console.error("Failed to load admin data", error);
      }
    };
    loadData();
  }, []);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      triggerToast();
    } finally {
      setIsSyncing(false);
    }
  };

  // --- Handlers with Supabase Integration ---

  // News
  const handleNewsUpdate = async (index: number, newsItem: NewsItem) => {
    const newList = [...home.latestNews];
    newList[index] = newsItem;
    setHome({ ...home, latestNews: newList });

    if (newsItem.id) {
      if (newsItem.id.length > 10) {
        await adminService.updateNews(newsItem.id, newsItem);
      } else {
        const created = await adminService.createNews({ ...newsItem, id: undefined } as any);
        newList[index] = created;
        setHome({ ...home, latestNews: newList });
      }
    }
    triggerToast();
  };

  const handleNewsDelete = async (index: number) => {
    const item = home.latestNews[index];
    if (item.id) await adminService.deleteNews(item.id);

    const newList = home.latestNews.filter((_, i) => i !== index);
    setHome({ ...home, latestNews: newList });
    triggerToast();
  };

  const handleNewsCreate = async () => {
    const newItem: NewsItem = {
      id: '',
      title: 'New Article',
      date: new Date().toISOString().split('T')[0],
      summary: '',
      body: '',
      category: 'General',
      images: [],
      isPinned: false
    };

    const { id, ...payload } = newItem;
    const created = await adminService.createNews(payload as any);
    setHome({ ...home, latestNews: [created, ...home.latestNews] });
    triggerToast();
  };

  // Notices
  const handleNoticeCreate = async () => {
    const newItem: NewsItem = { id: '', title: 'New Notice', date: new Date().toISOString().split('T')[0], summary: '', body: '', category: 'Notice', isPinned: false };
    const created = await adminService.createNotice(newItem as any);
    setNotices({ ...notices, notices: [created, ...notices.notices] });
  };

  const handleNoticeUpdate = async (index: number, item: NewsItem) => {
    const newList = [...notices.notices];
    newList[index] = item;
    setNotices({ ...notices, notices: newList });
    if (item.id) await adminService.updateNotice(item.id, item);
    triggerToast();
  };

  const handleNoticeDelete = async (index: number) => {
    const item = notices.notices[index];
    if (item.id) await adminService.deleteNotice(item.id);
    setNotices({ ...notices, notices: notices.notices.filter((_, i) => i !== index) });
  };

  // Faculty
  const handleFacultyCreate = async () => {
    const newItem: FacultyMember = { name: 'New Staff', title: 'Position', education: [], bio: '', expertise: [], category: 'Faculty', isActive: true, sortOrder: 0 };
    const created = await adminService.createFaculty(newItem as any);
    setFaculty({ ...faculty, facultyList: [created, ...faculty.facultyList] });
  };

  const handleFacultyUpdate = async (index: number, item: FacultyMember) => {
    const newList = [...faculty.facultyList];
    newList[index] = item;
    setFaculty({ ...faculty, facultyList: newList });
    if (item.id) await adminService.updateFaculty(item.id, item);
    triggerToast();
  };

  const handleFacultyDelete = async (index: number) => {
    const item = faculty.facultyList[index];
    if (item.id) await adminService.deleteFaculty(item.id);
    setFaculty({ ...faculty, facultyList: faculty.facultyList.filter((_, i) => i !== index) });
  };

  // Weekly Dicta (New)
  const handleDictaCreate = async () => {
    const newItem: WeeklyDictaItem = { id: '', title: 'New Weekly Dicta', publishDate: new Date().toISOString().split('T')[0], intro: '', notices: [], isPublished: false };
    const created = await adminService.createWeeklyDicta(newItem as any);
    setWeeklyDicta([created, ...weeklyDicta]);
  };

  const handleDictaUpdate = async (index: number, item: WeeklyDictaItem) => {
    const newList = [...weeklyDicta];
    newList[index] = item;
    setWeeklyDicta(newList);
    if (item.id) await adminService.updateWeeklyDicta(item.id, item);
    triggerToast();
  };

  const handleDictaDelete = async (index: number) => {
    const item = weeklyDicta[index];
    if (item.id) await adminService.deleteWeeklyDicta(item.id);
    setWeeklyDicta(weeklyDicta.filter((_, i) => i !== index));
  };


  // --- Helper Components ---
  const SectionHeader = ({ title, subtitle, btnLabel, onBtnClick }: any) => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 pb-8 border-b border-gray-100 gap-4">
      <div>
        <h2 className="text-2xl font-serif font-bold text-pau-darkBlue">{title}</h2>
        <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
      </div>
      {btnLabel && (
        <button onClick={onBtnClick} className="flex items-center justify-center bg-pau-blue text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-pau-darkBlue transition-all">
          <PlusIcon className="h-4 w-4 mr-2" /> {btnLabel}
        </button>
      )}
    </div>
  );

  const DateInput = ({ value, onChange }: any) => (
    <div className="relative w-full h-[58px]">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pau-gold">
        <CalendarIcon className="h-5 w-5" />
      </div>
      <input type="date" className="w-full h-full pl-12 pr-4 border border-gray-200 rounded-lg bg-gray-50 font-bold text-gray-700 focus:border-pau-blue" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
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
          <button onClick={handleSync} disabled={isSyncing} className="flex items-center justify-center bg-pau-gold text-white px-12 py-4 rounded-full font-bold shadow-glow hover:scale-105 transition-all disabled:opacity-50">
            <CloudArrowUpIcon className={`h-5 w-5 mr-3 ${isSyncing ? 'animate-bounce' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Database'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            {[
              { id: 'general', label: 'Site Settings', icon: ComputerDesktopIcon },
              { id: 'admissions', label: 'Admissions Data', icon: UserGroupIcon },
              { id: 'news', label: 'Latest News', icon: NewspaperIcon },
              { id: 'notices', label: 'Notice Board', icon: BellIcon },
              { id: 'weekly-dicta', label: 'Weekly Dicta', icon: BookOpenIcon },
              { id: 'requests', label: 'Request Info', icon: InboxArrowDownIcon },
              { id: 'faculty', label: 'Faculty Profiles', icon: UserCircleIcon },
              { id: 'academics', label: 'Curriculum', icon: AcademicCapIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-5 text-[13px] font-bold uppercase tracking-widest rounded-2xl transition-all border ${activeTab === tab.id
                    ? 'bg-pau-blue text-white shadow-xl border-pau-blue translate-x-2'
                    : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-100'
                  }`}
              >
                <tab.icon className={`h-5 w-5 mr-4 ${activeTab === tab.id ? 'text-pau-gold' : 'text-gray-300'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Area */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-soft border border-gray-100 min-h-[900px] overflow-hidden">

            {/* GENERAL */}
            {activeTab === 'general' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Global Site Settings" subtitle="Manage emergency alerts and homepage branding" />
                <div className={`p-8 rounded-2xl border-2 mb-12 transition-colors ${globalAlert.active ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-pau-darkBlue flex items-center"><MegaphoneIcon className="h-5 w-5 mr-2 text-pau-gold" /> Global Alert Banner</h3>
                    <input type="checkbox" checked={globalAlert.active} onChange={(e) => setGlobalAlert({ ...globalAlert, active: e.target.checked })} className="w-6 h-6" />
                  </div>
                  <input type="text" className="w-full p-4 border border-gray-200 rounded-lg mb-4" value={globalAlert.message} onChange={(e) => setGlobalAlert({ ...globalAlert, message: e.target.value })} />
                </div>
              </div>
            )}

            {/* ADMISSIONS */}
            {activeTab === 'admissions' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Admissions Management" subtitle="Update deadlines and tuition fees" />
                <div className="bg-pau-blue/5 p-8 rounded-3xl mb-8">
                  <label className="text-xs font-bold text-gray-400 uppercase">Tuition Cost</label>
                  <input type="text" className="w-full p-4 text-xl font-bold bg-white rounded-lg mt-2" value={admissions.tuitionCost} onChange={(e) => setAdmissions({ ...admissions, tuitionCost: e.target.value })} />
                </div>
              </div>
            )}

            {/* NEWS */}
            {activeTab === 'news' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Latest News" subtitle="Publish articles" btnLabel="Add News" onBtnClick={handleNewsCreate} />
                {home.latestNews.map((item, i) => (
                  <div key={item.id} className="mb-12 border-b pb-12">
                    <div className="flex justify-between mb-4">
                      <input type="text" className="text-xl font-bold border-none w-full" value={item.title} onChange={(e) => handleNewsUpdate(i, { ...item, title: e.target.value })} />
                      <button onClick={() => handleNewsDelete(i)}><TrashIcon className="h-5 w-5 text-red-300" /></button>
                    </div>
                    <RichTextInput initialValue={item.body} onChange={(html) => handleNewsUpdate(i, { ...item, body: html })} />
                  </div>
                ))}
              </div>
            )}

            {/* WEEKLY DICTA (NEW) */}
            {activeTab === 'weekly-dicta' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Weekly Dicta" subtitle="Manage weekly newsletters" btnLabel="Create Issue" onBtnClick={handleDictaCreate} />
                {weeklyDicta.map((item, i) => (
                  <div key={item.id} className="p-8 border border-gray-200 rounded-2xl mb-8 bg-gray-50 relative group">
                    <button onClick={() => handleDictaDelete(i)} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><TrashIcon className="h-5 w-5" /></button>
                    <div className="grid grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Issue Title</label>
                        <input type="text" className="w-full p-3 bg-white border rounded font-bold" value={item.title} onChange={(e) => handleDictaUpdate(i, { ...item, title: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Publish Date</label>
                        <DateInput value={item.publishDate} onChange={(date: string) => handleDictaUpdate(i, { ...item, publishDate: date })} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Intro Text</label>
                      <textarea className="w-full p-3 bg-white border rounded text-sm" rows={3} value={item.intro} onChange={(e) => handleDictaUpdate(i, { ...item, intro: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={item.isPublished} onChange={(e) => handleDictaUpdate(i, { ...item, isPublished: e.target.checked })} />
                      <span className={`text-sm font-bold ${item.isPublished ? 'text-green-600' : 'text-gray-400'}`}>{item.isPublished ? 'PUBLISHED' : 'DRAFT'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REQUEST INFO (NEW) */}
            {activeTab === 'requests' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Information Requests" subtitle="Inquiries from prospective students" />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                      <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Interest</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requestInfos.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50 bg-white">
                          <td className="px-6 py-4">{req.submittedAt?.split('T')[0]}</td>
                          <td className="px-6 py-4 font-bold">{req.fullName}</td>
                          <td className="px-6 py-4 text-pau-blue">{req.email}</td>
                          <td className="px-6 py-4">
                            <select
                              value={req.status}
                              onChange={async (e) => {
                                const newVal = e.target.value as any;
                                setRequestInfos(requestInfos.map(r => r.id === req.id ? { ...r, status: newVal } : r));
                                await adminService.updateRequestInfo(req.id, { status: newVal });
                                triggerToast();
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  req.status === 'contacted' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}
                            >
                              <option value="pending">PENDING</option>
                              <option value="reviewed">REVIEWED</option>
                              <option value="contacted">CONTACTED</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">{req.interest}</td>
                        </tr>
                      ))}
                      {requestInfos.length === 0 && (
                        <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No requests found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FACULTY (UPDATED) */}
            {activeTab === 'faculty' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Faculty Profiles" subtitle="Manage academic staff" btnLabel="Add Member" onBtnClick={handleFacultyCreate} />
                {faculty.facultyList.map((member, i) => (
                  <div key={i} className="mb-8 p-8 border rounded-2xl bg-gray-50 relative group">
                    <button onClick={() => handleFacultyDelete(i)} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><TrashIcon className="h-5 w-5" /></button>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="col-span-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Name</label>
                        <input type="text" className="w-full p-3 bg-white border rounded font-bold" value={member.name} onChange={(e) => handleFacultyUpdate(i, { ...member, name: e.target.value })} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Credentials</label>
                        <input type="text" className="w-full p-3 bg-white border rounded" placeholder="e.g. S.J.D." value={member.credential || ''} onChange={(e) => handleFacultyUpdate(i, { ...member, credential: e.target.value })} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Title</label>
                        <input type="text" className="w-full p-3 bg-white border rounded" value={member.title} onChange={(e) => handleFacultyUpdate(i, { ...member, title: e.target.value })} />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400">Email</label>
                        <input type="text" className="w-full p-3 bg-white border rounded" value={member.email || ''} onChange={(e) => handleFacultyUpdate(i, { ...member, email: e.target.value })} />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Education (One per line)</label>
                      <textarea className="w-full p-3 bg-white border rounded" rows={3} value={member.education?.join('\n') || ''} onChange={(e) => handleFacultyUpdate(i, { ...member, education: e.target.value.split('\n') })} placeholder="LL.M..." />
                    </div>

                    <div className="mb-6 border-t pt-6">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Full Background (HTML / Rich Text)</label>
                      <RichTextInput initialValue={member.background || member.bio} onChange={(html) => handleFacultyUpdate(i, { ...member, background: html })} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ACADEMICS (Curriculum) */}
            {activeTab === 'academics' && (
              <div className="p-10 animate-fade-in">
                <SectionHeader title="Curriculum Management" subtitle="Edit degree programs" />
                {academics.programs.map((prog, i) => (
                  <div key={i} className="bg-white p-6 border rounded-xl mb-4">
                    <input type="text" className="font-bold text-lg w-full mb-2" value={prog.name} onChange={(e) => {
                      const newProgs = [...academics.programs];
                      newProgs[i] = { ...prog, name: e.target.value };
                      setAcademics({ ...academics, programs: newProgs });
                    }} />
                    <textarea className="w-full text-sm text-gray-600 border-none p-0" rows={2} value={prog.description} onChange={(e) => {
                      const newProgs = [...academics.programs];
                      newProgs[i] = { ...prog, description: e.target.value };
                      setAcademics({ ...academics, programs: newProgs });
                    }} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up">
          <div className="flex items-center bg-pau-darkBlue text-white px-10 py-6 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-md">
            <div className="bg-pau-gold rounded-full p-2 mr-5 shadow-inner"><CheckCircleIcon className="h-6 w-6 text-pau-darkBlue" /></div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg">Saved</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Database Updated</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
