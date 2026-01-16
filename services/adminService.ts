import { supabase } from './supabase';
import { NewsItem, FacultyMember, HomeContent, AdmissionsContent } from '../types';

// Example Service for News
export const fetchNews = async (): Promise<NewsItem[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching news:', error);
        return [];
    }

    return data || [];
};

export const createNews = async (news: Omit<NewsItem, 'id'>): Promise<NewsItem | null> => {
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase
        .from('news')
        .insert([news])
        .select()
        .single();

    if (error) {
        console.error('Error creating news:', error);
        throw error;
    }

    return data;
};

// Add other services similarly...
