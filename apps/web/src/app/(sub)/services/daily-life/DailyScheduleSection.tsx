export default function DailyScheduleSection() {
  const schedule = [
    { time: '07:00 - 09:00', activity: 'Breakfast & Morning Care' },
    { time: '09:00 - 11:30', activity: 'Physical Therapy & Activities', highlight: true },
    { time: '11:30 - 13:30', activity: 'Lunch & Rest' },
    { time: '13:30 - 17:00', activity: 'Recreational Programs & Snacks', highlight: true },
    { time: '17:00 - 18:30', activity: 'Dinner' },
    { time: '18:30 - 21:00', activity: 'Evening Care & Bedtime' },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Daily Schedule</h2>

        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="space-y-6">
              {schedule.map(slot => (
                <div
                  key={slot.time}
                  className={`flex items-center gap-6 rounded-xl p-4 transition-colors ${
                    slot.highlight ? 'bg-primary/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-primary w-32 flex-shrink-0 font-semibold">{slot.time}</div>
                  <div className="flex-grow text-lg font-medium text-gray-700">{slot.activity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
