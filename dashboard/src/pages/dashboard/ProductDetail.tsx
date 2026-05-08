import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  ArrowLeft, Package, Shield, Hexagon, QrCode, Brain, MapPin,
  CheckCircle, XCircle, AlertTriangle, ExternalLink, Copy, Clock, Thermometer, Droplets
} from 'lucide-react';
import { products } from '../../data/mockData';
import { useState } from 'react';

// Custom marker icons
const createIcon = (emoji: string, glow: boolean = false) => L.divIcon({
  html: `<div style="font-size:22px;text-align:center;line-height:36px;width:36px;height:36px;border-radius:10px;background:${glow ? 'rgba(0,255,136,0.15)' : 'rgba(12,18,32,0.9)'};border:1px solid ${glow ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.1)'};${glow ? 'box-shadow:0 0 20px rgba(0,255,136,0.4);' : ''}">${emoji}</div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const stageIcons: Record<string, string> = {
  Created: '🌱',
  Distribution: '🚚',
  Retail: '🏪',
  Consumer: '👤',
};

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  if (positions.length > 0) {
    const bounds = L.latLngBounds(positions.map(p => [p[0], p[1]]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'info' | 'blockchain' | 'qr' | 'ai'>('info');

  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const positions = product.journey.map(j => j.location);
  const lastEvent = product.journey[product.journey.length - 1];
  const hasFraud = product.ai_verification.anomaly_confidence > 0.5;

  const tabs = [
    { id: 'info' as const, label: 'Product Info', icon: Package },
    { id: 'blockchain' as const, label: 'Blockchain', icon: Hexagon },
    { id: 'qr' as const, label: 'QR History', icon: QrCode },
    { id: 'ai' as const, label: 'AI Verification', icon: Brain },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
      {/* Back + Header */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard/products" className="p-2 rounded-lg bg-navy-800/60 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
          <ArrowLeft size={16} className="text-gray-400" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{product.name}</h1>
            {product.status === 'recalled' && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent-red/20 text-accent-red border border-accent-red/30 animate-pulse">
                RECALLED
              </span>
            )}
            {hasFraud && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent-amber/20 text-accent-amber border border-accent-amber/30">
                FLAGGED
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{product.batch_id} • {product.id}</p>
        </div>
      </div>

      {/* MAP — KILLER FEATURE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`glass-panel overflow-hidden ${hasFraud ? 'border-accent-red/30 glow-red' : ''}`}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <MapPin size={14} className="text-accent-green" />
            Product Journey Map
          </h3>
          <div className="flex items-center gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-green" /> Current</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-accent-green" /> Route</span>
            {hasFraud && <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-accent-red" /> Fraud</span>}
          </div>
        </div>
        <div className="h-[350px] relative">
          <MapContainer center={[20.5, 78.9]} zoom={5} className="h-full w-full" zoomControl={false} attributionControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FitBounds positions={positions} />

            {/* Route polyline */}
            <Polyline
              positions={positions}
              pathOptions={{
                color: hasFraud ? '#EF4444' : '#00FF88',
                weight: 3,
                opacity: 0.7,
                dashArray: hasFraud ? '8 8' : undefined,
              }}
            />

            {/* Stage markers */}
            {product.journey.map((evt, idx) => {
              const isLast = idx === product.journey.length - 1;
              return (
                <Marker
                  key={idx}
                  position={evt.location}
                  icon={createIcon(stageIcons[evt.stage] || '📍', isLast)}
                >
                  <Popup>
                    <div className="text-navy-950 min-w-[180px]">
                      <p className="font-bold text-sm">{evt.stage} Stage</p>
                      <hr className="my-1.5 border-gray-200" />
                      <p className="text-xs"><strong>Updated by:</strong> {evt.updated_by}</p>
                      <p className="text-xs"><strong>Time:</strong> {evt.timestamp}</p>
                      <p className="text-xs"><strong>Location:</strong> {evt.location[0].toFixed(4)}, {evt.location[1].toFixed(4)}</p>
                      {evt.temperature && <p className="text-xs"><strong>Temperature:</strong> {evt.temperature}°C</p>}
                      {evt.humidity && <p className="text-xs"><strong>Humidity:</strong> {evt.humidity}%</p>}
                      {evt.trust_score && <p className="text-xs"><strong>Trust Score:</strong> {evt.trust_score}</p>}
                      {isLast && <p className="text-xs mt-1 text-green-600 font-semibold">📍 Current Position</p>}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Fraud overlay */}
          {hasFraud && (
            <div className="absolute top-3 left-3 z-[1000] bg-accent-red/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
              <AlertTriangle size={14} />
              <span className="text-xs font-bold">Fraud Detected — Route Anomaly</span>
            </div>
          )}
        </div>

        {/* Journey timeline */}
        <div className="px-5 py-3 border-t border-white/[0.06] flex gap-4 overflow-x-auto">
          {product.journey.map((evt, idx) => (
            <div key={idx} className="flex items-center gap-2 min-w-fit">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${idx === product.journey.length - 1 ? 'bg-accent-green/15 ring-1 ring-accent-green/30' : 'bg-navy-600/40'}`}>
                {stageIcons[evt.stage] || '📍'}
              </div>
              <div>
                <p className="text-[11px] font-medium">{evt.stage}</p>
                <p className="text-[10px] text-gray-500">{evt.timestamp}</p>
              </div>
              {idx < product.journey.length - 1 && (
                <div className={`w-8 h-[1px] mx-1 ${hasFraud ? 'bg-accent-red' : 'bg-accent-green/30'}`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-navy-800/40 rounded-xl p-1 border border-white/[0.04]">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === t.id ? 'bg-navy-600/60 text-white border border-white/[0.08]' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
        {activeTab === 'info' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Product Name', value: product.name },
              { label: 'Batch ID', value: product.batch_id },
              { label: 'Origin Farmer', value: product.origin_farmer },
              { label: 'Category', value: product.category },
              { label: 'Created', value: product.created_date },
              { label: 'Current Stage', value: product.current_stage },
              { label: 'Trust Score', value: `${product.trust_score}/100` },
              { label: 'Status', value: product.status.toUpperCase() },
              { label: 'Product ID', value: product.id },
            ].map(f => (
              <div key={f.label} className="p-3 rounded-xl bg-navy-950/40 border border-white/[0.04]">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{f.label}</p>
                <p className="text-sm font-medium">{f.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div className="space-y-4">
            {[
              { label: 'Transaction Hash', value: product.tx_hash, link: `https://polygonscan.com/tx/${product.tx_hash}` },
              { label: 'Block Number', value: product.block_number.toLocaleString() },
              { label: 'IPFS Hash', value: product.ipfs_hash },
              { label: 'Network', value: 'Polygon Mainnet' },
            ].map(f => (
              <div key={f.label} className="flex items-center justify-between p-3 rounded-xl bg-navy-950/40 border border-white/[0.04]">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{f.label}</p>
                  <p className="text-xs font-mono text-gray-300">{f.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                    <Copy size={12} />
                  </button>
                  {f.link && (
                    <a href={f.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-white/5 text-gray-500 hover:text-accent-green transition-colors">
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-2 p-3 rounded-xl bg-accent-green/[0.04] border border-accent-green/10 flex items-center gap-2">
              <Shield size={14} className="text-accent-green" />
              <span className="text-xs text-accent-green font-medium">Blockchain verification: Confirmed ✓</span>
            </div>
          </div>
        )}

        {activeTab === 'qr' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 mb-3">Dynamic Cloneable QR (DCQR) — rotates hash on every scan to prevent duplication.</p>
            {product.qr_history.map((qr, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${qr.active ? 'bg-accent-green/[0.04] border-accent-green/20' : 'bg-navy-950/40 border-white/[0.04]'}`}>
                <div className="flex items-center gap-3">
                  <QrCode size={16} className={qr.active ? 'text-accent-green' : 'text-gray-500'} />
                  <div>
                    <p className="text-xs font-mono">{qr.hash}</p>
                    <p className="text-[10px] text-gray-500">{qr.created}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${qr.active ? 'bg-accent-green/10 text-accent-green' : 'bg-gray-800 text-gray-500'}`}>
                  {qr.active ? 'ACTIVE' : 'ROTATED'}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'GPS Valid', ok: product.ai_verification.gps_valid },
                { label: 'Temperature Safe', ok: product.ai_verification.temperature_safe },
                { label: 'Image Verified', ok: product.ai_verification.image_verified },
              ].map(v => (
                <div key={v.label} className={`p-3 rounded-xl border flex items-center gap-2 ${v.ok ? 'bg-accent-green/[0.04] border-accent-green/10' : 'bg-accent-red/[0.04] border-accent-red/10'}`}>
                  {v.ok ? <CheckCircle size={14} className="text-accent-green" /> : <XCircle size={14} className="text-accent-red" />}
                  <span className="text-xs font-medium">{v.label}</span>
                </div>
              ))}
              <div className="p-3 rounded-xl border border-white/[0.06] bg-navy-950/40">
                <p className="text-[10px] text-gray-500 mb-0.5">Anomaly Confidence</p>
                <p className={`text-lg font-bold font-mono ${product.ai_verification.anomaly_confidence > 0.5 ? 'text-accent-red' : 'text-accent-green'}`}>
                  {(product.ai_verification.anomaly_confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            {product.ai_verification.anomaly_message && (
              <div className="p-4 rounded-xl bg-accent-red/[0.06] border border-accent-red/20 flex items-start gap-3">
                <AlertTriangle size={16} className="text-accent-red mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-accent-red mb-1">Anomaly Detected</p>
                  <p className="text-xs text-gray-400">{product.ai_verification.anomaly_message}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
