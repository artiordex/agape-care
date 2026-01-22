import { useState } from 'react';

interface CommonArea {
  id: number;
  name: string;
  description: string;
  features: string[];
  image: string;
  galleryImages: string[];
}

const commonAreas: CommonArea[] = [
  {
    id: 1,
    name: '식당',
    description: '건강하고 맛있는 식사를 제공하는 쾌적한 식당',
    features: ['영양사 관리', '계절 메뉴', '개인 식단 관리', '쾌적한 환경'],
    image: 'https://readdy.ai/api/search-image?query=Bright%20and%20spacious%20senior%20care%20facility%20dining%20hall%20with%20multiple%20tables%20comfortable%20chairs%20large%20windows%20with%20natural%20light%20clean%20modern%20interior%20and%20welcoming%20atmosphere%20for%20elderly%20residents%20to%20enjoy%20healthy%20meals%20together&width=800&height=600&seq=facility-common-1&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Modern%20senior%20facility%20dining%20room%20with%20round%20tables%20elegant%20table%20settings%20bright%20lighting%20and%20comfortable%20seating%20arrangements%20clean%20white%20walls%20wooden%20floor&width=800&height=600&seq=facility-common-1-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Nutritious%20meal%20service%20area%20in%20senior%20care%20dining%20hall%20with%20buffet%20counter%20food%20display%20and%20serving%20stations%20clean%20and%20hygienic%20environment&width=800&height=600&seq=facility-common-1-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Cozy%20dining%20corner%20with%20small%20tables%20for%20intimate%20meals%20warm%20lighting%20decorative%20plants%20and%20comfortable%20chairs%20for%20elderly%20residents&width=800&height=600&seq=facility-common-1-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Large%20dining%20hall%20overview%20with%20multiple%20seating%20areas%20accessible%20pathways%20natural%20light%20from%20windows%20and%20pleasant%20atmosphere%20for%20communal%20dining&width=800&height=600&seq=facility-common-1-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 2,
    name: '물리치료실',
    description: '전문 치료사가 상주하는 재활 치료 공간',
    features: ['전문 치료사', '최신 장비', '개인 맞춤 치료', '재활 프로그램'],
    image: 'https://readdy.ai/api/search-image?query=Professional%20physical%20therapy%20room%20in%20senior%20care%20facility%20with%20modern%20rehabilitation%20equipment%20exercise%20machines%20treatment%20tables%20and%20bright%20clean%20environment%20designed%20for%20elderly%20patients%20recovery%20and%20wellness&width=800&height=600&seq=facility-common-2&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Modern%20rehabilitation%20equipment%20area%20with%20treadmills%20exercise%20bikes%20and%20strength%20training%20machines%20for%20senior%20physical%20therapy%20bright%20and%20spacious%20room&width=800&height=600&seq=facility-common-2-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Physical%20therapy%20treatment%20tables%20and%20massage%20beds%20with%20professional%20equipment%20clean%20white%20environment%20for%20elderly%20rehabilitation%20sessions&width=800&height=600&seq=facility-common-2-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Balance%20and%20mobility%20training%20area%20with%20parallel%20bars%20walking%20aids%20and%20safety%20mats%20for%20senior%20rehabilitation%20exercises&width=800&height=600&seq=facility-common-2-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Occupational%20therapy%20corner%20with%20hand%20exercise%20tools%20cognitive%20training%20materials%20and%20comfortable%20seating%20for%20elderly%20patients&width=800&height=600&seq=facility-common-2-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 3,
    name: '휴게실',
    description: '편안한 휴식과 여가 활동을 위한 공간',
    features: ['편안한 소파', 'TV 시청', '독서 공간', '차 마시기'],
    image: 'https://readdy.ai/api/search-image?query=Comfortable%20lounge%20area%20in%20senior%20care%20facility%20with%20soft%20sofas%20armchairs%20television%20reading%20corner%20and%20warm%20ambient%20lighting%20creating%20a%20relaxing%20space%20for%20elderly%20residents%20to%20socialize%20and%20rest&width=800&height=600&seq=facility-common-3&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Cozy%20seating%20area%20with%20comfortable%20sofas%20coffee%20table%20and%20large%20television%20for%20seniors%20to%20watch%20programs%20together%20warm%20and%20inviting%20atmosphere&width=800&height=600&seq=facility-common-3-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Quiet%20reading%20corner%20with%20bookshelves%20comfortable%20armchairs%20reading%20lamps%20and%20side%20tables%20peaceful%20space%20for%20elderly%20residents&width=800&height=600&seq=facility-common-3-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Tea%20and%20refreshment%20area%20with%20small%20tables%20chairs%20and%20beverage%20station%20for%20seniors%20to%20enjoy%20drinks%20and%20conversation&width=800&height=600&seq=facility-common-3-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Spacious%20lounge%20with%20multiple%20seating%20arrangements%20natural%20light%20from%20windows%20indoor%20plants%20and%20comfortable%20furniture%20for%20elderly%20socialization&width=800&height=600&seq=facility-common-3-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 4,
    name: '프로그램실',
    description: '다양한 활동과 프로그램을 진행하는 다목적 공간',
    features: ['인지 활동', '미술 치료', '음악 치료', '그룹 활동'],
    image: 'https://readdy.ai/api/search-image?query=Multipurpose%20activity%20room%20in%20senior%20care%20facility%20with%20tables%20chairs%20art%20supplies%20and%20educational%20materials%20for%20cognitive%20programs%20music%20therapy%20and%20group%20activities%20bright%20and%20cheerful%20environment%20for%20elderly%20engagement&width=800&height=600&seq=facility-common-4&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Art%20therapy%20area%20with%20tables%20art%20supplies%20paintings%20and%20creative%20materials%20for%20senior%20residents%20to%20express%20themselves%20colorful%20and%20inspiring%20space&width=800&height=600&seq=facility-common-4-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Music%20therapy%20corner%20with%20musical%20instruments%20piano%20and%20comfortable%20seating%20for%20elderly%20residents%20to%20enjoy%20music%20activities&width=800&height=600&seq=facility-common-4-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Cognitive%20training%20area%20with%20puzzles%20games%20educational%20materials%20and%20tables%20for%20group%20activities%20to%20maintain%20mental%20sharpness%20in%20seniors&width=800&height=600&seq=facility-common-4-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Group%20activity%20space%20with%20circular%20seating%20arrangement%20large%20tables%20and%20activity%20materials%20for%20social%20programs%20and%20community%20building%20among%20elderly%20residents&width=800&height=600&seq=facility-common-4-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 5,
    name: '정원',
    description: '자연을 느낄 수 있는 야외 휴식 공간',
    features: ['산책로', '벤치', '화단', '그늘막'],
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20outdoor%20garden%20in%20senior%20care%20facility%20with%20walking%20paths%20benches%20flower%20beds%20shade%20structures%20and%20green%20plants%20creating%20a%20peaceful%20natural%20environment%20for%20elderly%20residents%20to%20enjoy%20fresh%20air%20and%20nature&width=800&height=600&seq=facility-common-5&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Scenic%20walking%20path%20through%20senior%20facility%20garden%20with%20paved%20accessible%20walkway%20surrounded%20by%20flowers%20trees%20and%20greenery%20peaceful%20atmosphere&width=800&height=600&seq=facility-common-5-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Comfortable%20seating%20area%20in%20garden%20with%20benches%20under%20shade%20structures%20surrounded%20by%20colorful%20flower%20beds%20for%20elderly%20residents%20to%20rest&width=800&height=600&seq=facility-common-5-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Vibrant%20flower%20garden%20with%20raised%20beds%20colorful%20blooms%20and%20accessible%20pathways%20for%20seniors%20to%20enjoy%20gardening%20activities&width=800&height=600&seq=facility-common-5-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Shaded%20pavilion%20area%20in%20garden%20with%20tables%20and%20chairs%20for%20outdoor%20activities%20and%20relaxation%20surrounded%20by%20lush%20greenery&width=800&height=600&seq=facility-common-5-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 6,
    name: '목욕실',
    description: '안전하고 편안한 목욕 시설',
    features: ['안전 손잡이', '미끄럼 방지', '온수 공급', '개인 프라이버시'],
    image: 'https://readdy.ai/api/search-image?query=Safe%20and%20accessible%20bathing%20facility%20in%20senior%20care%20center%20with%20safety%20grab%20bars%20non-slip%20flooring%20walk-in%20bathtubs%20shower%20chairs%20and%20bright%20clean%20environment%20designed%20for%20elderly%20residents%20comfort%20and%20safety&width=800&height=600&seq=facility-common-6&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Accessible%20walk-in%20bathtub%20with%20safety%20features%20grab%20bars%20and%20comfortable%20seating%20for%20elderly%20bathing%20clean%20white%20tiles&width=800&height=600&seq=facility-common-6-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Roll-in%20shower%20area%20with%20shower%20chair%20handheld%20showerhead%20safety%20bars%20and%20non-slip%20flooring%20for%20senior%20residents&width=800&height=600&seq=facility-common-6-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Private%20bathing%20room%20with%20curtains%20for%20privacy%20accessible%20fixtures%20and%20safety%20equipment%20for%20elderly%20care&width=800&height=600&seq=facility-common-6-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Changing%20and%20preparation%20area%20in%20bathing%20facility%20with%20benches%20storage%20lockers%20and%20accessible%20design%20for%20senior%20residents&width=800&height=600&seq=facility-common-6-gallery-4&orientation=landscape'
    ]
  }
];

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const ImageGalleryModal = ({ isOpen, onClose, images, title }: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <i className="ri-close-line text-3xl"></i>
        </button>

        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <div className="relative">
            <div className="w-full h-[500px] bg-gray-100">
              <img
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <i className="ri-arrow-left-s-line text-2xl text-gray-900"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <i className="ri-arrow-right-s-line text-2xl text-gray-900"></i>
                </button>
              </>
            )}
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentIndex === index ? 'border-teal-500' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommonAreas = () => {
  const [selectedArea, setSelectedArea] = useState<CommonArea | null>(null);

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">공용 공간</h2>
            <p className="text-lg text-gray-600">
              어르신들의 편안한 생활을 위한 다양한 공용 시설을 갖추고 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonAreas.map((area) => (
              <div
                key={area.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedArea(area)}
              >
                <div className="relative w-full h-56">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{area.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{area.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">주요 특징</h4>
                    <ul className="space-y-1">
                      {area.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 text-sm">
                          <i className="ri-check-line text-teal-500 mr-2 w-4 h-4 flex items-center justify-center"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-teal-600 font-medium">
                      <i className="ri-image-line mr-1"></i>
                      {area.galleryImages.length + 1}개 사진 보기
                    </span>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageGalleryModal
        isOpen={selectedArea !== null}
        onClose={() => setSelectedArea(null)}
        images={selectedArea ? [selectedArea.image, ...selectedArea.galleryImages] : []}
        title={selectedArea?.name || ''}
      />
    </>
  );
};

export default CommonAreas;
