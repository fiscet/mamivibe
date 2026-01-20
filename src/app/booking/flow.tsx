'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, addMinutes, parse, isBefore } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { hu } from 'date-fns/locale';
import { getAvailability, getSlotsForDate } from './actions';
import { BookingForm } from './booking-form';
import 'react-day-picker/dist/style.css';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaArrowLeft, FaLaptop, FaUserFriends, FaClipboardList } from 'react-icons/fa';

type BookingFlowProps = {
  services: any[];
  preselectedServiceId?: string;
};

type Step = 'calendar' | 'service' | 'mode' | 'slots' | 'form';

export default function BookingFlow({ services, preselectedServiceId }: BookingFlowProps) {
  const [step, setStep] = useState<Step>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]); // Raw slots from backend
  const [validSlots, setValidSlots] = useState<string[]>([]); // Filtered slots based on duration
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // New State for Refactor
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(preselectedServiceId);
  const [meetingType, setMeetingType] = useState<'online' | 'in-person' | null>(null);

  const selectedService = services.find(s => s._id === selectedServiceId);

  // Fetch monthly availability when month changes (or on mount)
  const handleMonthChange = async (month: Date) => {
    setLoading(true);
    const start = format(startOfMonth(month), 'yyyy-MM-dd');
    const end = format(endOfMonth(month), 'yyyy-MM-dd');
    try {
      const data = await getAvailability(start, end);
      setAvailableDays(data.map((d: any) => d.date));
    } catch (error) {
      console.error("Failed to fetch availability", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    handleMonthChange(new Date());
  }, []);

  // Recalculate valid slots whenever relevant state changes
  useEffect(() => {
    if (step === 'slots' && availableSlots.length > 0 && selectedService) {
      filterSlots(availableSlots, selectedService.duration);
    }
  }, [step, availableSlots, selectedService]);

  const filterSlots = (slots: string[], duration: number) => {
    // Assuming slots are every 30 mins (08:00, 08:30, etc.)
    // We need to find start times where enough consecutive slots exist to cover duration.
    // Logic: 
    // 1. Convert all slots to Date objects for easier math
    // 2. For each slot, check if (slot + duration) <= any subsequent slot end? 
    //    Simplification: Check if we have consecutive 30-min blocks.
    //    Duration is in minutes. 60 mins needed = 2 slots. 90 mins = 3 slots.

    const slotsNeeded = Math.ceil(duration / 30);
    const validStartTimes: string[] = [];

    // Sort slots just in case
    const sortedSlots = [...slots].sort();

    for (let i = 0; i < sortedSlots.length; i++) {
      const startSlot = sortedSlots[i];
      // Check if we have enough subsequent slots
      // Limit check: if i + slotsNeeded > length, we can't fit
      if (i + slotsNeeded > sortedSlots.length) continue;

      // Check continuity
      let isContinuous = true;
      // We checking if the sequence [i, i+1, ... i+slotsNeeded-1] exists and is consecutive?
      // Actually, 'availableTimes' form Sanity might be ["08:00", "08:30", "10:00"]. 
      // 08:00 is valid for 60m if 08:30 exists.
      // 08:30 is valid for 60m if 09:00 exists. (Wait, 09:00 not in list -> invalid)

      let currentBase = parse(startSlot, 'HH:mm', new Date());

      for (let j = 1; j < slotsNeeded; j++) {
        const expectedNext = addMinutes(currentBase, 30);
        const expectedNextStr = format(expectedNext, 'HH:mm');

        if (!sortedSlots.includes(expectedNextStr)) {
          isContinuous = false;
          break;
        }
        currentBase = expectedNext;
      }

      if (isContinuous) {
        validStartTimes.push(startSlot);
      }
    }
    setValidSlots(validStartTimes);
  };


  const handleDayClick = async (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    if (!availableDays.includes(dateStr)) return;

    setSelectedDate(day);
    setLoading(true);

    try {
      const data = await getSlotsForDate(dateStr);
      if (data && data.availableTimes) {
        setAvailableSlots(data.availableTimes);
        // Move to next step based on what's missing
        if (!selectedServiceId) {
          setStep('service');
        } else {
          setStep('mode');
        }
      }
    } catch (error) {
      console.error("Error fetching slots", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id);
    setStep('mode');
  };

  const handleModeSelect = (type: 'online' | 'in-person') => {
    setMeetingType(type);
    setStep('slots');
  };

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
    setStep('form');
  };

  const goBack = () => {
    if (step === 'form') setStep('slots');
    else if (step === 'slots') setStep('mode');
    else if (step === 'mode') setStep('service'); // Or calendar if service was preselected? Let's just go 'service' to allow change
    else if (step === 'service') setStep('calendar');
  };

  const modifiers = {
    available: (date: Date) => availableDays.includes(format(date, 'yyyy-MM-dd'))
  };

  const modifiersStyles = {
    available: {
      color: 'green',
      fontWeight: 'bold',
      backgroundColor: '#f0fdf4'
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header / Progress */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        {step !== 'calendar' && (
          <button onClick={goBack} className="text-gray-500 hover:text-pink-600 flex items-center gap-2 text-sm font-medium transition-colors">
            <FaArrowLeft /> Vissza
          </button>
        )}
        <div className="flex gap-2">
          {['calendar', 'service', 'mode', 'slots', 'form'].map((s) => (
            <div key={s} className={`w-2.5 h-2.5 rounded-full transition-colors ${
              // Simple progress logic
              ['calendar', 'service', 'mode', 'slots', 'form'].indexOf(step) >= ['calendar', 'service', 'mode', 'slots', 'form'].indexOf(s)
                ? 'bg-pink-500'
                : 'bg-pink-200'
              }`}></div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 min-h-[400px]">
        {step === 'calendar' && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaCalendarAlt className="text-pink-500" /> Válassz napot
            </h3>
            <style>{`
                    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
                        background-color: #ec4899; 
                    }
                    .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                        background-color: #fce7f3;
                    }
                `}</style>
            <div className="border rounded-xl p-4 shadow-sm bg-white">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onDayClick={handleDayClick}
                onMonthChange={handleMonthChange}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                disabled={(date) => !availableDays.includes(format(date, 'yyyy-MM-dd')) || isBefore(date, new Date())}
                locale={hu}
              />
            </div>
            {loading && <p className="mt-4 text-gray-400 text-sm animate-pulse">Betöltés...</p>}
            <p className="mt-4 text-xs text-gray-400">Csak a zölddel jelölt napokon van elérhető időpont.</p>
          </div>
        )}

        {step === 'service' && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaClipboardList className="text-pink-500" /> Válassz szolgáltatást
            </h3>
            {services.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Jelenleg nincs elérhető szolgáltatás.</p>
              </div>
            ) : (
              <div className="w-full space-y-3">
                {services.map(s => (
                  <button
                    key={s._id}
                    onClick={() => handleServiceSelect(s._id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${selectedServiceId === s._id ? 'border-pink-500 bg-pink-50' : 'border-gray-100 hover:border-pink-300'}`}
                  >
                    <div>
                      <h4 className="font-bold text-gray-900">{s.title}</h4>
                      <p className="text-sm text-gray-500">{s.duration} perc</p>
                    </div>
                    <span className="font-bold text-pink-600">{s.price} Ft</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 'mode' && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              Válassz konzultációs módot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <button
                onClick={() => handleModeSelect('online')}
                className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-pink-500 hover:bg-pink-50 transition-all gap-3 group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-white group-hover:text-pink-500 transition-colors">
                  <FaLaptop size={32} />
                </div>
                <span className="font-bold text-gray-900">Online</span>
                <span className="text-xs text-gray-500 text-center">Videochaten keresztül</span>
              </button>

              <button
                onClick={() => handleModeSelect('in-person')}
                className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-pink-500 hover:bg-pink-50 transition-all gap-3 group"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-white group-hover:text-pink-500 transition-colors">
                  <FaUserFriends size={32} />
                </div>
                <span className="font-bold text-gray-900">Személyesen</span>
                <span className="text-xs text-gray-500 text-center">A rendelőben</span>
              </button>
            </div>
          </div>
        )}

        {step === 'slots' && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FaClock className="text-pink-500" /> Válassz időpontot
            </h3>
            <p className="text-gray-500 mb-2">{selectedDate && format(selectedDate, 'yyyy. MMMM d.', { locale: hu })}</p>
            <p className="text-sm text-pink-600 mb-8 font-medium">
              {selectedService?.title} ({selectedService?.duration} perc)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-sm">
              {validSlots.length > 0 ? validSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleSlotSelect(time)}
                  className="py-3 px-4 rounded-xl border border-gray-200 hover:border-pink-500 hover:bg-pink-50 text-gray-700 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {time}
                </button>
              )) : (
                <div className="col-span-full text-center py-4">
                  <p className="text-gray-500 mb-2">Sajnos nincs elég hosszú szabad időszak ezen a napon ehhez a szolgáltatáshoz.</p>
                  <button onClick={() => setStep('calendar')} className="text-pink-600 font-medium hover:underline">Válassz másik napot</button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'form' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-pink-50 p-4 rounded-xl mb-6 border border-pink-100 text-sm space-y-2">
              <p><strong className="text-gray-900">Szolgáltatás:</strong> {selectedService?.title}</p>
              <p><strong className="text-gray-900">Időpont:</strong> {selectedDate && format(selectedDate, 'yyyy. MMMM d.', { locale: hu })} - {selectedSlot}</p>
              <p><strong className="text-gray-900">Helyszín:</strong> {meetingType === 'online' ? 'Online' : 'Személyesen'}</p>
            </div>

            <BookingForm
              services={services}
              preselectedServiceId={selectedServiceId}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              meetingType={meetingType}
            />
          </div>
        )}
      </div>
    </div>
  );
}
