export default function FacilitiesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Facilities</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Facility 1</h3>
            <p className="text-gray-600">Description of facility 1.</p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Facility 2</h3>
            <p className="text-gray-600">Description of facility 2.</p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Facility 3</h3>
            <p className="text-gray-600">Description of facility 3.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
