# Architecture & Feature Flow Diagrams

## 1. Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     index.js (Entry Point)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           UnitProvider (Context)                    │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         App Component                       │  │  │
│  │  │  ┌────────────────────────────────────────┐ │  │  │
│  │  │  │  Search Section                        │ │  │  │
│  │  │  │  - Input field                        │ │  │  │
│  │  │  │  - Header with title & toggle button  │ │  │  │
│  │  │  └────────────────────────────────────────┘ │  │  │
│  │  │                                             │  │  │
│  │  │  ┌────────────────────────────────────────┐ │  │  │
│  │  │  │  Loading Section (Conditional)         │ │  │  │
│  │  │  │  - Spinner animation                  │ │  │  │
│  │  │  │  - Loading message                    │ │  │  │
│  │  │  └────────────────────────────────────────┘ │  │  │
│  │  │                                             │  │  │
│  │  │  ┌────────────────────────────────────────┐ │  │  │
│  │  │  │  Weather Display (Conditional)        │ │  │  │
│  │  │  │  - City info                         │ │  │  │
│  │  │  │  - Temperature (uses unit from ctx)  │ │  │  │
│  │  │  │  - Other weather details             │ │  │  │
│  │  │  └────────────────────────────────────────┘ │  │  │
│  │  │                                             │  │  │
│  │  │  ┌────────────────────────────────────────┐ │  │  │
│  │  │  │  Recent Searches (Conditional)        │ │  │  │
│  │  │  │  - List of clickable city buttons    │ │  │  │
│  │  │  │  - Disabled during loading           │ │  │  │
│  │  │  └────────────────────────────────────────┘ │  │  │
│  │  │                                             │  │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────┘ │
│                                                             │
│  Global Storage:                                           │
│  - unit: "C" or "F" (from Context)                        │
│  - temperatureUnit: localStorage                          │
│  - recentSearches: localStorage                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Loading State Flow

```
User Action                State Change              UI Update
─────────────────────────────────────────────────────────────

User types                  
"London" & 
presses Enter     ───→    setLoading(true)    ───→  Spinner appears
                           setError(null)           Input disabled
                                                     Recent buttons disabled
                   
                   ┌──────────────────────────┐
                   │  API Call to weatherapi  │
                   │    (Async/Await)         │
                   └──────────────────────────┘
                              │
                              ├─ Success: Data received
                              │
                   ┌──────────────────────────┐
                   │  Process Data:           │
                   │  - setWeatherData()      │
                   │  - Update recentSearches │
                   │  - setLoading(false)     │
                   └──────────────────────────┘
                              │
                   ┌──────────────────────────┐
                   │  Re-render Component     │
                   └──────────────────────────┘
                              │
                   finally:   setLoading(false)  ───→  Spinner disappears
                              (Always executes)       Input enabled
                                                     Weather info shows
```

---

## 3. Recent Searches State Management

```
SEARCH ACTION FLOW:
──────────────────

Search #1: "London"
   ├─ setRecentSearches(["London"])
   ├─ Save to localStorage
   └─ Display button list

                ↓

Search #2: "Paris"
   ├─ setRecentSearches(["Paris", "London"])
   ├─ Save to localStorage
   └─ Display button list

                ↓

Search #3: "Tokyo"
   ├─ setRecentSearches(["Tokyo", "Paris", "London"])
   ├─ Save to localStorage
   └─ Display button list

                ↓

... (continue up to 5)

                ↓

Search #6: "New York"
   ├─ Remove duplicate "London" (already exists)
   ├─ Add "New York" to front
   ├─ Slice to keep only 5: ["New York", "Tokyo", "Paris", "London"]
   ├─ Save to localStorage
   └─ Display button list

                ↓

USER CLICKS "Paris"
   ├─ Fetch weather for Paris
   ├─ Move "Paris" to front
   ├─ Result: ["Paris", "New York", "Tokyo", "London"]
   └─ Display updated list
```

---

## 4. Temperature Unit Context Flow

```
UnitContext Provider
│
├─ State: unit = "C" (from localStorage or default)
├─ Function: toggleUnit()
└─ Value: { unit, toggleUnit }

           ↓

App Component Uses: const { unit, toggleUnit } = useUnit()

           ↓

┌──────────────────────────────────────────────┐
│ Weather Info Section                         │
├──────────────────────────────────────────────┤
│                                              │
│ Current Unit: {unit}  (displays "C" or "F") │
│ Button: "Switch to °{opposite unit}"         │
│                                              │
│ Temperature Display:                         │
│ ├─ If unit === "C"                          │
│ │  └─ Show: temp_c (e.g., "15°C")          │
│ └─ If unit === "F"                          │
│    └─ Show: temp_f (e.g., "59°F")          │
│                                              │
└──────────────────────────────────────────────┘

           ↓ User clicks toggle button

toggleUnit() executes:
   ├─ Change unit: "C" → "F" or "F" → "C"
   ├─ Save to localStorage
   └─ Trigger re-render

           ↓

Component re-renders with:
   ├─ Updated unit value
   ├─ New temperature display
   ├─ New button text
   └─ All consuming components update
```

---

## 5. Data Persistence Flow

```
┌─────────────────────────────────────────────────────────┐
│           localStorage Data Persistence                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Key 1: "temperatureUnit"                             │
│  │                                                     │
│  ├─ Initial: Read from localStorage on app start      │
│  │           Fallback to "C" if not found             │
│  │                                                     │
│  ├─ Update: When toggleUnit() is called              │
│  │           Save to localStorage automatically       │
│  │                                                     │
│  └─ Access: useUnit() hook provides current value    │
│                                                         │
│  ────────────────────────────────────────────         │
│                                                         │
│  Key 2: "recentSearches"                              │
│  │                                                     │
│  ├─ Initial: Read from localStorage on app start      │
│  │           Fallback to [] if not found              │
│  │           Parse JSON to array                      │
│  │                                                     │
│  ├─ Update: useEffect triggered on state change       │
│  │           Save to localStorage as JSON string      │
│  │           Runs after every search update           │
│  │                                                     │
│  └─ Access: Directly from state                       │
│             Mapped to button list                      │
│                                                         │
│  ────────────────────────────────────────────         │
│                                                         │
│  Page Refresh Behavior:                               │
│  ├─ localStorage persists (browser data)              │
│  ├─ App reads localStorage on mount                   │
│  ├─ State initialized with persisted data             │
│  └─ User sees same preferences & searches             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Component Render Cycle

```
First Mount:
────────────
1. index.js renders
2. UnitProvider created
   └─ Initialize unit from localStorage
3. App component mounts
   └─ Initialize state from localStorage
   └─ useEffect for recentSearches sync runs
4. First render with initial state

User Search:
────────────
1. Input value changes → setState(cityName)
2. Enter key pressed → fetchData() called
3. setLoading(true) → Re-render with spinner
4. API call starts (async)
5. Response received → setState updates
6. setLoading(false) → Re-render with data
7. useEffect updates localStorage

Unit Toggle:
────────────
1. User clicks button → toggleUnit() called
2. setUnit() in context → All consumers re-render
3. App component re-renders
4. getTemperature() returns different value
5. Display updates to new unit
6. localStorage updates automatically

Recent Search Click:
────────────────────
1. User clicks city button
2. fetchData(cityName) called
3. Similar to regular search
4. Recent searches reordered
5. useEffect saves new order to localStorage
```

---

## 7. Error Handling Flow

```
API Request
    │
    ├─ Success Branch:
    │  └─ setWeatherData(data)
    │     setError(null)
    │     setRecentSearches(update)
    │     → Component shows weather info
    │
    └─ Error Branch:
       └─ catch(error)
          setError(error.message)
          setWeatherData(null)
          → Component shows error message

Error Display:
└─ {error && <div className="error">{error}</div>}
   ├─ Only renders if error is truthy
   ├─ Red styling from App.css
   └─ User sees clear error message

Error Examples:
├─ Invalid city name
│  └─ "No matching location found"
│
├─ Network error
│  └─ "Network request failed"
│
└─ API error
   └─ "API error: [status code]"

Finally Block:
└─ ALWAYS executes:
   setLoading(false)
   ├─ Ensures loading state clears
   ├─ Even if error occurred
   └─ Input and buttons re-enabled
```

---

## 8. Component State Dependencies

```
App Component State Tree:
─────────────────────────

[weatherData] ← Depends on: fetchData() result
   ├─ API call: fetchWeather(cityName)
   └─ Used by: Weather display section

[cityName] ← Depends on: Input onChange
   ├─ User types in search box
   └─ Used by: fetchData() parameter

[error] ← Depends on: fetchData() success/failure
   ├─ Set on API error
   ├─ Cleared on successful search
   └─ Used by: Error message display

[loading] ← Depends on: fetchData() lifecycle
   ├─ Set true at start
   ├─ Set false when done (finally block)
   └─ Used by: Spinner, input disabled

[recentSearches] ← Depends on: fetchData() success
   ├─ Updated after each successful search
   ├─ Synced to localStorage in useEffect
   └─ Used by: Recent searches button list

[unit] ← From Context, Depends on: UnitContext
   ├─ Initial: localStorage "temperatureUnit"
   ├─ Updated: toggleUnit() call
   ├─ Synced: To localStorage in useCallback
   └─ Used by: getTemperature() function
```

---

## 9. Key Interactions Matrix

```
┌───────────────┬────────────────┬──────────────┬──────────────┐
│   Action      │   State Change │  UI Update   │  Storage     │
├───────────────┼────────────────┼──────────────┼──────────────┤
│ Search City   │ loading=T      │ Spinner show │ -            │
│               │ weatherData=X  │ Data display │ recentSearch │
│               │ loading=F      │ Spinner hide │ updated      │
├───────────────┼────────────────┼──────────────┼──────────────┤
│ Click Recent  │ loading=T      │ Spinner show │ -            │
│               │ weatherData=X  │ Data display │ order change │
│               │ loading=F      │ Spinner hide │ saved        │
├───────────────┼────────────────┼──────────────┼──────────────┤
│ Toggle Unit   │ unit=opposite  │ Temp display │ temperature  │
│               │                │ Button text  │ Unit updated │
├───────────────┼────────────────┼──────────────┼──────────────┤
│ Page Refresh  │ Init from      │ All previous │ Read from    │
│               │ localStorage   │ Searches &   │ localStorage │
│               │                │ Unit shown   │              │
└───────────────┴────────────────┴──────────────┴──────────────┘
```

---

## 10. File Dependencies

```
index.js
  │
  ├─ App.js (imports)
  │  ├─ UnitContext (custom hook)
  │  │  └─ src/context/UnitContext.js
  │  ├─ fetchWeather (API function)
  │  │  └─ src/api/fetchWeather.js
  │  └─ App.css (styles)
  │     └─ src/App.css
  │
  └─ UnitProvider (context)
     └─ src/context/UnitContext.js
        └─ React.createContext

UnitContext.js
  └─ Exports:
     ├─ UnitContext (context object)
     ├─ UnitProvider (component)
     └─ useUnit (custom hook)

App.js
  └─ Uses:
     ├─ useState (React)
     ├─ useEffect (React)
     ├─ useUnit (custom hook)
     ├─ fetchWeather (API function)
     └─ App.css (styles)

fetchWeather.js
  └─ Uses:
     ├─ axios (HTTP client)
     └─ weatherapi.com (external API)
```

---

## 11. Responsive Breakpoints

```
Desktop (> 1024px)
│
├─ Max width: 600px container
├─ Layout: Vertical stack
├─ Font sizes: Regular
└─ Hover effects: Full support

         ↓

Tablet (600px - 1024px)
│
├─ Full width with padding
├─ Layout: Vertical stack
├─ Font sizes: Adjusted
└─ Touch optimized

         ↓

Mobile (< 600px)
│
├─ Media query triggers
├─ Header: Flex column layout
├─ Font sizes: Smaller
├─ Spacing: Compact
└─ Touch targets: Larger
```

---

## 12. Performance Optimization

```
Optimization Techniques Used:
─────────────────────────────

1. useCallback for toggleUnit
   └─ Prevents unnecessary function recreations
      └─ Improves Context consumer re-renders

2. localStorage in useEffect
   └─ Batches updates together
      └─ Reduces unnecessary writes

3. Array operations (filter, slice)
   └─ Limits recent searches to 5
      └─ Prevents memory bloat

4. Conditional rendering
   └─ Only renders when needed
      └─ Reduces DOM operations

5. CSS animations with transform
   └─ GPU accelerated
      └─ Smooth 60fps animations

6. Finally block for loading state
   └─ Ensures cleanup
      └─ Prevents hung loading state
```

---

**Version**: 1.0  
**Last Updated**: January 21, 2026  
**Diagrams**: Complete Reference
