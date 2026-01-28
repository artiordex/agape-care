export default function LifeRulesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Life Rules</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-bold">Rule 1</h3>
            <p className="text-gray-600">Details about rule 1.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-bold">Rule 2</h3>
            <p className="text-gray-600">Details about rule 2.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
