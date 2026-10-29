import React, { useCallback, useMemo, useRef, useState } from "react";
import ClockCard from "./ClockCard.jsx";
import { TIME_ZONES } from "./timeZones.js";

export default function App() {
  const [selected, setSelected] = useState("Asia/Dubai");
  const [clocks, setClocks] = useState(() => [
    TIME_ZONES.find(z => z.id === "Asia/Kolkata"),
    TIME_ZONES.find(z => z.id === "Europe/London"),
    TIME_ZONES.find(z => z.id === "America/New_York")
  ]);
  const selectRef = useRef(null);
  const available = useMemo(() => TIME_ZONES.filter(z => !clocks.some(c => c.id === z.id)), [clocks]);

  const addClock = useCallback(() => {
    const zone = TIME_ZONES.find(z => z.id === selected);
    if (zone && !clocks.some(c => c.id === zone.id)) {
      setClocks(current => current.some(c => c.id === zone.id) ? current : [...current, zone]);
      const nextAvailable = TIME_ZONES.find(z => z.id !== zone.id && !clocks.some(c => c.id === z.id));
      if (nextAvailable) setSelected(nextAvailable.id);
    }
    window.requestAnimationFrame(() => selectRef.current?.focus());
  }, [selected, clocks]);

  const removeClock = useCallback(id => {
    setClocks(current => current.filter(z => z.id !== id));
  }, []);

  return <main className="app-shell">
    <header className="hero">
      <div className="brand-row"><div className="brand-icon">◷</div><span className="brand-name">CHRONO / WORLD CLOCK</span><span className="live-badge"><i className="live-dot"/> LIVE</span></div>
      <div className="hero-copy"><p className="eyebrow">YOUR WORLD, IN SYNC</p><h1>Everywhere, <span>right now.</span></h1>
        <p className="hero-description">Keep your important places close. Add time zones, compare local times, and stay connected across the world.</p></div>
      <section className="add-panel"><div className="add-copy"><p className="eyebrow">TIME ZONE MANAGER</p><h2>Add a clock</h2><p>Select a city to add its local time to your dashboard.</p></div>
        <div className="form-controls"><label className="sr-only" htmlFor="timezone-select">Choose a time zone</label>
          <select id="timezone-select" ref={selectRef} value={available.some(z => z.id === selected) ? selected : (available[0]?.id ?? "")} onChange={e => setSelected(e.target.value)} disabled={!available.length}>
            {available.length ? available.map(z => <option key={z.id} value={z.id}>{z.city}, {z.country}</option>) : <option value="">All clocks added</option>}
          </select>
          <button className="add-button" onClick={addClock} disabled={!available.length}>＋ Add clock</button>
        </div>
      </section>
    </header>
    <section className="dashboard-section"><div className="section-heading"><div><p className="eyebrow">YOUR DASHBOARD</p><h2>World clocks <span className="clock-count">{clocks.length}</span></h2></div><p className="update-note"><i className="live-dot"/> Updating every second</p></div>
      {clocks.length ? <div className="clock-grid">{clocks.map(zone => <ClockCard key={zone.id} zone={zone} onRemove={removeClock}/>)}</div> :
        <div className="empty-state"><div className="empty-icon">◷</div><h3>Your dashboard is clear</h3><p>Add a time zone above to start building your world clock dashboard.</p></div>}
    </section>
    <footer className="app-footer"><span>CHRONO · TIME ZONE MANAGER</span><span>Time zones powered by the browser’s IANA time-zone database</span></footer>
  </main>;
}