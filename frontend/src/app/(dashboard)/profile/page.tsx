'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { User, Camera, Save, CheckCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const API = 'http://localhost:5000/api';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'picture' ? 'picture' : 'info');
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Manage your personal information and account settings</p>

      {/* Profile completion bar */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Completeness</span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['info', 'picture'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'}`}
          >
            {tab === 'info' ? 'Personal Info' : 'Profile Picture'}
          </button>
        ))}
      </div>

      {success && <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2"><CheckCircle size={16}/> {success}</div>}
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}

      {activeTab === 'info' && (
        <form onSubmit={handleSave} className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
              { label: 'Date of Birth', key: 'dob', type: 'date', placeholder: '' },
              { label: 'Location / Area', key: 'locationArea', type: 'text', placeholder: 'e.g. Pune, MH' },
              { label: 'Skills (comma-separated)', key: 'skills', type: 'text', placeholder: 'e.g. Delivery, Data Entry' },
              { label: 'Languages (comma-separated)', key: 'languages', type: 'text', placeholder: 'e.g. Hindi, English' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
                <input type={field.type} value={(form as any)[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Gender</label>
              <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Availability</label>
              <select value={form.availabilityType} onChange={e => setForm(f => ({ ...f, availabilityType: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Preferred Shift</label>
              <select value={form.shift} onChange={e => setForm(f => ({ ...f, shift: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#151c2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              >
                <option value="">Select shift</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'picture' && (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6">
            {profile?.profileImage ? (
              <img src={profile.profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-gray-200 dark:border-gray-700">
                <User size={48} className="text-gray-400" />
              </div>
            )}
            <button onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors"
            >
              <Camera size={16} className="text-white" />
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 text-center">Click the camera icon to upload. <br/>Max 5MB — JPG, PNG, or WebP</p>

          <button onClick={() => fileInputRef.current?.click()} disabled={uploadLoading}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg disabled:opacity-50 transition-all"
          >
            {uploadLoading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
            {uploadLoading ? 'Uploading...' : 'Upload New Picture'}
          </button>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePictureUpload} className="hidden" />
        </div>
      )}
    </div>
  );
}
