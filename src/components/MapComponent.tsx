
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !apiKey || isMapInitialized) return;

    try {
      mapboxgl.accessToken = apiKey;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [45.0792, 23.8859],
        zoom: 9
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      setIsMapInitialized(true);
    } catch (error) {
      console.error('خطأ في تهيئة الخريطة:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        setIsMapInitialized(false);
      }
    };
  }, [apiKey, isMapInitialized]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (map.current) {
      map.current.remove();
      setIsMapInitialized(false);
    }
    const input = (e.target as HTMLFormElement).apiKey.value;
    setApiKey(input);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {!apiKey ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <form onSubmit={handleApiKeySubmit} className="p-4 glass-card rounded-lg">
            <p className="text-sm mb-2">يرجى إدخال مفتاح API الخاص بك من Mapbox:</p>
            <div className="flex gap-2">
              <input
                type="text"
                name="apiKey"
                className="px-3 py-2 border rounded-md"
                placeholder="أدخل مفتاح API"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                تأكيد
              </button>
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              يمكنك الحصول على مفتاح API من{' '}
              <a
                href="https://www.mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                موقع Mapbox
              </a>
            </p>
          </form>
        </div>
      ) : (
        <div ref={mapContainer} className="absolute inset-0" />
      )}
    </div>
  );
};
