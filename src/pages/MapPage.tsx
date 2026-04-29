
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../LanguageContext';

// Fix for default marker icon in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ZHEZQAZGAN_COORDS: [number, number] = [47.7946, 67.7055];

export default function MapPage() {
  const { t } = useLanguage();

  const LOCATIONS = [
      { id: 1, name: t.locAkimat, coords: [47.7951, 67.7126] as [number, number], type: "Official" },
      { id: 2, name: t.locUniversity, coords: [47.7892, 67.7100] as [number, number], type: "Education" },
      { id: 3, name: t.locMarket, coords: [47.7960, 67.6980] as [number, number], type: "Market" },
      { id: 4, name: t.locPalace, coords: [47.7925, 67.7050] as [number, number], type: "Culture" },
      { id: 5, name: t.locHospital, coords: [47.8020, 67.7200] as [number, number], type: "Health" }
  ];

  return (
    <div className="w-full h-[calc(100vh-180px)] rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <MapContainer center={ZHEZQAZGAN_COORDS} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {LOCATIONS.map(loc => (
          <Marker key={loc.id} position={loc.coords}>
            <Popup>
              <div className="p-1 min-w-[120px]">
                <h3 className="font-bold text-sm text-slate-800">{loc.name}</h3>
                <p className="text-[9px] uppercase font-bold text-blue-600 mt-0.5 tracking-widest">{loc.type}</p>
                <button 
                  onClick={() => window.alert(t.comingSoon)}
                  className="mt-3 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] rounded-lg font-black uppercase tracking-widest transition-colors shadow-sm"
                >
                  {t.viewDetails}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
