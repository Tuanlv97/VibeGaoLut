'use client';

import React, { useState, useEffect, useRef } from 'react';
import { fetchAPI } from '@/lib/api/client';
import { MapPin, ChevronDown, Search, X, Check } from 'lucide-react';

export interface AdministrativeUnitItem {
  id: string;
  code: string;
  name: string;
  fullName: string;
  level: string;
  parentId: string | null;
}

interface AdministrativeSelectsProps {
  provinceValue: string;
  wardValue: string;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
  required?: boolean;
}

function removeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

interface ComboboxOption {
  value: string;
  label: string;
}

interface SearchableComboboxProps {
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  value: string;
  options: ComboboxOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  required?: boolean;
}

function SearchableCombobox({
  label,
  placeholder,
  searchPlaceholder,
  value,
  options,
  onChange,
  disabled = false,
  loading = false,
  error,
  required = true,
}: SearchableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on accent-insensitive search term
  const filteredOptions = options.filter((opt) => {
    if (!searchTerm.trim()) return true;
    const cleanSearch = removeAccents(searchTerm.trim());
    const cleanLabel = removeAccents(opt.label);
    const cleanVal = removeAccents(opt.value);
    return cleanLabel.includes(cleanSearch) || cleanVal.includes(cleanSearch);
  });

  const selectedOpt = options.find((o) => o.value === value || o.label === value);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-[#2D5A27]" /> {label} {required && <span className="text-rose-500">*</span>}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchTerm('');
        }}
        className={`w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-left flex items-center justify-between transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? 'border-rose-500 bg-rose-50/50'
            : isOpen
            ? 'border-[#2D5A27] ring-2 ring-[#2D5A27]/20 bg-white shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={selectedOpt ? 'text-slate-900 font-medium truncate' : 'text-slate-400 font-normal truncate'}>
          {loading ? 'Đang tải dữ liệu...' : selectedOpt ? selectedOpt.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#2D5A27]' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box Input */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/90 sticky top-0 z-10 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent border-none text-xs font-medium text-slate-800 focus:outline-none placeholder:text-slate-400 py-1"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Options Scrollable List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = value === opt.value || value === opt.label;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs text-left font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#2D5A27]/10 text-[#2D5A27] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                Không tìm thấy kết quả phù hợp cho &quot;<span className="font-semibold text-slate-600">{searchTerm}</span>&quot;
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

// Fallback 34 Provinces list according to latest government release
const FALLBACK_PROVINCES: AdministrativeUnitItem[] = [
  { id: 'P01', code: '01', name: 'Hà Nội', fullName: 'Thành phố Hà Nội', level: 'PROVINCE', parentId: null },
  { id: 'P79', code: '79', name: 'Hồ Chí Minh', fullName: 'Thành phố Hồ Chí Minh', level: 'PROVINCE', parentId: null },
  { id: 'P48', code: '48', name: 'Đà Nẵng', fullName: 'Thành phố Đà Nẵng', level: 'PROVINCE', parentId: null },
  { id: 'P31', code: '31', name: 'Hải Phòng', fullName: 'Thành phố Hải Phòng', level: 'PROVINCE', parentId: null },
  { id: 'P92', code: '92', name: 'Cần Thơ', fullName: 'Thành phố Cần Thơ', level: 'PROVINCE', parentId: null },
  { id: 'P75', code: '75', name: 'Thừa Thiên Huế', fullName: 'Tỉnh Thừa Thiên Huế', level: 'PROVINCE', parentId: null },
  { id: 'P77', code: '77', name: 'Bà Rịa - Vũng Tàu', fullName: 'Tỉnh Bà Rịa - Vũng Tàu', level: 'PROVINCE', parentId: null },
  { id: 'P74', code: '74', name: 'Bình Dương', fullName: 'Tỉnh Bình Dương', level: 'PROVINCE', parentId: null },
  { id: 'P75_DN', code: '75_DN', name: 'Đồng Nai', fullName: 'Tỉnh Đồng Nai', level: 'PROVINCE', parentId: null },
  { id: 'P56', code: '56', name: 'Khánh Hòa', fullName: 'Tỉnh Khánh Hòa', level: 'PROVINCE', parentId: null },
  { id: 'P49', code: '49', name: 'Quảng Nam', fullName: 'Tỉnh Quảng Nam', level: 'PROVINCE', parentId: null },
  { id: 'P22', code: '22', name: 'Quảng Ninh', fullName: 'Tỉnh Quảng Ninh', level: 'PROVINCE', parentId: null },
  { id: 'P38', code: '38', name: 'Thanh Hóa', fullName: 'Tỉnh Thanh Hóa', level: 'PROVINCE', parentId: null },
  { id: 'P40', code: '40', name: 'Nghệ An', fullName: 'Tỉnh Nghệ An', level: 'PROVINCE', parentId: null },
  { id: 'P68', code: '68', name: 'Lâm Đồng', fullName: 'Tỉnh Lâm Đồng', level: 'PROVINCE', parentId: null },
  { id: 'P80', code: '80', name: 'Long An', fullName: 'Tỉnh Long An', level: 'PROVINCE', parentId: null },
  { id: 'P82', code: '82', name: 'Tiền Giang', fullName: 'Tỉnh Tiền Giang', level: 'PROVINCE', parentId: null },
  { id: 'P83', code: '83', name: 'Bến Tre', fullName: 'Tỉnh Bến Tre', level: 'PROVINCE', parentId: null },
  { id: 'P86', code: '86', name: 'Vĩnh Long', fullName: 'Tỉnh Vĩnh Long', level: 'PROVINCE', parentId: null },
  { id: 'P89', code: '89', name: 'An Giang', fullName: 'Tỉnh An Giang', level: 'PROVINCE', parentId: null },
  { id: 'P91', code: '91', name: 'Kiên Giang', fullName: 'Tỉnh Kiên Giang', level: 'PROVINCE', parentId: null },
  { id: 'P94', code: '94', name: 'Sóc Trăng', fullName: 'Tỉnh Sóc Trăng', level: 'PROVINCE', parentId: null },
  { id: 'P96', code: '96', name: 'Cà Mau', fullName: 'Tỉnh Cà Mau', level: 'PROVINCE', parentId: null },
  { id: 'P24', code: '24', name: 'Bắc Ninh', fullName: 'Tỉnh Bắc Ninh', level: 'PROVINCE', parentId: null },
  { id: 'P20', code: '20', name: 'Lạng Sơn', fullName: 'Tỉnh Lạng Sơn', level: 'PROVINCE', parentId: null },
  { id: 'P19', code: '19', name: 'Thái Nguyên', fullName: 'Tỉnh Thái Nguyên', level: 'PROVINCE', parentId: null },
  { id: 'P26', code: '26', name: 'Vĩnh Phúc', fullName: 'Tỉnh Vĩnh Phúc', level: 'PROVINCE', parentId: null },
  { id: 'P30', code: '30', name: 'Hải Dương', fullName: 'Tỉnh Hải Dương', level: 'PROVINCE', parentId: null },
  { id: 'P33', code: '33', name: 'Hưng Yên', fullName: 'Tỉnh Hưng Yên', level: 'PROVINCE', parentId: null },
  { id: 'P34', code: '34', name: 'Thái Bình', fullName: 'Tỉnh Thái Bình', level: 'PROVINCE', parentId: null },
  { id: 'P35', code: '35', name: 'Hà Nam', fullName: 'Tỉnh Hà Nam', level: 'PROVINCE', parentId: null },
  { id: 'P36', code: '36', name: 'Nam Định', fullName: 'Tỉnh Nam Định', level: 'PROVINCE', parentId: null },
  { id: 'P37', code: '37', name: 'Ninh Bình', fullName: 'Tỉnh Ninh Bình', level: 'PROVINCE', parentId: null },
  { id: 'P52', code: '52', name: 'Bình Định', fullName: 'Tỉnh Bình Định', level: 'PROVINCE', parentId: null },
];

const FALLBACK_WARDS_MAP: Record<string, string[]> = {
  'Hà Nội': ['Dịch Vọng', 'Dịch Vọng Hậu', 'Mỹ Đình', 'Yên Hòa', 'Trung Hòa', 'Nghĩa Tân', 'Phúc Xá', 'Tràng Tiền', 'Hàng Bạc', 'Kim Mã', 'Ô Chợ Dừa', 'Bách Khoa'],
  'Hồ Chí Minh': ['Bến Nghé', 'Bến Thành', 'Tân Định', 'Thảo Điền', 'An Phú', 'Võ Thị Sáu', 'Tân Phong', 'Phú Mỹ Hưng'],
  'Đà Nẵng': ['Hải Châu', 'Phước Ninh', 'Thạch Thang', 'Mỹ An', 'Khuê Mỹ'],
  'Nghệ An': [
    'Hoa Quân',
    'Kim Bảng',
    'Tam Đồng',
    'Đại Đồng',
    'Bích Hào',
    'Cát Ngạn',
    'Hạnh Lâm',
    'Sơn Lâm',
    'Xuân Lâm',
    'Trường Vinh',
    'Thành Vinh',
    'Vinh Hưng',
    'Vinh Phú',
    'Vinh Lộc',
    'Hồng Sơn',
    'Cửa Lò',
    'Thái Hòa',
    'Hoàng Mai',
    'Quỳnh Vinh',
    'Quỳnh Thiện',
    'Anh Sơn',
    'Yên Xuân',
    'Nhân Hòa',
    'Kim Liên',
    'Nam Nghĩa',
    'Nghi Phú',
    'Nghi Liên',
    'Nghi Kim',
    'Hưng Lộc',
    'Hưng Đông',
    'Hưng Tân',
    'Diễn Kỷ',
    'Diễn Hồng',
    'Diễn Yên',
    'Quỳnh Thạch',
    'Quỳnh Bảng',
    'Đông Thành',
    'Bắc Thành',
    'Nghi Vạn',
    'Thanh Phong'
  ],
  'Hải Phòng': ['Minh Khai', 'Hoàng Văn Thụ', 'Lạch Tray'],
  'Cần Thơ': ['Tân An', 'An Hội', 'An Khánh'],
  'Hải Dương': ['Quang Trung', 'Trần Hưng Đạo', 'Nguyễn Trãi', 'Lê Thanh Nghị', 'Tân Bình'],
  'Thừa Thiên Huế': ['Phú Hội', 'Vĩnh Ninh', 'Thuận Thành'],
  'Bà Rịa - Vũng Tàu': ['Thắng Tam'],
  'Bình Dương': ['Phú Cường', 'Chánh Nghĩa', 'Lái Thiêu'],
  'Đồng Nai': ['Quyết Thắng', 'Trung Dũng', 'Tân Phong'],
  'Khánh Hòa': ['Lộc Thọ', 'Phước Tiến'],
  'Quảng Nam': ['Tân An', 'Minh An'],
  'Quảng Ninh': ['Bãi Cháy', 'Hồng Gai'],
  'Thanh Hóa': ['Điện Biên', 'Lam Sơn'],
  'Lâm Đồng': ['Phường 1'],
  'Long An': ['Phường 1'],
  'Tiền Giang': ['Phường 1'],
  'Bến Tre': ['Phường An Hội'],
  'Vĩnh Long': ['Phường 1'],
  'An Giang': ['Mỹ Bình'],
  'Kiên Giang': ['Vĩnh Thanh'],
  'Sóc Trăng': ['Phường 1'],
  'Cà Mau': ['Phường 1'],
  'Bắc Ninh': ['Suối Hoa'],
  'Lạng Sơn': ['Vĩnh Trại'],
  'Thái Nguyên': ['Phan Đình Phùng'],
  'Vĩnh Phúc': ['Ngô Quyền'],
  'Hưng Yên': ['Hiến Nam'],
  'Thái Bình': ['Lê Hồng Phong'],
  'Hà Nam': ['Minh Khai'],
  'Nam Định': ['Vị Xuyên'],
  'Ninh Bình': ['Vân Giang'],
  'Bình Định': ['Quy Nhơn'],
};

export function AdministrativeSelects({
  provinceValue,
  wardValue,
  onChange,
  errors = {},
  required = true,
}: AdministrativeSelectsProps) {
  const [provinces, setProvinces] = useState<AdministrativeUnitItem[]>(FALLBACK_PROVINCES);
  const [selectedProvinceObj, setSelectedProvinceObj] = useState<AdministrativeUnitItem | null>(null);
  const [wards, setWards] = useState<AdministrativeUnitItem[]>([]);
  const [fallbackWardNames, setFallbackWardNames] = useState<string[]>([]);
  const [loadingWards, setLoadingWards] = useState(false);

  // Fetch 34 Provinces from API on mount
  useEffect(() => {
    async function loadProvinces() {
      try {
        const res = await fetchAPI<AdministrativeUnitItem[]>('/administrative-units/provinces');
        if (res && res.length > 0) {
          setProvinces(res);
        }
      } catch {
        // Fallback
      }
    }
    loadProvinces();
  }, []);

  // Update selected province object when provinceValue changes
  useEffect(() => {
    if (!provinceValue) {
      setSelectedProvinceObj(null);
      setWards([]);
      setFallbackWardNames([]);
      return;
    }

    const cleanVal = provinceValue.trim();
    const found = provinces.find(
      (p) =>
        p.name === cleanVal ||
        p.fullName === cleanVal ||
        cleanVal.includes(p.name) ||
        p.name.includes(cleanVal) ||
        p.fullName.includes(cleanVal),
    );

    setSelectedProvinceObj(found || null);

    const lookupKey = found ? found.name : cleanVal.replace(/^(Tỉnh|Thành phố)\s+/i, '').trim();
    const fallbackList =
      FALLBACK_WARDS_MAP[lookupKey] ||
      FALLBACK_WARDS_MAP[provinceValue] ||
      ['Phường 1', 'Phường 2', 'Xã Trung Tâm'];

    if (!found) {
      setFallbackWardNames(fallbackList);
    }
  }, [provinceValue, provinces]);

  // Fetch Wards by parentId when selectedProvinceObj changes
  useEffect(() => {
    if (!selectedProvinceObj) {
      return;
    }

    async function loadWards() {
      setLoadingWards(true);
      try {
        const res = await fetchAPI<AdministrativeUnitItem[]>(`/administrative-units/children/${selectedProvinceObj!.id}`);
        if (res && res.length > 0) {
          setWards(res);
          setFallbackWardNames([]);
        } else {
          setWards([]);
          const fallbackList =
            FALLBACK_WARDS_MAP[selectedProvinceObj!.name] || ['Phường 1', 'Phường 2', 'Xã Trung Tâm'];
          setFallbackWardNames(fallbackList);
        }
      } catch {
        setWards([]);
        const fallbackList =
          FALLBACK_WARDS_MAP[selectedProvinceObj!.name] || ['Phường 1', 'Phường 2', 'Xã Trung Tâm'];
        setFallbackWardNames(fallbackList);
      } finally {
        setLoadingWards(false);
      }
    }

    loadWards();
  }, [selectedProvinceObj]);

  const handleProvinceChange = (chosenVal: string) => {
    onChange('province', chosenVal);
    onChange('ward', ''); // Clear ward when province changes
  };

  const handleWardChange = (chosenVal: string) => {
    onChange('ward', chosenVal);
  };

  // Convert provinces to ComboboxOptions
  const provinceOptions: ComboboxOption[] = provinces.map((p) => ({
    value: p.name,
    label: p.fullName,
  }));

  // Convert wards to ComboboxOptions
  const wardOptions: ComboboxOption[] =
    wards.length > 0
      ? wards.map((w) => ({
          value: w.name,
          label: w.fullName,
        }))
      : fallbackWardNames.map((name) => ({
          value: name,
          label: `Phường / Xã ${name}`,
        }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* 1. Searchable Tỉnh / Thành phố Combobox */}
      <SearchableCombobox
        label="Tỉnh / Thành Phố"
        placeholder="-- Chọn Tỉnh / Thành Phố --"
        searchPlaceholder="Gõ từ khóa tìm Tỉnh/TP (vd: Nghệ An, Hà Nội)..."
        value={provinceValue}
        options={provinceOptions}
        onChange={handleProvinceChange}
        error={errors.province}
        required={required}
      />

      {/* 2. Searchable Phường / Xã Combobox */}
      <SearchableCombobox
        label="Phường / Xã"
        placeholder={!provinceValue ? '-- Chọn Tỉnh/TP trước --' : '-- Chọn Phường / Xã --'}
        searchPlaceholder="Gõ từ khóa tìm Phường/Xã (vd: Hoa Quân, Tam Đồng)..."
        value={wardValue}
        options={wardOptions}
        onChange={handleWardChange}
        disabled={!provinceValue || loadingWards}
        loading={loadingWards}
        error={errors.ward}
        required={required}
      />
    </div>
  );
}
