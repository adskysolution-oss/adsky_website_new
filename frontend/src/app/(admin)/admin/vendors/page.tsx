'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { Search, Settings, ShieldCheck, Mail, Building, Globe } from 'lucide-react';

interface Vendor {
  _id: string;
  name: string;
  email?: string;
  companyName?: string;
  website?: string;
  status?: 'Active' | 'Inactive' | 'Pending' | string;
  vendorType?: string;
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    void fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await apiClient.get<Vendor[]>('/admin/vendors');
      setVendors(res.data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const query = search.toLowerCase();

  const filteredVendors = vendors.filter((vendor) => {
    const name = vendor.name?.toLowerCase() ?? '';
    const email = vendor.email?.toLowerCase() ?? '';
    const companyName = vendor.companyName?.toLowerCase() ?? '';
    const website = vendor.website?.toLowerCase() ?? '';

    return (
      name.includes(query) ||
      email.includes(query) ||
      companyName.includes(query) ||
      website.includes(query)
    );
  });

  return (
    <div className="space-y-6">
      {/* your existing UI here */}
    </div>
  );
}
