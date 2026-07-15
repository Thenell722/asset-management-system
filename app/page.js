'use client';

import { useMemo, useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Card from '@/components/Card';
import Topbar from '@/components/Topbar';
import AssetTable from '@/components/assets/AssetTable';
import AssetModal from '@/components/assets/AssetModal';
import { initialUsers, initialRoles } from '@/lib/mockData';

let nextId = initialUsers.length + 1;

export default function UsersPage() {
  const [assets, setAssets] = useState([]);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);


  {/* To search for different assets ) */}
 const filtered = useMemo(() => {

  const q = query.trim().toLowerCase();

  if (!q) return assets;

  return assets.filter((asset) =>
    asset.assetTag.toLowerCase().includes(q) ||
    asset.serialNumber.toLowerCase().includes(q) ||
    asset.manufacturer.toLowerCase().includes(q) ||
    asset.model.toLowerCase().includes(q) ||
    asset.assignedEmployee?.toLowerCase().includes(q)
  );

}, [assets, query]);


  useEffect(() => {
  async function fetchAssets() {
    const response = await fetch("/api/assets");

    const data = await response.json();

    setAssets(data);
  }

  fetchAssets();

}, []);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

   function openEdit(asset) {
    setEditing(asset);
    setModalOpen(true);
  }

  async function handleSave(form) {

  let response;


  if (editing) {

    // UPDATE EXISTING ASSET

    response = await fetch(`/api/assets/${editing.id}`, {

      method: "PUT",

      headers:{
        "Content-Type":"application/json",
      },

      body: JSON.stringify(form),

    });


  } else {

    // CREATE NEW ASSET

    response = await fetch("/api/assets", {

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },

      body:JSON.stringify(form),

    });

  }


  if(!response.ok){
    throw new Error("Failed to save asset");
  }


  const savedAsset = await response.json();


  setAssets((prev)=>{

    if(editing){

      return prev.map((asset)=>
        asset.id === savedAsset.id
        ? savedAsset
        : asset
      );

    }


    return [
      ...prev,
      savedAsset
    ];

  });


  setModalOpen(false);
  setEditing(null);

}

async function handleDelete(asset) {

  if (!confirm(`Delete ${asset.assetTag}?`)) {
    return;
  }


  const response = await fetch(
    `/api/assets/${asset.id}`,
    {
      method: "DELETE",
    }
  );


  if (!response.ok) {
    throw new Error("Failed to delete asset");
  }


  setAssets((prev) =>
    prev.filter((a) => a.id !== asset.id)
  );

}


  return (
    <div className="space-y-6">
      <Topbar onMenuClick={() => setNavOpen(true)} />
      <Card
        eyebrow={`${filtered.length} of ${assets.length} records`}
        title="Asset List"
        action={
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} /> Add Asset
          </button>

          
        }
       
        
      >
        <div className="flex items-center gap-2 mb-4 max-w-xs">
          <div className="flex items-center gap-2 border border-steel-line rounded-md px-3 h-9 w-full bg-paper">
            <Search size={15} className="text-steel-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Assignee or Asset name"
              className="bg-transparent outline-none text-sm w-full placeholder:text-steel-soft"
            />
          </div>
        </div>

        <AssetTable assets={filtered} onEdit={openEdit} onDelete={handleDelete} />
      </Card>

      <AssetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        roles={initialRoles}
        initial={editing}
      />
    </div>
  );
}
