export default function PreviewSection({ settings }: any) {
  return (
    <aside className="sticky top-6 space-y-4">
      <div className="rounded-md border border-gray-200 bg-white p-4">
        <p className="text-xs text-gray-500">서비스</p>
        <p className="font-semibold text-gray-900">{settings.serviceName}</p>
        <p className="mt-1 text-sm text-gray-600">{settings.serviceDesc}</p>
      </div>

      <div className="rounded-md border border-gray-200 bg-white p-4 text-sm">
        <p>☎ {settings.contactPhone}</p>
        <p>✉ {settings.contactEmail}</p>
        <p className="mt-1 text-xs text-gray-500">{settings.customerHours}</p>
      </div>

      <div className="rounded-md border-l-4 border-gray-900 bg-gray-50 p-4 text-xs">
        <p className="font-semibold text-blue-700">{settings.metaTitle}</p>
        <p className="mt-1 text-gray-700">{settings.metaDescription}</p>
      </div>
    </aside>
  );
}
