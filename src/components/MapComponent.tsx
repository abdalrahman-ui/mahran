
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // سيتم استبدال هذا برمز API الخاص بك
    mapboxgl.accessToken = 'يرجى إضافة مفتاح API الخاص بك';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [45.0792, 23.8859], // الموقع الافتراضي
      zoom: 9
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // تنظيف
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};
