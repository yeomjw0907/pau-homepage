import React, { useState } from 'react';
import { PageHeader } from './common/PageHeader';
import { SectionWrapper } from './common/SectionWrapper';
import { InboxArrowDownIcon, PaperAirplaneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import * as adminService from '../services/adminService';

export const RequestInfo: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await adminService.submitRequestInfo(formData);
            setStatus('success');
            setFormData({ fullName: '', email: '', phone: '', interest: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <>
            <PageHeader
                title={"Request\nInformation"}
                subtitle="Learn more about our programs and community."
                icon={InboxArrowDownIcon}
            />

            <SectionWrapper>
                <div className="max-w-2xl mx-auto">
                    {status === 'success' ? (
                        <div className="bg-green-50 rounded-3xl p-12 text-center border-2 border-green-100 shadow-lg animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircleIcon className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-green-800 mb-4">Inquiry Received!</h3>
                            <p className="text-green-700 text-lg mb-8">
                                Thank you for your interest in PAU. Our admissions team will review your request and contact you shortly.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors"
                            >
                                Send Another Request
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl font-serif font-bold text-pau-darkBlue">Get in Touch</h2>
                                <p className="text-gray-500 mt-2">Fill out the form below and we'll get back to you.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pau-blue focus:bg-white transition-all"
                                        placeholder="Jane Doe"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pau-blue focus:bg-white transition-all"
                                            placeholder="jane@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pau-blue focus:bg-white transition-all"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Area of Interest</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pau-blue focus:bg-white transition-all"
                                        value={formData.interest}
                                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                    >
                                        <option value="">Select an option...</option>
                                        <option value="JD Program">Juris Doctor (JD) Program</option>
                                        <option value="Transfer">Transfer Admission</option>
                                        <option value="Tuition">Tuition & Financials</option>
                                        <option value="General">General Inquiry</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message / Questions</label>
                                    <textarea
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pau-blue focus:bg-white transition-all h-32"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-pau-gold text-pau-darkBlue font-bold py-5 rounded-xl text-lg hover:bg-yellow-400 transform hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? 'Sending...' : (
                                        <>
                                            Submit Inquiry <PaperAirplaneIcon className="h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </SectionWrapper>
        </>
    );
};
