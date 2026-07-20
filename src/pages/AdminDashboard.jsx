import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  LogOut, LayoutDashboard, Mail, Calendar, CheckCircle,
  XCircle, Clock, Users, MessageSquare, ChevronDown,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-800" },
  { value: "approved", label: "Approved", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  { value: "completed", label: "Completed", color: "bg-blue-100 text-blue-800" },
];

const FREQUENCY_LABELS = {
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  seasonal: "Seasonal",
};

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout, authHeaders } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAll();
    }
  }, [isAuthenticated]);

  const fetchAll = async () => {
    setLoadingData(true);
    try {
      const [bookingsRes, contactsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/bookings`, { headers: authHeaders }),
        fetch(`${API_URL}/api/admin/contacts`, { headers: authHeaders }),
        fetch(`${API_URL}/api/admin/dashboard`, { headers: authHeaders }),
      ]);
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (contactsRes.ok) setContacts(await contactsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoadingData(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? updated : b)));
      toast({
        title: "Status Updated",
        description: `Booking ${updated.reference} is now ${newStatus}.`,
      });
      fetchAll();
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-blade">
      {/* Header */}
      <header className="bg-obsidian border-b border-linen/10 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl font-semibold text-linen tracking-tight">
              AVENESS
            </a>
            <span className="font-mono-coord text-gold text-[10px] tracking-[0.3em]">
              ADMIN
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-linen/60 hover:text-linen text-sm transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard icon={<Calendar size={18} />} label="Total Bookings" value={stats.total_bookings} />
            <StatCard icon={<Clock size={18} />} label="Pending" value={stats.pending} />
            <StatCard icon={<CheckCircle size={18} />} label="Approved" value={stats.approved} />
            <StatCard icon={<LayoutDashboard size={18} />} label="Completed" value={stats.completed} />
            <StatCard icon={<MessageSquare size={18} />} label="Messages" value={stats.total_contacts} />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 border-b border-linen/10 mb-6">
          {["bookings", "contacts"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium tracking-wide transition-colors ${
                tab === t
                  ? "text-gold border-b-2 border-gold"
                  : "text-linen/50 hover:text-linen"
              }`}
            >
              {t === "bookings" ? "Service Requests" : "Messages"}
            </button>
          ))}
        </div>

        {/* Content */}
        {loadingData ? (
          <div className="text-center py-20 text-linen/40">Loading...</div>
        ) : tab === "bookings" ? (
          <BookingsTable bookings={bookings} onUpdateStatus={updateStatus} />
        ) : (
          <ContactsTable contacts={contacts} />
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-obsidian/50 border border-linen/10 p-5">
      <div className="flex items-center gap-2 text-gold mb-2">{icon}</div>
      <p className="font-display text-2xl text-linen font-light">{value}</p>
      <p className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] mt-1">{label.toUpperCase()}</p>
    </div>
  );
}

function BookingsTable({ bookings, onUpdateStatus }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  if (bookings.length === 0) {
    return <p className="text-linen/40 text-center py-10">No service requests yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-linen/10">
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">REF</th>
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">NAME</th>
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">EMAIL</th>
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">ADDRESS</th>
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">FREQUENCY</th>
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">STATUS</th>
            <th className="font-mono-coord text-linen/40 text-[10px] tracking-[0.2em] py-3 px-4">DATE</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-linen/5 hover:bg-linen/5 transition-colors">
              <td className="py-4 px-4 font-mono-coord text-gold text-xs">{b.reference}</td>
              <td className="py-4 px-4 text-linen text-sm">{b.name}</td>
              <td className="py-4 px-4 text-linen/70 text-sm">{b.email}</td>
              <td className="py-4 px-4 text-linen/70 text-sm max-w-[200px] truncate">{b.address}</td>
              <td className="py-4 px-4 text-linen/70 text-sm">{FREQUENCY_LABELS[b.frequency] || b.frequency}</td>
              <td className="py-4 px-4 relative">
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === b.id ? null : b.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium ${
                      STATUS_OPTIONS.find((s) => s.value === b.status)?.color || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    <ChevronDown size={12} />
                  </button>
                  {openDropdown === b.id && (
                    <div className="absolute top-full left-0 mt-1 bg-obsidian border border-linen/20 shadow-lg z-10 min-w-[140px]">
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => {
                            onUpdateStatus(b.id, s.value);
                            setOpenDropdown(null);
                          }}
                          className={`block w-full text-left px-4 py-2.5 text-sm text-linen hover:bg-linen/10 transition-colors ${
                            b.status === s.value ? "font-medium" : ""
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-linen/50 text-xs font-mono-coord">
                {new Date(b.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactsTable({ contacts }) {
  if (contacts.length === 0) {
    return <p className="text-linen/40 text-center py-10">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {contacts.map((c) => (
        <div key={c.id} className="bg-obsidian/50 border border-linen/10 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-linen font-medium">{c.name}</p>
              <p className="text-linen/50 text-sm">{c.email}</p>
            </div>
            <span className="font-mono-coord text-linen/30 text-xs">
              {new Date(c.created_at).toLocaleString()}
            </span>
          </div>
          {c.subject && (
            <p className="font-mono-coord text-gold text-xs tracking-wide mb-2">
              {c.subject.toUpperCase()}
            </p>
          )}
          <p className="text-linen/70 text-sm leading-relaxed">{c.message}</p>
        </div>
      ))}
    </div>
  );
}
