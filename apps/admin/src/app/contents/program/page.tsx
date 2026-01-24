'use client';

import { useState, useEffect } from 'react';
import heic2any from 'heic2any';

const supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY);

interface ProgramImage {
  id: string;
  url: string;
  uploadedAt: string;
}

interface Program {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  category: string;
  color: string;
  staff: string;
  description: string;
  place?: string;
  images?: ProgramImage[];
  created_at?: string;
  updated_at?: string;
}

interface ProgramTemplate {
  id: string;
  name: string;
  title: string;
  category: string;
  color: string;
  duration_minutes: number;
  description: string;
  default_staff: string;
}

const CATEGORIES = [
  { id: 'cognitive', name: '인지활동', color: '#8B5CF6', icon: 'ri-brain-line' },
  { id: 'leisure', name: '여가활동', color: '#EC4899', icon: 'ri-music-line' },
  { id: 'physical', name: '물리치료', color: '#10B981', icon: 'ri-heart-pulse-line' },
  { id: 'music', name: '음악치료', color: '#3B82F6', icon: 'ri-headphone-line' },
  { id: 'art', name: '미술활동', color: '#F59E0B', icon: 'ri-palette-line' },
  { id: 'event', name: '특별행사', color: '#EF4444', icon: 'ri-gift-line' },
];

export default function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [templates, setTemplates] = useState<ProgramTemplate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<ProgramTemplate | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    loadPrograms();
    loadTemplates();
    initializeStorage();
  }, []);

  const initializeStorage = async () => {
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'program-images');

      if (!bucketExists) {
        await supabase.storage.createBucket('program-images', {
          public: true,
          fileSizeLimit: 5242880,
        });
      }
    } catch (error) {
      console.error('스토리지 초기화 실패:', error);
    }
  };

  const loadPrograms = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('program_schedules')
        .select('*')
        .order('date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;

      setPrograms(data || []);
    } catch (error) {
      console.error('프로그램 로드 실패:', error);
      alert('프로그램을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase.from('program_templates').select('*').order('name', { ascending: true });

      if (error) throw error;

      setTemplates(data || []);
    } catch (error) {
      console.error('템플릿 로드 실패:', error);
    }
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const category = CATEGORIES[0];
    setEditingProgram({
      id: '',
      title: '',
      start_time: '10:00',
      end_time: '11:00',
      date: dateStr,
      category: category.id,
      color: category.color,
      staff: '',
      description: '',
      place: '',
      images: [],
    });
    setSelectedImages([]);
    setPreviewUrls([]);
    setShowModal(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram({ ...program });
    setSelectedImages([]);
    setPreviewUrls([]);
    setShowModal(true);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const existingCount = (editingProgram?.images?.length || 0) + selectedImages.length;
    if (existingCount + files.length > 10) {
      alert('최대 10장까지 업로드할 수 있습니다.');
      return;
    }

    const processedFiles: File[] = [];
    const urls: string[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name}은(는) 5MB를 초과합니다.`);
        continue;
      }

      let processedFile = file;

      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8,
          });
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          processedFile = new File([blob], file.name.replace(/\.heic$/i, '.jpg'), {
            type: 'image/jpeg',
          });
        } catch (error) {
          console.error('HEIC 변환 실패:', error);
          alert(`${file.name} 변환에 실패했습니다.`);
          continue;
        }
      }

      processedFiles.push(processedFile);
      urls.push(URL.createObjectURL(processedFile));
    }

    setSelectedImages(prev => [...prev, ...processedFiles]);
    setPreviewUrls(prev => [...prev, ...urls]);
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = async (imageId: string, imageUrl: string) => {
    if (!editingProgram) return;

    try {
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('program-images').remove([fileName]);
      }

      setEditingProgram({
        ...editingProgram,
        images: (editingProgram.images || []).filter(img => img.id !== imageId),
      });
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      alert('이미지 삭제에 실패했습니다.');
    }
  };

  const uploadImages = async (): Promise<ProgramImage[]> => {
    if (selectedImages.length === 0) return [];

    setUploadingImages(true);
    const uploadedImages: ProgramImage[] = [];

    try {
      for (const file of selectedImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage.from('program-images').upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('program-images').getPublicUrl(filePath);

        uploadedImages.push({
          id: crypto.randomUUID(),
          url: publicUrl,
          uploadedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    } finally {
      setUploadingImages(false);
    }

    return uploadedImages;
  };

  const handleSave = async () => {
    if (!editingProgram) return;

    if (!editingProgram.title.trim()) {
      alert('프로그램 제목을 입력해주세요.');
      return;
    }

    if (!editingProgram.date) {
      alert('날짜를 선택해주세요.');
      return;
    }

    if (editingProgram.start_time >= editingProgram.end_time) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    setIsSaving(true);

    try {
      let newImages: ProgramImage[] = [];
      if (selectedImages.length > 0) {
        newImages = await uploadImages();
      }

      const allImages = [...(editingProgram.images || []), ...newImages];

      const dataToSave = {
        title: editingProgram.title.trim(),
        start_time: editingProgram.start_time,
        end_time: editingProgram.end_time,
        date: editingProgram.date,
        category: editingProgram.category,
        color: editingProgram.color,
        staff: editingProgram.staff.trim(),
        description: editingProgram.description.trim(),
        place: editingProgram.place?.trim() || '',
        images: allImages,
        updated_at: new Date().toISOString(),
      };

      if (editingProgram.id) {
        const { error } = await supabase.from('program_schedules').update(dataToSave).eq('id', editingProgram.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('program_schedules').insert([dataToSave]);

        if (error) throw error;
      }

      await loadPrograms();
      setShowModal(false);
      setEditingProgram(null);
      setSelectedImages([]);
      setPreviewUrls([]);
      alert('프로그램이 저장되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 프로그램을 삭제하시겠습니까?')) return;

    try {
      const program = programs.find(p => p.id === id);
      if (program?.images) {
        for (const image of program.images) {
          const fileName = image.url.split('/').pop();
          if (fileName) {
            await supabase.storage.from('program-images').remove([fileName]);
          }
        }
      }

      const { error } = await supabase.from('program_schedules').delete().eq('id', id);

      if (error) throw error;

      await loadPrograms();
      setShowModal(false);
      setEditingProgram(null);
      alert('프로그램이 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleTemplateAdd = () => {
    const category = CATEGORIES[0];
    setEditingTemplate({
      id: '',
      name: '',
      title: '',
      category: category.id,
      color: category.color,
      duration_minutes: 60,
      description: '',
      default_staff: '',
    });
    setShowTemplateModal(true);
  };

  const handleTemplateEdit = (template: ProgramTemplate) => {
    setEditingTemplate({ ...template });
    setShowTemplateModal(true);
  };

  const handleTemplateSave = async () => {
    if (!editingTemplate) return;

    if (!editingTemplate.name.trim() || !editingTemplate.title.trim()) {
      alert('템플릿 이름과 프로그램명을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    try {
      const dataToSave = {
        name: editingTemplate.name.trim(),
        title: editingTemplate.title.trim(),
        category: editingTemplate.category,
        color: editingTemplate.color,
        duration_minutes: editingTemplate.duration_minutes,
        description: editingTemplate.description.trim(),
        default_staff: editingTemplate.default_staff.trim(),
        updated_at: new Date().toISOString(),
      };

      if (editingTemplate.id) {
        const { error } = await supabase.from('program_templates').update(dataToSave).eq('id', editingTemplate.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('program_templates').insert([dataToSave]);
        if (error) throw error;
      }

      await loadTemplates();
      setShowTemplateModal(false);
      setEditingTemplate(null);
      alert('템플릿이 저장되었습니다.');
    } catch (error) {
      console.error('템플릿 저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateDelete = async (id: string) => {
    if (!confirm('이 템플릿을 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase.from('program_templates').delete().eq('id', id);

      if (error) throw error;

      await loadTemplates();
      alert('템플릿이 삭제되었습니다.');
    } catch (error) {
      console.error('템플릿 삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.staff.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  };

  const handleTemplateCategoryChange = (categoryId: string) => {
    if (!editingTemplate) return;
    const category = getCategoryInfo(categoryId);
    setEditingTemplate({
      ...editingTemplate,
      category: categoryId,
      color: category.color,
    });
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getProgramsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return programs.filter(p => p.date === dateStr && (filterCategory === 'all' || p.category === filterCategory));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-teal-600"></i>
          <p className="mt-4 text-gray-600">프로그램을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">프로그램 일정표 관리</h1>
          <p className="mt-1 text-sm text-gray-600">
            총 {programs.length}개의 프로그램 | {templates.length}개의 템플릿
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowTemplateModal(true)}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-2 text-white shadow-md transition-all hover:from-purple-600 hover:to-purple-700"
          >
            <i className="ri-file-list-3-line mr-2"></i>
            템플릿 관리
          </button>
          <button
            onClick={() => {
              const category = CATEGORIES[0];
              const today = new Date().toISOString().split('T')[0];
              setEditingProgram({
                id: '',
                title: '',
                start_time: '10:00',
                end_time: '11:00',
                date: today,
                category: category.id,
                color: category.color,
                staff: '',
                description: '',
                place: '',
                images: [],
              });
              setSelectedImages([]);
              setPreviewUrls([]);
              setShowModal(true);
            }}
            className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-2 text-white shadow-md transition-all hover:from-teal-600 hover:to-teal-700"
          >
            <i className="ri-add-line mr-2"></i>
            프로그램 추가
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="프로그램명 또는 담당자명 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">전체 카테고리</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 transition-colors ${
              viewMode === 'calendar' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-calendar-line mr-2"></i>
            캘린더
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 transition-colors ${
              viewMode === 'list' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-list-check mr-2"></i>
            리스트
          </button>
        </div>
      </div>

      {/* Custom Calendar View */}
      {viewMode === 'calendar' && (
        <div>
          <div className="mb-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <i className="ri-information-line mr-2"></i>
              <strong>달력 사용 방법:</strong> 날짜를 클릭하면 새 프로그램을 추가할 수 있습니다. 기존 프로그램을
              클릭하면 수정할 수 있습니다.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <button
                onClick={goToPreviousMonth}
                className="cursor-pointer rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={goToToday}
                  className="cursor-pointer rounded-lg px-4 py-2 text-sm text-teal-600 transition-colors hover:bg-teal-50"
                >
                  오늘
                </button>
                <button
                  onClick={goToNextMonth}
                  className="cursor-pointer rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Weekday Headers */}
              <div className="mb-2 grid grid-cols-7 gap-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                  <div
                    key={day}
                    className={`py-2 text-center text-sm font-semibold ${
                      index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentMonth).map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const dayPrograms = getProgramsForDate(date);
                  const isCurrentDay = isToday(date);
                  const dayOfWeek = date.getDay();

                  return (
                    <div
                      key={date.toISOString()}
                      onClick={() => handleDateClick(date)}
                      className={`aspect-square cursor-pointer rounded-lg border p-2 transition-all hover:border-teal-400 hover:shadow-md ${
                        isCurrentDay ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div
                        className={`mb-1 text-sm font-semibold ${
                          isCurrentDay
                            ? 'text-teal-600'
                            : dayOfWeek === 0
                              ? 'text-red-600'
                              : dayOfWeek === 6
                                ? 'text-blue-600'
                                : 'text-gray-700'
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayPrograms.slice(0, 3).map(program => {
                          const categoryInfo = getCategoryInfo(program.category);
                          return (
                            <div
                              key={program.id}
                              onClick={e => {
                                e.stopPropagation();
                                handleEdit(program);
                              }}
                              className="cursor-pointer truncate rounded px-1 py-0.5 text-xs text-white hover:opacity-80"
                              style={{ backgroundColor: categoryInfo.color }}
                              title={`${program.title} (${program.start_time}-${program.end_time})`}
                            >
                              {program.title}
                            </div>
                          );
                        })}
                        {dayPrograms.length > 3 && (
                          <div className="px-1 text-xs text-gray-500">+{dayPrograms.length - 3}개 더보기</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredPrograms.map(program => {
            const categoryInfo = getCategoryInfo(program.category);
            return (
              <div
                key={program.id}
                className="rounded-lg border-l-4 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                style={{ borderLeftColor: categoryInfo.color }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                        style={{ backgroundColor: categoryInfo.color }}
                      >
                        <i className={`${categoryInfo.icon} mr-1`}></i>
                        {categoryInfo.name}
                      </span>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{program.title}</h3>
                    <p className="text-sm text-gray-600">
                      <i className="ri-user-line mr-1"></i>
                      {program.staff || '담당자 미정'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(program)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-teal-600 transition-colors hover:bg-teal-50"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(program.id)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <i className="ri-calendar-line mr-2 flex h-4 w-4 items-center justify-center text-gray-400"></i>
                    {new Date(program.date).toLocaleDateString('ko-KR')}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-time-line mr-2 flex h-4 w-4 items-center justify-center text-gray-400"></i>
                    {program.start_time} - {program.end_time}
                  </div>
                  {program.place && (
                    <div className="flex items-center">
                      <i className="ri-map-pin-line mr-2 flex h-4 w-4 items-center justify-center text-gray-400"></i>
                      {program.place}
                    </div>
                  )}
                  {program.images && program.images.length > 0 && (
                    <div className="flex items-center">
                      <i className="ri-image-line mr-2 flex h-4 w-4 items-center justify-center text-gray-400"></i>
                      사진 {program.images.length}장
                    </div>
                  )}
                </div>

                {program.description && (
                  <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-600">{program.description}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {filteredPrograms.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
          <i className="ri-calendar-close-line mb-4 text-5xl text-gray-300"></i>
          <p className="text-gray-600">등록된 프로그램이 없습니다.</p>
        </div>
      )}

      {/* Program Modal with Image Upload */}
      {showModal && editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProgram.id ? '프로그램 수정' : '새 프로그램 추가'}
              </h2>
            </div>

            <div className="space-y-6 p-6">
              {/* 템플릿 선택 */}
              {templates.length > 0 && (
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <label className="mb-3 block text-sm font-medium text-purple-900">
                    <i className="ri-file-list-3-line mr-2"></i>
                    지정 양식 불러오기
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {templates.map(template => {
                      const categoryInfo = getCategoryInfo(template.category);
                      return (
                        <button
                          key={template.id}
                          onClick={() => {
                            const startTime = editingProgram.start_time || '10:00';
                            const [hours, minutes] = startTime.split(':').map(Number);
                            const endDate = new Date();
                            endDate.setHours(hours);
                            endDate.setMinutes(minutes + template.duration_minutes);
                            const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;

                            setEditingProgram({
                              ...editingProgram,
                              title: template.title,
                              category: template.category,
                              color: template.color,
                              description: template.description,
                              staff: template.default_staff,
                              end_time: endTime,
                            });
                          }}
                          className="cursor-pointer rounded-lg border-2 border-purple-200 bg-white p-3 text-left transition-all hover:border-purple-400 hover:shadow-sm"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <div
                              className="flex h-6 w-6 items-center justify-center rounded"
                              style={{ backgroundColor: categoryInfo.color }}
                            >
                              <i className={`${categoryInfo.icon} text-xs text-white`}></i>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{template.name}</span>
                          </div>
                          <p className="line-clamp-1 text-xs text-gray-600">{template.title}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 기본 정보 입력 */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">프로그램명 *</label>
                  <input
                    type="text"
                    value={editingProgram.title}
                    onChange={e => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    placeholder="프로그램 제목"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">카테고리 *</label>
                  <select
                    value={editingProgram.category}
                    onChange={e => {
                      const category = getCategoryInfo(e.target.value);
                      setEditingProgram({
                        ...editingProgram,
                        category: e.target.value,
                        color: category.color,
                      });
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">담당자</label>
                  <input
                    type="text"
                    value={editingProgram.staff}
                    onChange={e => setEditingProgram({ ...editingProgram, staff: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    placeholder="담당자 이름"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">날짜 *</label>
                  <input
                    type="date"
                    value={editingProgram.date}
                    onChange={e => setEditingProgram({ ...editingProgram, date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">장소</label>
                  <input
                    type="text"
                    value={editingProgram.place || ''}
                    onChange={e => setEditingProgram({ ...editingProgram, place: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    placeholder="프로그램실"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">시작 시간 *</label>
                  <input
                    type="time"
                    value={editingProgram.start_time}
                    onChange={e => setEditingProgram({ ...editingProgram, start_time: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">종료 시간 *</label>
                  <input
                    type="time"
                    value={editingProgram.end_time}
                    onChange={e => setEditingProgram({ ...editingProgram, end_time: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">짧은 설명</label>
                  <textarea
                    value={editingProgram.description}
                    onChange={e => setEditingProgram({ ...editingProgram, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                    placeholder="프로그램 간단 설명 (선택사항)"
                  />
                </div>
              </div>

              {/* 이미지 업로드 섹션 */}
              <div className="border-t pt-6">
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  <i className="ri-image-line mr-2"></i>
                  프로그램 활동 사진 (최대 10장)
                </label>

                {/* 기존 이미지 */}
                {editingProgram.images && editingProgram.images.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-600">등록된 사진</p>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {editingProgram.images.map(image => (
                        <div key={image.id} className="group relative">
                          <img
                            src={image.url}
                            alt="프로그램 사진"
                            className="h-32 w-full rounded-lg border-2 border-gray-200 object-cover"
                          />
                          <button
                            onClick={() => removeExistingImage(image.id, image.url)}
                            className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <i className="ri-close-line text-sm"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 새로 선택한 이미지 미리보기 */}
                {previewUrls.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm text-gray-600">새로 추가할 사진</p>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="group relative">
                          <img
                            src={url}
                            alt="미리보기"
                            className="h-32 w-full rounded-lg border-2 border-teal-200 object-cover"
                          />
                          <button
                            onClick={() => removeSelectedImage(index)}
                            className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <i className="ri-close-line text-sm"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 이미지 업로드 버튼 */}
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-teal-400">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*,.heic"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="flex cursor-pointer flex-col items-center">
                    <i className="ri-upload-cloud-line mb-2 text-4xl text-gray-400"></i>
                    <p className="mb-1 text-sm text-gray-600">클릭하여 이미지를 선택하거나 드래그하여 업로드</p>
                    <p className="text-xs text-gray-500">JPG, PNG, HEIC 형식 지원 | 최대 5MB | 최대 10장</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-200 bg-gray-50 p-6">
              <div>
                {editingProgram.id && (
                  <button
                    onClick={() => handleDelete(editingProgram.id)}
                    disabled={isSaving || uploadingImages}
                    className="cursor-pointer whitespace-nowrap rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    <i className="ri-delete-bin-line mr-2"></i>
                    삭제
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingProgram(null);
                    setSelectedImages([]);
                    setPreviewUrls([]);
                  }}
                  disabled={isSaving || uploadingImages}
                  className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || uploadingImages}
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-2 text-white transition-all hover:from-teal-600 hover:to-teal-700 disabled:opacity-50"
                >
                  {isSaving || uploadingImages ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      {uploadingImages ? '이미지 업로드 중...' : '저장 중...'}
                    </>
                  ) : (
                    '저장하기'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Management Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                <i className="ri-file-list-3-line mr-2"></i>
                프로그램 템플릿 관리
              </h2>
            </div>

            <div className="p-6">
              {/* Template List */}
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">등록된 템플릿</h3>
                  <button
                    onClick={handleTemplateAdd}
                    className="cursor-pointer whitespace-nowrap rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-700"
                  >
                    <i className="ri-add-line mr-1"></i>새 템플릿
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {templates.map(template => {
                    const categoryInfo = getCategoryInfo(template.category);
                    return (
                      <div
                        key={template.id}
                        className="rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-purple-300"
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-lg"
                              style={{ backgroundColor: categoryInfo.color }}
                            >
                              <i className={`${categoryInfo.icon} text-xl text-white`}></i>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{template.name}</h4>
                              <p className="text-sm text-gray-600">{template.title}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleTemplateEdit(template)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-purple-600 transition-colors hover:bg-purple-50"
                            >
                              <i className="ri-edit-line"></i>
                            </button>
                            <button
                              onClick={() => handleTemplateDelete(template.id)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <i className="ri-time-line"></i>
                            <span>{template.duration_minutes}분</span>
                          </div>
                          {template.default_staff && (
                            <div className="flex items-center gap-2">
                              <i className="ri-user-line"></i>
                              <span>{template.default_staff}</span>
                            </div>
                          )}
                          {template.description && (
                            <p className="mt-2 line-clamp-2 text-gray-600">{template.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Template Edit Form */}
              {editingTemplate && (
                <div className="border-t pt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    {editingTemplate.id ? '템플릿 수정' : '새 템플릿 추가'}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">템플릿 이름 *</label>
                      <input
                        type="text"
                        value={editingTemplate.name}
                        onChange={e => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        placeholder="예: 인지활동 기본"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">프로그램명 *</label>
                      <input
                        type="text"
                        value={editingTemplate.title}
                        onChange={e => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        placeholder="예: 인지활동 프로그램"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">카테고리 *</label>
                      <select
                        value={editingTemplate.category}
                        onChange={e => handleTemplateCategoryChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">소요 시간 (분)</label>
                      <input
                        type="number"
                        value={editingTemplate.duration_minutes}
                        onChange={e =>
                          setEditingTemplate({
                            ...editingTemplate,
                            duration_minutes: parseInt(e.target.value) || 60,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        min="15"
                        step="15"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">기본 담당자</label>
                      <input
                        type="text"
                        value={editingTemplate.default_staff}
                        onChange={e => setEditingTemplate({ ...editingTemplate, default_staff: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        placeholder="담당자 이름"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1 block text-sm font-medium text-gray-700">설명</label>
                      <textarea
                        value={editingTemplate.description}
                        onChange={e => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        placeholder="프로그램 설명"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => setEditingTemplate(null)}
                      disabled={isSaving}
                      className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleTemplateSave}
                      disabled={isSaving}
                      className="cursor-pointer whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-2 text-white transition-all hover:from-purple-600 hover:to-purple-700 disabled:opacity-50"
                    >
                      {isSaving ? '저장 중...' : '템플릿 저장'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-gray-200 bg-gray-50 p-6">
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  setEditingTemplate(null);
                }}
                className="cursor-pointer whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
