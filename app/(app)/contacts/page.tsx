"use client";

import { useState, useEffect } from "react";
import { Search, User, ChevronLeft, ChevronRight, Users, Filter, Download, Plus, Mail, Phone, Trash2, Edit2, DownloadCloud, X, Home, Briefcase, MoreVertical } from "lucide-react";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  jobTitle: string | null;
  message: string | null;
  source: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<Contact>>({});

  const handleDeleteContact = async () => {
    if (!selectedContact) return;
    try {
      const res = await fetch(`/api/contacts/${selectedContact.id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(contacts.filter(c => c.id !== selectedContact.id));
        setSelectedContact(null);
        setIsDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    try {
      const res = await fetch(`/api/contacts/${selectedContact.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      if (res.ok) {
        const { contact } = await res.json();
        setContacts(contacts.map(c => c.id === contact.id ? contact : c));
        setSelectedContact(contact);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        if (data.contacts) {
          setContacts(data.contacts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredContacts = contacts.filter(
    (c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  const exportCSV = () => {
    if (contacts.length === 0) return;
    const headers = ["Prénom", "Nom", "Email", "Téléphone", "Entreprise", "Message", "Date"];
    const rows = contacts.map(c => [
      c.firstName,
      c.lastName,
      c.email || "",
      c.phone || "",
      c.company || "",
      c.message || "",
      new Date(c.createdAt).toLocaleDateString()
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadVCard = () => {
    if (!selectedContact) return;
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${selectedContact.firstName} ${selectedContact.lastName}
N:${selectedContact.lastName};${selectedContact.firstName};;;
EMAIL;TYPE=INTERNET:${selectedContact.email || ""}
TEL;TYPE=CELL:${selectedContact.phone || ""}
ORG:${selectedContact.company || ""}
TITLE:${selectedContact.jobTitle || ""}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedContact.firstName}_${selectedContact.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 h-full min-h-[calc(100vh-theme(spacing.16))] flex flex-col">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Contacts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Gérez votre réseau et exportez vos données.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-900/30 px-5 py-2.5 text-sm font-bold text-violet-700 dark:text-violet-400 transition-transform hover:scale-105 active:scale-95">
            <Download className="h-4 w-4" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Main Grid: Left List (flex-1), Right Detail Panel (w-80 or w-96) */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[600px]">
        
        {/* Left Area - Contact List */}
        <div className="flex-1 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col overflow-hidden transition-colors">
          {/* Toolbar */}
          <div className="border-b border-gray-100 dark:border-gray-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher des contacts..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Filter className="h-4 w-4" />
              Filtres
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-[10px]">0</span>
            </button>
          </div>

          {/* List */}
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  onClick={() => setSelectedContact(contact)}
                  className={`flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${selectedContact?.id === contact.id ? 'bg-violet-50 dark:bg-violet-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-700 dark:text-violet-400 font-bold">
                      {contact.firstName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{contact.firstName} {contact.lastName}</h4>
                      {contact.company && <p className="text-xs text-gray-500 dark:text-gray-400">{contact.company}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span className="hidden sm:inline bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{contact.source}</span>
                    {new Date(contact.createdAt).toLocaleDateString("fr-FR", { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/30 dark:bg-gray-950/30">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-900/10 border-8 border-white dark:border-gray-900 shadow-sm relative">
                <User className="h-8 w-8 text-violet-400 dark:text-violet-500" />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1.5 shadow-md">
                   <Search className="h-3 w-3 text-yellow-950" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucun contact trouvé</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-sm">
                Commencez à partager votre profil pour récolter de nouveaux contacts ou ajoutez-en manuellement.
              </p>
            </div>
          )}

          {/* Pagination Footer */}
          <div className="border-t border-gray-100 dark:border-gray-800 p-4 flex justify-between items-center bg-white dark:bg-gray-900">
            <span className="text-xs font-bold text-gray-400">{filteredContacts.length} contact(s)</span>
            <div className="flex items-center gap-1.5">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 opacity-50 cursor-not-allowed transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white text-sm font-bold shadow-md">
                1
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 opacity-50 cursor-not-allowed transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Area - Detail Panel */}
        {selectedContact ? (
          <div className="hidden lg:flex w-[400px] shrink-0 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex-col p-6 overflow-y-auto no-scrollbar">
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-700 dark:text-violet-400 text-xl font-bold">
                  {selectedContact.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedContact.firstName} {selectedContact.lastName}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(selectedContact.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })} {new Date(selectedContact.createdAt).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditData(selectedContact);
                    setIsEditModalOpen(true);
                  }}
                  className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors border border-gray-100 dark:border-gray-700"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors border border-gray-100 dark:border-gray-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setSelectedContact(null)} className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors border border-gray-100 dark:border-gray-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              {selectedContact.phone ? (
                <button onClick={() => window.location.href = `tel:${selectedContact.phone}`} className="flex-1 py-2 flex items-center justify-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
                  <Phone className="w-4 h-4 text-gray-400" /> Appeler
                </button>
              ) : (
                <button disabled className="flex-1 py-2 flex items-center justify-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-400 dark:text-gray-500 opacity-50 cursor-not-allowed transition-colors">
                  <Phone className="w-4 h-4 text-gray-400" /> Appeler
                </button>
              )}
              <button onClick={() => selectedContact.email && (window.location.href = `mailto:${selectedContact.email}`)} className="flex-1 py-2 flex items-center justify-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
                <Mail className="w-4 h-4 text-gray-400" /> Courriel
              </button>
              <button onClick={downloadVCard} className="flex-1 py-2 flex items-center justify-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
                <DownloadCloud className="w-4 h-4 text-gray-400" /> vCard
              </button>
            </div>

            <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 py-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedContact.firstName} {selectedContact.lastName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedContact.email || "—"}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedContact.phone || "—"}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">—</span>
                </div>
                <div className="flex items-center gap-4">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedContact.jobTitle ? `${selectedContact.jobTitle}${selectedContact.company ? ` at ${selectedContact.company}` : ''}` : selectedContact.company || "—"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 py-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Tags</h4>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <Plus className="w-3 h-3" /> Add tag
                </button>
                <span className="text-sm text-gray-500">No tags assigned</span>
              </div>
            </div>

            <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 py-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Notes</h4>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">+ Ajouter une note</button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Contact added via {selectedContact.source === 'exchange' ? 'contact form' : selectedContact.source}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(selectedContact.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })} {new Date(selectedContact.createdAt).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="hidden lg:flex w-[400px] shrink-0 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex-col items-center justify-center p-12 text-center transition-colors">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-md">
              <Users className="h-8 w-8 text-gray-300 dark:text-gray-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Détails du contact</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-[250px] leading-relaxed">
              Sélectionnez un contact dans la liste à gauche pour afficher et modifier ses coordonnées détaillées.
            </p>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-sm rounded-[32px] bg-white dark:bg-gray-900 shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Supprimer le contact ?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Êtes-vous sûr de vouloir supprimer {selectedContact.firstName} {selectedContact.lastName} de vos contacts ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-2xl bg-gray-100 dark:bg-gray-800 py-3 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Annuler
              </button>
              <button onClick={handleDeleteContact} className="flex-1 rounded-2xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {isEditModalOpen && selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[32px] bg-white dark:bg-gray-900 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200 no-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Modifier le contact</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Prénom</label>
                  <input type="text" required value={editData.firstName || ''} onChange={e => setEditData({...editData, firstName: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Nom</label>
                  <input type="text" value={editData.lastName || ''} onChange={e => setEditData({...editData, lastName: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <input type="email" value={editData.email || ''} onChange={e => setEditData({...editData, email: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Téléphone</label>
                <input type="tel" value={editData.phone || ''} onChange={e => setEditData({...editData, phone: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Entreprise</label>
                <input type="text" value={editData.company || ''} onChange={e => setEditData({...editData, company: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Poste</label>
                <input type="text" value={editData.jobTitle || ''} onChange={e => setEditData({...editData, jobTitle: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                <textarea rows={3} value={editData.message || ''} onChange={e => setEditData({...editData, message: e.target.value})} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors resize-none" />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full rounded-2xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-700 transition-colors shadow-md">
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
