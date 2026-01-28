'use client';

import LocationInfoBox from './LocationInfoBox';
import LocationMap from './LocationMap';

export default function LocationPage() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <LocationMap />
          <LocationInfoBox />
        </div>
      </div>
    </section>
  );
}
