import { supabase } from './supabase';
import {
    NewsItem,
    FacultyMember,
    HomeContent,
    AdmissionsContent,
    GlobalAlert,
    CentersContent,
    CalendarContent,
    CareersContent,
    ConsumerInfoContent,
    FAQItem,
    WeeklyDictaItem,
    RequestInfoItem
} from '../types';

// Helper to handle Supabase errors
const handleServiceError = (error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
    // We can choose to throw or return null depending on UX strategy.
    // Throwing allows UI to catch and show toast.
    throw error;
};

// --- 1. Global Settings ---
export const fetchGlobalSettings = async (): Promise<Record<string, any>> => {
    if (!supabase) return {};
    const { data, error } = await supabase.from('global_settings').select('key, value');
    if (error) handleServiceError(error, 'fetchGlobalSettings');

    const settings: Record<string, any> = {};
    data?.forEach(item => {
        settings[item.key] = item.value;
    });
    return settings;
};

export const updateGlobalSetting = async (key: string, value: any) => {
    if (!supabase) return;
    const { error } = await supabase
        .from('global_settings')
        .upsert({ key, value }, { onConflict: 'key' });
    if (error) handleServiceError(error, 'updateGlobalSetting');
};

// --- 2. News ---
export const fetchNews = async (): Promise<NewsItem[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });
    if (error) handleServiceError(error, 'fetchNews');
    return data || [];
};

export const createNews = async (news: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('news').insert([news]).select().single();
    if (error) handleServiceError(error, 'createNews');
    return data;
};

export const updateNews = async (id: string, updates: Partial<NewsItem>) => {
    if (!supabase) return;
    const { error } = await supabase.from('news').update(updates).eq('id', id);
    if (error) handleServiceError(error, 'updateNews');
};

export const deleteNews = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) handleServiceError(error, 'deleteNews');
};

// --- 3. Notices ---
export const fetchNotices = async (): Promise<NewsItem[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('date', { ascending: false });
    if (error) handleServiceError(error, 'fetchNotices');
    return data || [];
};

export const createNotice = async (notice: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('notices').insert([notice]).select().single();
    if (error) handleServiceError(error, 'createNotice');
    return data;
};

export const updateNotice = async (id: string, updates: Partial<NewsItem>) => {
    if (!supabase) return;
    const { error } = await supabase.from('notices').update(updates).eq('id', id);
    if (error) handleServiceError(error, 'updateNotice');
};

export const deleteNotice = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) handleServiceError(error, 'deleteNotice');
};

// --- 4. Faculty ---
export interface FacultyMemberDB extends FacultyMember {
    id?: string;
    is_active?: boolean;
    sort_order?: number;
}

export const fetchFaculty = async (): Promise<FacultyMemberDB[]> => {
    if (!supabase) return [];

    const data = await supabase
        .from('faculty')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });

    if (data.error) handleServiceError(data.error, 'fetchFaculty');

    return (data.data || []).map((f: any) => ({
        ...f,
        isActive: f.is_active,
        sortOrder: f.sort_order,
        photoUrl: f.photo_url
    }));
};

export const createFaculty = async (faculty: FacultyMember): Promise<FacultyMember> => {
    if (!supabase) throw new Error('Supabase not configured');

    const dbPayload = {
        ...faculty,
        is_active: faculty.isActive,
        sort_order: faculty.sortOrder,
        photo_url: faculty.photoUrl
    };
    // remove camelCase keys if strict, but supabase usually ignores unknown cols if not defined, 
    // or better to be clean:
    delete (dbPayload as any).isActive;
    delete (dbPayload as any).sortOrder;
    delete (dbPayload as any).photoUrl;

    const { data, error } = await supabase.from('faculty').insert([dbPayload]).select().single();
    if (error) handleServiceError(error, 'createFaculty');

    return {
        ...data,
        isActive: data.is_active,
        sortOrder: data.sort_order,
        photoUrl: data.photo_url
    };
};

export const updateFaculty = async (id: string, updates: Partial<FacultyMember>) => {
    if (!supabase) return;

    const dbPayload: any = { ...updates };
    if (updates.isActive !== undefined) { dbPayload.is_active = updates.isActive; delete dbPayload.isActive; }
    if (updates.sortOrder !== undefined) { dbPayload.sort_order = updates.sortOrder; delete dbPayload.sortOrder; }
    if (updates.photoUrl !== undefined) { dbPayload.photo_url = updates.photoUrl; delete dbPayload.photoUrl; }

    const { error } = await supabase.from('faculty').update(dbPayload).eq('id', id);
    if (error) handleServiceError(error, 'updateFaculty');
};

export const deleteFaculty = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('faculty').delete().eq('id', id);
    if (error) handleServiceError(error, 'deleteFaculty');
};

// --- 5. Weekly Dicta ---
export const fetchWeeklyDicta = async (): Promise<WeeklyDictaItem[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('weekly_dicta')
        .select('*')
        .order('publish_date', { ascending: false });
    if (error) handleServiceError(error, 'fetchWeeklyDicta');

    return (data || []).map((item: any) => ({
        ...item,
        publishDate: item.publish_date,
        isPublished: item.is_published
    }));
};

export const createWeeklyDicta = async (item: Omit<WeeklyDictaItem, 'id'>): Promise<WeeklyDictaItem> => {
    if (!supabase) throw new Error('Supabase not configured');

    const dbPayload = {
        ...item,
        publish_date: item.publishDate,
        is_published: item.isPublished
    };
    delete (dbPayload as any).publishDate;
    delete (dbPayload as any).isPublished;

    const { data, error } = await supabase.from('weekly_dicta').insert([dbPayload]).select().single();
    if (error) handleServiceError(error, 'createWeeklyDicta');

    return {
        ...data,
        publishDate: data.publish_date,
        isPublished: data.is_published
    };
};

export const updateWeeklyDicta = async (id: string, updates: Partial<WeeklyDictaItem>) => {
    if (!supabase) return;

    const dbPayload: any = { ...updates };
    if (updates.publishDate !== undefined) { dbPayload.publish_date = updates.publishDate; delete dbPayload.publishDate; }
    if (updates.isPublished !== undefined) { dbPayload.is_published = updates.isPublished; delete dbPayload.isPublished; }

    const { error } = await supabase.from('weekly_dicta').update(dbPayload).eq('id', id);
    if (error) handleServiceError(error, 'updateWeeklyDicta');
};

export const deleteWeeklyDicta = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('weekly_dicta').delete().eq('id', id);
    if (error) handleServiceError(error, 'deleteWeeklyDicta');
};

// --- 6. Request Info ---
export const fetchRequestInfos = async (): Promise<RequestInfoItem[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('request_info')
        .select('*')
        .order('submitted_at', { ascending: false });
    if (error) handleServiceError(error, 'fetchRequestInfos');

    return (data || []).map((item: any) => ({
        ...item,
        fullName: item.full_name,
        adminNotes: item.admin_notes,
        submittedAt: item.submitted_at,
        reviewedAt: item.reviewed_at
    }));
};

export const updateRequestInfo = async (id: string, updates: Partial<RequestInfoItem>) => {
    if (!supabase) return;

    const dbPayload: any = { ...updates };
    if (updates.fullName !== undefined) { dbPayload.full_name = updates.fullName; delete dbPayload.fullName; }
    if (updates.adminNotes !== undefined) { dbPayload.admin_notes = updates.adminNotes; delete dbPayload.adminNotes; }
    if (updates.submittedAt !== undefined) { dbPayload.submitted_at = updates.submittedAt; delete dbPayload.submittedAt; }
    if (updates.reviewedAt !== undefined) { dbPayload.reviewed_at = updates.reviewedAt; delete dbPayload.reviewedAt; }

    const { error } = await supabase.from('request_info').update(dbPayload).eq('id', id);
    if (error) handleServiceError(error, 'updateRequestInfo');
};

export const submitRequestInfo = async (info: Omit<RequestInfoItem, 'id' | 'status' | 'submittedAt' | 'reviewedAt'>) => {
    if (!supabase) throw new Error('Supabase not configured');

    const dbPayload = {
        ...info,
        full_name: info.fullName,
        // adminNotes not expected on submit
    };
    delete (dbPayload as any).fullName;
    delete (dbPayload as any).adminNotes;

    const { error } = await supabase.from('request_info').insert([{ ...dbPayload, status: 'pending' }]);
    if (error) handleServiceError(error, 'submitRequestInfo');
};

// --- 7. Home Content ---
export const fetchHomeContent = async (): Promise<HomeContent | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase.from('home_content').select('*');
    if (error) handleServiceError(error, 'fetchHomeContent');
    if (!data || data.length === 0) return null;

    const homeContent: any = {};
    data.forEach(row => {
        if (row.section === 'main') {
            Object.assign(homeContent, row.content);
        } else {
            homeContent[row.section] = row.content; // e.g., 'features', 'stats'
        }
    });

    return homeContent as HomeContent;
    // Warning: This assumes the JSON in DB perfectly matches parts of HomeContent
};

export const updateHomeContentSection = async (section: string, content: any) => {
    if (!supabase) return;
    const { error } = await supabase
        .from('home_content')
        .upsert({ section, content }, { onConflict: 'section' });
    if (error) handleServiceError(error, 'updateHomeContentSection');
};

// --- 8. Admissions ---
export const fetchAdmissionsContent = async (): Promise<AdmissionsContent | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase.from('admissions').select('*').single();

    // Ignore "row not found" error, treat as null
    if (error && error.code !== 'PGRST116') handleServiceError(error, 'fetchAdmissionsContent');
    if (!data) return null;

    return {
        title: "Admissions",
        intro: "Join PAU",
        deadlinesTitle: "Application Deadlines",
        requirementsTitle: "Admission Requirements",
        tuitionTitle: "Tuition & Fees",
        faqTitle: "Frequently Asked Questions",
        ...data
    } as AdmissionsContent;
};

export const updateAdmissionsContent = async (content: Partial<AdmissionsContent>) => {
    // Map Frontend types to DB columns if needed, assuming direct mapping for now
    // except for properties that are not in the table
    const dbPayload = {
        tuition_cost: content.tuitionCost,
        tuition_info: content.tuitionInfo,
        deadlines: content.deadlines,
        requirements: content.requirements,
        faqs: content.faqs
    };

    if (!supabase) return;
    // Simple logic: delete all and insert 1, or just update the one that exists.
    const { data } = await supabase.from('admissions').select('id').single();
    if (data) {
        const { error } = await supabase.from('admissions').update(dbPayload).eq('id', data.id);
        if (error) handleServiceError(error, 'updateAdmissionsContent');
    } else {
        const { error } = await supabase.from('admissions').insert([dbPayload]);
        if (error) handleServiceError(error, 'createAdmissionsContent');
    }
};

// --- 9. Calendar Events ---
export interface CalendarEventDB {
    id: string;
    date: string;
    event: string;
    type: string;
    cohort: string;
}

export const fetchCalendarEvents = async (): Promise<CalendarEventDB[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('date', { ascending: true });
    if (error) handleServiceError(error, 'fetchCalendarEvents');
    return data || [];
};

export const createCalendarEvent = async (evt: Omit<CalendarEventDB, 'id'>): Promise<CalendarEventDB> => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('calendar_events').insert([evt]).select().single();
    if (error) handleServiceError(error, 'createCalendarEvent');
    return data;
};

export const updateCalendarEvent = async (id: string, updates: Partial<CalendarEventDB>) => {
    if (!supabase) return;
    const { error } = await supabase.from('calendar_events').update(updates).eq('id', id);
    if (error) handleServiceError(error, 'updateCalendarEvent');
};

export const deleteCalendarEvent = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('calendar_events').delete().eq('id', id);
    if (error) handleServiceError(error, 'deleteCalendarEvent');
};

// --- 10. Careers ---
export const fetchCareersContent = async (): Promise<CareersContent | null> => {
    if (!supabase) return null;
    const { data, error } = await supabase.from('careers').select('*').single();
    if (error && error.code !== 'PGRST116') handleServiceError(error, 'fetchCareersContent');
    if (!data) return null;

    return {
        title: "Career Services",
        intro: "Prepare for your future",
        stats: data.stats || [],
        services: data.services || []
    } as CareersContent;
};

export const updateCareersContent = async (content: Partial<CareersContent>) => {
    const dbPayload = {
        stats: content.stats,
        services: content.services
    };
    if (!supabase) return;

    const { data } = await supabase.from('careers').select('id').single();
    if (data) {
        const { error } = await supabase.from('careers').update(dbPayload).eq('id', data.id);
        if (error) handleServiceError(error, 'updateCareersContent');
    } else {
        const { error } = await supabase.from('careers').insert([dbPayload]);
        if (error) handleServiceError(error, 'createCareersContent');
    }
};

// --- 11. Consumer Info ---
export interface ConsumerInfoSectionDB {
    id: string; // The DB UUID
    section_id: string; // The logical ID (e.g. 'bar-passage')
    title: string;
    subtitle?: string;
    content?: string;
    table_data?: { label: string; value: string }[];
    has_download?: boolean;
    sort_order?: number;
}

export const fetchConsumerInfo = async (): Promise<ConsumerInfoSectionDB[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('consumer_info')
        .select('*')
        .order('sort_order', { ascending: true });
    if (error) handleServiceError(error, 'fetchConsumerInfo');
    return data || [];
};

export const updateConsumerInfoSection = async (sectionId: string, updates: Partial<ConsumerInfoSectionDB>) => {
    if (!supabase) return;
    // We update by section_id (logical ID) or actual ID. Using section_id is easier for fixed sections.
    const { error } = await supabase
        .from('consumer_info')
        .update(updates)
        .eq('section_id', sectionId);
    if (error) handleServiceError(error, 'updateConsumerInfoSection');
};
