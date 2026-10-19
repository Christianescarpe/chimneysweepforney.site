"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, ChevronDown, Menu, X, Flame } from "lucide-react";
import { BUSINESS_INFO, SERVICE_PAGES, LOCATION_PAGES } from "@/data/siteData";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar matching reference template */}
      <div className="bg-[#f8fafc] border-b border-slate-200/80 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Phone className="w-3.5 h-3.5 text-[#2285f5]" />
            <a
              href={BUSINESS_INFO.phoneHref}
              className="text-[#11182c] font-bold hover:text-[#2285f5] transition-colors"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2285f5]" />
              {BUSINESS_INFO.address}
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-10 h-10 rounded-full bg-[#f5d020] flex items-center justify-center text-[#11182c] shadow-sm group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-[#11182c]" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#11182c] leading-none">
              Blackridge
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
              Chimney Sweep Forney
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#11182c]">
          <Link href="/" className="hover:text-[#2285f5] transition-colors py-2">
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-[#2285f5] transition-colors py-2 cursor-pointer"
            >
              Services
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-1">
                {SERVICE_PAGES.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.slug}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#f8fafc] hover:text-[#2285f5] transition-colors"
                  >
                    {s.pageTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Locations Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-[#2285f5] transition-colors py-2 cursor-pointer"
            >
              Locations
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2 grid gap-1">
                {LOCATION_PAGES.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={loc.slug}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#f8fafc] hover:text-[#2285f5] transition-colors"
                  >
                    {loc.pageTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog/" className="hover:text-[#2285f5] transition-colors py-2">
            Blogs
          </Link>

          <Link href="/contact/" className="hover:text-[#2285f5] transition-colors py-2">
            Contact
          </Link>
        </nav>

        {/* Right Phone CTA Button */}
        <div className="hidden sm:flex items-center">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 animate-pulse-glow"
          >
            <Phone className="w-4 h-4 fill-[#11182c]" />
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 rounded-lg text-[#11182c] hover:bg-slate-100"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 max-h-[82vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-[#11182c]"
          >
            Home
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-[#11182c]"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div className="pl-3 mt-1 space-y-1 border-l-2 border-[#f5d020]">
                {SERVICE_PAGES.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.slug}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-xs font-medium text-slate-600 hover:text-[#2285f5]"
                  >
                    {s.pageTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setLocationsOpen(!locationsOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-[#11182c]"
            >
              <span>Locations</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${locationsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {locationsOpen && (
              <div className="pl-3 mt-1 space-y-1 border-l-2 border-[#2285f5]">
                {LOCATION_PAGES.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={loc.slug}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-xs font-medium text-slate-600 hover:text-[#2285f5]"
                  >
                    {loc.pageTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-[#11182c]"
          >
            Blogs
          </Link>

          <Link
            href="/contact/"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-bold text-[#11182c]"
          >
            Contact
          </Link>

          <div className="pt-2">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#f5d020] text-[#11182c] font-bold text-sm px-5 py-3 rounded-full shadow-sm"
            >
              <Phone className="w-4 h-4 fill-[#11182c]" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
