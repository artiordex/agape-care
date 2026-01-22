import { useState } from 'react';

interface Room {
  id: number;
  name: string;
  size: string;
  capacity: string;
  features: string[];
  image: string;
  galleryImages: string[];
}

const rooms: Room[] = [
  {
    id: 1,
    name: '1인실',
    size: '15평',
    capacity: '1명',
    features: ['개인 화장실', '냉난방 시설', '개인 TV', '수납공간', '비상벨'],
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20single%20occupancy%20senior%20care%20room%20with%20modern%20furniture%20comfortable%20bed%20personal%20bathroom%20television%20and%20warm%20lighting%20creating%20a%20cozy%20private%20space%20for%20elderly%20residents%20with%20clean%20white%20walls%20and%20wooden%20flooring%20in%20minimalist%20style&width=800&height=600&seq=facility-room-1&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Elegant%20single%20senior%20room%20interior%20with%20comfortable%20bed%20bedside%20table%20reading%20lamp%20and%20large%20window%20with%20natural%20light%20clean%20white%20walls%20wooden%20floor%20minimalist%20design&width=800&height=600&seq=facility-room-1-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Modern%20private%20bathroom%20in%20senior%20care%20facility%20with%20safety%20grab%20bars%20walk-in%20shower%20toilet%20sink%20and%20bright%20lighting%20clean%20white%20tiles%20accessible%20design&width=800&height=600&seq=facility-room-1-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Cozy%20single%20room%20corner%20with%20comfortable%20armchair%20small%20table%20personal%20television%20and%20storage%20cabinet%20warm%20lighting%20peaceful%20atmosphere%20for%20elderly%20residents&width=800&height=600&seq=facility-room-1-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Spacious%20single%20occupancy%20room%20with%20wardrobe%20dresser%20mirror%20and%20personal%20belongings%20area%20clean%20organized%20space%20with%20natural%20light%20from%20window%20minimalist%20style&width=800&height=600&seq=facility-room-1-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 2,
    name: '2인실',
    size: '20평',
    capacity: '2명',
    features: ['개인 침대', '공용 화장실', '냉난방 시설', '개인 수납장', '비상벨'],
    image: 'https://readdy.ai/api/search-image?query=Comfortable%20two-person%20senior%20care%20room%20with%20two%20separate%20beds%20shared%20bathroom%20individual%20storage%20spaces%20television%20and%20warm%20ambient%20lighting%20creating%20a%20friendly%20shared%20living%20environment%20with%20clean%20white%20walls&width=800&height=600&seq=facility-room-2&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Spacious%20double%20occupancy%20room%20with%20two%20comfortable%20beds%20separated%20by%20privacy%20curtain%20individual%20bedside%20tables%20and%20reading%20lamps%20clean%20white%20walls%20wooden%20floor&width=800&height=600&seq=facility-room-2-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Shared%20senior%20room%20with%20two%20personal%20storage%20cabinets%20wardrobes%20and%20seating%20area%20bright%20natural%20light%20from%20large%20windows%20comfortable%20living%20space&width=800&height=600&seq=facility-room-2-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Two-person%20room%20common%20area%20with%20small%20table%20chairs%20and%20shared%20television%20cozy%20atmosphere%20for%20roommates%20to%20socialize%20warm%20lighting%20minimalist%20design&width=800&height=600&seq=facility-room-2-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Clean%20shared%20bathroom%20for%20double%20occupancy%20room%20with%20safety%20features%20grab%20bars%20accessible%20shower%20dual%20sinks%20bright%20lighting%20white%20tiles&width=800&height=600&seq=facility-room-2-gallery-4&orientation=landscape'
    ]
  },
  {
    id: 3,
    name: '4인실',
    size: '30평',
    capacity: '4명',
    features: ['개인 침대', '공용 화장실', '냉난방 시설', '개인 수납장', '공용 TV'],
    image: 'https://readdy.ai/api/search-image?query=Spacious%20four-person%20senior%20care%20room%20with%20four%20individual%20beds%20shared%20facilities%20personal%20storage%20units%20and%20communal%20television%20area%20designed%20for%20comfortable%20group%20living%20with%20bright%20natural%20lighting%20and%20clean%20white%20walls&width=800&height=600&seq=facility-room-3&orientation=landscape',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=Large%20four-bed%20senior%20room%20with%20individual%20sleeping%20areas%20separated%20by%20privacy%20curtains%20personal%20bedside%20tables%20and%20storage%20spaces%20bright%20and%20airy%20atmosphere&width=800&height=600&seq=facility-room-3-gallery-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Four-person%20room%20storage%20area%20with%20individual%20wardrobes%20lockers%20and%20personal%20belongings%20spaces%20organized%20and%20accessible%20design%20for%20elderly%20residents&width=800&height=600&seq=facility-room-3-gallery-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Communal%20seating%20area%20in%20four-person%20room%20with%20comfortable%20chairs%20shared%20television%20and%20small%20table%20for%20socializing%20warm%20and%20welcoming%20environment&width=800&height=600&seq=facility-room-3-gallery-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=Spacious%20shared%20bathroom%20for%20four-person%20room%20with%20multiple%20sinks%20accessible%20showers%20safety%20grab%20bars%20and%20bright%20lighting%20clean%20white%20tiles%20barrier-free%20design&width=800&height=600&seq=facility-room-3-gallery-4&orientation=landscape'
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

const RoomTypes = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">객실 안내</h2>
            <p className="text-lg text-gray-600">
              어르신의 필요에 맞는 다양한 객실 타입을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedRoom(room)}
              >
                <div className="relative w-full h-64">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {room.capacity}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">면적: {room.size}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">주요 시설</h4>
                    <ul className="space-y-1">
                      {room.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 text-sm">
                          <i className="ri-check-line text-teal-500 mr-2 w-5 h-5 flex items-center justify-center"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-teal-600 font-medium">
                      <i className="ri-image-line mr-1"></i>
                      {room.galleryImages.length + 1}개 사진 보기
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
        isOpen={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        images={selectedRoom ? [selectedRoom.image, ...selectedRoom.galleryImages] : []}
        title={selectedRoom?.name || ''}
      />
    </>
  );
};

export default RoomTypes;
