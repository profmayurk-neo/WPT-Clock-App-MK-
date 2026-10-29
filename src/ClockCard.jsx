import React, { memo, useMemo } from "react";
import { useClockTick } from "./useClockTick.js";

function ClockCard({ zone, onRemove }) {
  const now = useClockTick();
  const timeFormat = useMemo(() => new Intl.DateTimeFormat("en-GB", {
    timeZone: zone.id, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }), [zone.id]);
  const dateFormat = useMemo(() => new Intl.DateTimeFormat("en-US", {
    timeZone: zone.id, weekday: "long", day: "2-digit", month: "short", year: "numeric"
  }), [zone.id]);
  const offsetFormat = useMemo(() => new Intl.DateTimeFormat("en-US", {
    timeZone: zone.id, timeZoneName: "short"
  }), [zone.id]);
  const offset = offsetFormat.formatToParts(now).find(p => p.type === "timeZoneName")?.value ?? zone.id;
  return <article className="clock-card">
    <div className="card-topline"><div className="location-mark">◷</div>
      <button className="remove-button" onClick={() => onRemove(zone.id)} aria-label={`Remove ${zone.city} clock`} title={`Remove ${zone.city}`}>×</button>
    </div>
    <p className="region-label">{zone.region} · {zone.country}</p>
    <h2>{zone.city}</h2><p className="zone-id">{zone.id}</p>
    <div className="clock-time">{timeFormat.format(now)}</div>
    <div className="card-bottom"><span>{dateFormat.format(now)}</span><span className="offset-pill">{offset}</span></div>
  </article>;
}
// Memoization prevents parent-driven re-renders when props remain stable.
// The card still updates each second from its own useClockTick state.
export default memo(ClockCard);