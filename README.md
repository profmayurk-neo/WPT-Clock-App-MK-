# React Clock App — Advanced Time Zone Manager

Assignment solution for PGCP-AC WPT (React JS and Hooks).

## Features
- Add city/time-zone clocks from a dropdown.
- All clocks update every second.
- `useRef` focuses the dropdown after adding a clock.
- Custom `useClockTick` Hook manages a one-second interval and cleans it up.
- `useCallback` stabilizes add/remove callbacks.
- `React.memo` memoizes clock cards.
- Prevents duplicate clocks and supports removing clocks.
- Responsive dashboard.
- Uses IANA time-zone IDs and `Intl.DateTimeFormat` for local times and daylight-saving rules.

## Run
Requires Node.js (Node 22 LTS is recommended in the assignment) and npm.

```bash
npm install
npm run dev
```
Open the local URL Vite prints in the terminal. To test a production build, run `npm run build`.

## Files
- `src/App.jsx`: dashboard, dropdown, add/remove logic, `useRef`, `useCallback`.
- `src/ClockCard.jsx`: memoized clock card and time formatting.
- `src/useClockTick.js`: custom clock Hook.
- `src/timeZones.js`: available IANA time zones.
- `src/styles.css`: responsive styling.

## React concepts for viva
1. `useRef`: references the dropdown DOM element and returns focus after adding a clock.
2. `useClockTick`: custom Hook that updates a Date state every 1,000 ms and clears the interval on unmount.
3. `useCallback`: preserves callback references between renders when dependencies have not changed.
4. `React.memo`: skips parent-triggered re-rendering when props are unchanged. A clock still re-renders because its own Hook state updates every second.
5. Duplicate prevention: checks existing clock IDs before adding.
6. Time zones: `Intl.DateTimeFormat` formats each clock in its IANA time zone.
