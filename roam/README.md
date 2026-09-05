# ROAM — Tourism Demand Intelligence Platform

> **Tourism's Missing Layer**: Intelligently redistributing visitor demand away from congested bottlenecks toward high-quality alternatives, local artisans, and sustainable community prosperity.

---

## 🧭 The Core Problem

Tourism demand is severely concentrated around a handful of famous attractions:
- **For Tourists**: Overcrowded monuments, 60+ minute ticket queues, surge pricing, exhaustion, and missed cultural heritage.
- **For Host Destinations**: Structural wear on ancient architecture, traffic gridlock, safety hazards, and concentrated revenue that fails to reach surrounding communities.

**ROAM is not a booking site, travel blog, or generic AI chatbot.**  
ROAM is a **demand intelligence platform** that continuously balances tourist footfall across a destination in real time.

---

## ⚡ The Three-Sided Value Proposition

1. **Tourists**: Discovers curated, serene alternatives (e.g. *Albert Hall Museum* instead of *Amber Fort*), saves travel time and ticket costs, and offers one-click **"Reroute My Day"** intelligence when crowds surge.
2. **Local Businesses**: Connects grassroots artisan studios, guild workshops, and local kitchens directly into visitor flows when popular tourist hubs bottleneck.
3. **Destination Authorities**: Provides a real-time **City Tourism Control Center** with a predictive **"What-If?" Policy Simulator** to model the impact of redistributing visitor footfall.

---

## 🚀 Quick Start & Local Execution

ROAM is 100% self-contained with **zero build steps** and **zero external npm runtime dependencies**. It runs natively in modern browsers.

### Option 1: Native Node.js Server
```bash
node server.js
```
Then navigate to: **`http://127.0.0.1:3000/`**

### Option 2: Any Static Server / Python
```bash
# Python 3
python -m http.server 3000

# or npx serve
npx serve .
```

### Option 3: Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings** ➔ **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/(root)`.
4. Click **Save**. Your ROAM platform will be live instantly!

---

## 📂 Project Architecture

```
roam/
├── index.html                   # Semantic, accessible luxury layout
├── README.md                    # Project documentation
├── server.js                    # Zero-dependency local testing server
├── css/
│   ├── variables.css            # Dark luxury tokens, typography, colors, elevation
│   ├── main.css                 # Base resets, grid layout, animations
│   ├── components.css           # Cards, pill badges, buttons, sliders, meters
│   ├── map.css                  # SVG vector map, radar pulses, demand flow vectors
│   └── modes.css                # Tourist, Business, and Authority dashboard views
└── js/
    ├── app.js                   # Application coordinator, mode routing, state store
    ├── data/
    │   └── jaipur.js            # Canonical dataset of Jaipur attractions & local businesses
    ├── engine/
    │   ├── scoring.js           # Deterministic 6-factor recommendation scoring engine
    │   ├── router.js            # Dynamic 'Reroute My Day' solver & impact calculator
    │   └── simulator.js         # Destination Authority policy simulator & city calculator
    └── components/
        ├── map.js               # Interactive SVG vector load map with particle demand flows
        ├── touristMode.js       # Trip configurator, destination health, alternative cards
        ├── businessMode.js      # Business intelligence dashboard & opportunity detector
        ├── authorityMode.js     # City tourism control center & What-If policy simulator
        ├── beforeAfter.js       # Interactive Before/After slider & impact comparison
        ├── impactCalc.js        # Dynamic city-scale impact simulator with live inputs
        └── hackathonGuide.js    # 90-second automated presentation walkthrough
```

---

## 🏆 Key Features Demonstrated

- **Destination Load Map**: Interactive SVG canvas displaying real-time monument capacity (🔴 Critical, 🟠 Elevated, 🟢 Optimal), radar pulses, and animated demand flow vectors.
- **Deterministic Recommendation Engine**: Transparent, weighted multi-factor scoring (Preference 30%, Crowd Relief 20%, Distance 15%, Quality 15%, Local Benefit 10%, Availability 10%).
- **"Reroute My Day":** Dynamically recalculates itineraries when Amber Fort surges, saving **130 min of queuing**, **₹70 in entry costs**, reducing crowd exposure by **53%**, and directly supporting **4 local artisan guilds**.
- **Local Business Intelligence**: Real-time nearby tourist activity metrics, footprint proximity tracking, and an interactive **Pulse Promotion** dispatcher.
- **City Tourism Control Center**: Live monument utilization telemetry with an interactive **What-If? Policy Simulator** for municipal authorities.
- **90-Second Hackathon Tour**: Built-in automated presentation guide for judges.

---

## 📜 License & Integrity
Built for hackathon excellence. Free to use, deploy, and distribute.
