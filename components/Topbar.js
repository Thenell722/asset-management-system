'use client';

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Boxes,
  X,
  Cog,
  ChevronDown,
  KeyRound,
  LogOut,
} from "lucide-react";


const TITLES = {
  '/': 'Dashboard',
  '/assets': 'Asset Management ',
  '/roles': 'Role management',
};

export default function Topbar({ onMenuClick }) {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? 'Warely';

  const [open, setOpen] = useState(false);
const dropdownRef = useRef(null);

const router = useRouter();

const [user, setUser] = useState(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);

useEffect(() => {

  async function getUser() {

    try {

      const response = await fetch("/api/auth/me");

      if (!response.ok) return;

      const data = await response.json();

      setUser(data);

    } catch (error) {

      console.error(error);

    }

  }

  getUser();

}, []);



async function handleLogout() {

  try {

    await fetch("/api/auth/logout", {

      method: "POST",

    });

    router.push("/login");

  } catch (error) {

    console.error(error);

  }

}

  return (
    <header className="sticky top-0 z-20 h-16 bg-blue-400  backdrop-blur border-b border-steel-line flex items-center gap-3 px-4 md:px-8">
      <button
        className="md:hidden text-ink"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      <div className="flex-1 min-w-0">
       <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-purple-300 text-ink-navy">
             {/* <Boxes size={10} strokeWidth={3} />  this is a good option or replace it with the image */}
            <Cog/>
            </span>
            <div className="leading-none">
              <p className="font-display text-xl tracking-wide">Icardo</p>
              <p className="text-[10px] uppercase tracking-widest2 text-black">Asset Management</p>
            </div>
          </div>
          <button className="md:hidden text-steel-soft"  aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        </div>

      <div className="hidden sm:flex items-center gap-2 bg-paper-card border border-steel-line rounded-md px-3 h-9 w-56">
        <Search size={16} className="text-steel-soft shrink-0" />
        <input
          type="text"
          placeholder="Search Assets"
          className="bg-transparent outline-none text-sm w-full placeholder:text-steel-soft"
        />
      </div>

      <button
        className="grid place-items-center w-9 h-9 rounded-md border border-steel-line bg-paper-card text-steel hover:text-ink"
        aria-label="Notifications"
      >
        <Bell size={17} />
      </button>

      <div className="relative pl-2" ref={dropdownRef}>
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/20 transition"
  >
    <span className="grid place-items-center w-9 h-9 rounded-full bg-purple-300 text-ink-navy font-display text-sm">
      {user?.name
         ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      : "??"}
    </span>

    <div className="hidden md:block text-left leading-none">
      <p className="text-sm font-medium text-black">
      {user?.name ?? "Loading..."}
      </p>
      <p className="text-xs text-ink">
        Administrator
      </p>
    </div>

    <ChevronDown
      size={16}
      className={`transition-transform ${
        open ? "rotate-180" : ""
      }`}
    />
  </button>

  {open && (
    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
      <div className="border-b px-4 py-3">
        <p className="font-medium text-gray-800">
        {user?.name ?? "Loading..."}
        </p>
        <p className="text-sm text-gray-500">
          Administrator
        </p>
      </div>

      <button
        className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 transition"
      >
        <KeyRound size={18} />
        Change Password
      </button>

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
       >
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  )}
</div>
    </header>
  );
}
