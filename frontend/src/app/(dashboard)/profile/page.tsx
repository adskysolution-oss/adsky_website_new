'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import axios from 'axios';
import {
  User, Camera, Save, CheckCircle, Loader2, Phone,
  MapPin, Languages, Briefcase, Calendar, Shield,
  Clock, Edit3, Star, Award
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const API = 'http://localhost:5000/api';

function ProfileContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'picture' ? 'picture' : 'info');
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', gender: '', dob: '', languages: '',
    skills: '', locationArea: '', availabilityType: '', shift: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get(`${API}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setForm({
          name: res.data.name || '',
          phone: res.data.phone || '',
          gender: res.data.gender || '',
          dob: res.data.dob || '',
          languages: (res.data.languages || []).join(', '),
          skills: (res.data.skills || []).join(', '),
          locationArea: res.data.locationArea || '',
          availabilityType: res.data.availabilityType || '',
          shift: res.data.shift || '',
        });
      } catch { setError('Failed to load profile'); }
      finally { setIsLoading(false); }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true); setError(''); setSuccess('');
    const token = localStorage.getItem('token');
    try {
      const payload = {
        ...form,
        languages: form.languages.split(',').map(l => l.trim()).filter(Boolean),
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      };
      const res = await axios.put(`${API}/auth/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    } finally { setIsSaving(false); }
  };

  const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadLoading(true); setError(''); setSuccess('');
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      const res = await axios.post(`${API}/auth/profile/picture`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setProfile((prev: any) => ({ ...prev, profileImage: res.data.profileImage }));
      setSuccess('Profile picture updated!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally { setUploadLoading(false); }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-64">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  const progress = profile?.progressPercentage || 0;
  const skills = profile?.skills || [];
  const languages = profile?.languages || [];

  const inputCls = 'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm';
  const labelCls = 'block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage your professional identity and preferences</p>
      </div>

      {/* Alerts */}
      {success && (
        <div className="mb-5 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle size={16} /> {success}
        </div>
      )}
      {error && (
        <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Profile Card */}
        <div className="lg:col-span-1 space-y-5">
          {/* Avatar Card */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            {/* Gradient Banner */}
            <div className="h-20 bg-gradient-to-r from-primary via-secondary to-purple-500" />

            <div className="px-5 pb-5 -mt-10">
              <div className="relative w-20 h-20 mb-3">
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-dark-surface shadow-md" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-4 border-white dark:border-dark-surface shadow-md">
                    <span className="text-2xl font-black text-white">
                      {profile?.name?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors"
                >
                  <Camera size={12} className="text-white" />
                </button>
              </div>

              <h2 className="font-black text-gray-900 dark:text-white text-lg leading-tight">{profile?.name || 'Your Name'}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{profile?.email}</p>

              {profile?.role && (
                <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {profile.role}
                </span>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePictureUpload} className="hidden" />
            </div>

            {uploadLoading && (
              <div className="px-5 pb-4 flex items-center gap-2 text-sm text-gray-500">
                <Loader2 size={14} className="animate-spin" /> Uploading...
              </div>
            )}
          </div>

          {/* Profile Completion */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-yellow-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">Profile Strength</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Completeness</span>
              <span className={`text-sm font-black ${progress >= 80 ? 'text-green-500' : progress >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>{progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${progress >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : progress >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {progress < 100 ? 'Complete your profile to get more job matches' : 'Your profile is complete! 🎉'}
            </p>
          </div>

          {/* Info Chips */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5 space-y-3">
            {profile?.phone && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center"><Phone size={14} className="text-blue-500" /></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.phone}</span>
              </div>
            )}
            {profile?.locationArea && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center"><MapPin size={14} className="text-green-500" /></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.locationArea}</span>
              </div>
            )}
            {profile?.availabilityType && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center"><Briefcase size={14} className="text-purple-500" /></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.availabilityType}</span>
              </div>
            )}
            {profile?.shift && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center"><Clock size={14} className="text-orange-500" /></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.shift} Shift</span>
              </div>
            )}
            {profile?.gender && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center"><Shield size={14} className="text-pink-500" /></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.gender}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Star size={12} className="text-yellow-500" /> Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5"><Languages size={12} /> Languages</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((l: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-lg">{l}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Personal Information</h3>
                <p className="text-xs text-gray-400 mt-0.5">Update your profile details below</p>
              </div>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 transition-colors">
                  <Edit3 size={14} /> Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="px-6 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className={labelCls}>Full Name</label>
                  {isEditing ? (
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" className={inputCls} />
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.name || <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className={labelCls}>Phone Number</label>
                  {isEditing ? (
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" className={inputCls} />
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.phone || <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* DOB */}
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  {isEditing ? (
                    <input type="date" value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} className={inputCls} />
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.dob ? new Date(profile.dob).toLocaleDateString() : <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className={labelCls}>Location / Area</label>
                  {isEditing ? (
                    <input type="text" value={form.locationArea} onChange={e => setForm(f => ({ ...f, locationArea: e.target.value }))} placeholder="e.g. Pune, MH" className={inputCls} />
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.locationArea || <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className={labelCls}>Gender</label>
                  {isEditing ? (
                    <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} className={inputCls}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.gender || <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <label className={labelCls}>Availability</label>
                  {isEditing ? (
                    <select value={form.availabilityType} onChange={e => setForm(f => ({ ...f, availabilityType: e.target.value }))} className={inputCls}>
                      <option value="">Select</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.availabilityType || <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* Shift */}
                <div>
                  <label className={labelCls}>Preferred Shift</label>
                  {isEditing ? (
                    <select value={form.shift} onChange={e => setForm(f => ({ ...f, shift: e.target.value }))} className={inputCls}>
                      <option value="">Select shift</option>
                      <option value="Day">Day</option>
                      <option value="Night">Night</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">{profile?.shift ? `${profile.shift} Shift` : <span className="text-gray-400 italic">Not set</span>}</p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <label className={labelCls}>Skills (comma-separated)</label>
                  {isEditing ? (
                    <input type="text" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Delivery, Data Entry" className={inputCls} />
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">
                      {skills.length > 0 ? skills.join(', ') : <span className="text-gray-400 italic">Not set</span>}
                    </p>
                  )}
                </div>

                {/* Languages */}
                <div>
                  <label className={labelCls}>Languages (comma-separated)</label>
                  {isEditing ? (
                    <input type="text" value={form.languages} onChange={e => setForm(f => ({ ...f, languages: e.target.value }))} placeholder="e.g. Hindi, English" className={inputCls} />
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 py-2.5">
                      {languages.length > 0 ? languages.join(', ') : <span className="text-gray-400 italic">Not set</span>}
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-800 mt-6">
                  <button type="button" onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl disabled:opacity-50 transition-all shadow-sm">
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
