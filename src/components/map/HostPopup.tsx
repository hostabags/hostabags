import { Host } from '@/types/host';
import Image from 'next/image';

interface HostPopupProps {
  host: Host;
  onBookNow: () => void;
}

export default function HostPopup({ host, onBookNow }: HostPopupProps) {
  return (
    <div className="host-popup">
      {/* Header con imagen */}
      <div className="popup-header">
        <div className="popup-image-container">
          <Image
            src="/images/bags.jpeg"
            alt="Host bags"
            width={80}
            height={60}
            className="popup-image"
          />
        </div>
        <div className="popup-header-content">
          <h3 className="popup-title">{host.name}</h3>
          <div className="popup-location">
            <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="popup-address">{host.address}</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="popup-description">
        <div className="popup-description-header">
          <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <span className="popup-description-title">Descripción</span>
        </div>
        <p className="popup-description-text">
          {host.description || "Servicio de consigna seguro y confiable. Perfecto para viajeros que necesitan dejar sus maletas mientras exploran la ciudad."}
        </p>
      </div>

      {/* Horarios */}
      <div className="popup-schedules">
        <div className="popup-schedules-header">
          <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <span className="popup-schedules-title">Horarios</span>
        </div>
        <div className="popup-schedules-list">
          {host.schedules && host.schedules.length > 0 ? (
            host.schedules.map((schedule, index) => (
              <span key={index} className="popup-schedule-item">{schedule}</span>
            ))
          ) : (
            <span className="popup-schedule-item">Horarios flexibles</span>
          )}
        </div>
      </div>

      {/* Botón de reserva */}
      <button className="popup-book-button" onClick={onBookNow}>
        <svg className="popup-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
        Reservar ahora
      </button>
    </div>
  );
} 