/* 
AgroGuide - Single-file React prototype (Tailwind)
--------------------------------------------------
Run instructions (web):

1️⃣  Create a new React project:
     npx create-react-app agro-proto
     cd agro-proto

2️⃣  Add Tailwind via CDN (quick method):
     Open public/index.html and add this inside <head>:
     <script src="https://cdn.tailwindcss.com"></script>

3️⃣  Replace src/App.js (or App.jsx) with this file content.

4️⃣  npm start
--------------------------------------------------
Modules simulated:
- HarvestHub (Crop recommendation + layout)
- FarmShare (Khazana Sabja)
- Rent Equipment
- Rozana Wages
- Harvest Plan Summary

All AI-like recommendations are transparent, rule-based logic.
--------------------------------------------------
*/

import React, { useState } from "react";

// Mock datasets
const mockFarms = [
  { id: 1, crop: "Groundnut", farm: "XYZ Farm", dist: "1.2km", slots: 10 },
  { id: 2, crop: "Rice", farm: "PQR Farm", dist: "2.5km", slots: 5 },
  { id: 3, crop: "Wheat", farm: "ABC Farm", dist: "3.1km", slots: 8 },
];

const mockEquipment = [
  {
    id: 1,
    name: "Tractor",
    price: 500,
    owner: "PQR",
    phone: "9840*****0",
    address: "Poondurai, Erode",
  },
  {
    id: 2,
    name: "Rotavator",
    price: 300,
    owner: "LMN",
    phone: "98*******1",
    address: "Salem",
  },
];

const mockWorkers = [
  { id: 1, place: "XYZ Farm", wage: 450, slots: 10 },
  { id: 2, place: "ABC Farm", wage: 410, slots: 15 },
];

// Simulated "AI" recommendation logic (transparent rule-based)
function aiRecommendCrop(soil, weather) {
  if (soil === "loamy" && weather === "dry")
    return { crop: "Corn", reason: "Good profit potential & weather suitable" };
  if (soil === "clay")
    return { crop: "Rice", reason: "Retains water well" };
  return { crop: "Mixed Vegetables", reason: "Safe diversified choice" };
}

export default function AgroGuidePrototype() {
  const [screen, setScreen] = useState("home");
  const [search, setSearch] = useState("");
  const [soil, setSoil] = useState("loamy");
  const [weather, setWeather] = useState("dry");
  const [selectedCrop, setSelectedCrop] = useState(null);

  const rec = aiRecommendCrop(soil, weather);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4">
      <Header onNav={setScreen} active={screen} />

      <main className="mt-4 max-w-md mx-auto">
        {/* 🌾 Harvesthub */}
        {screen === "home" && (
          <div>
            <section className="p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-bold">Harvesthub</h2>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Fertility</p>
                    <p className="text-sm text-gray-600">
                      Suitable for most crops
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    High
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">Crop Recommendations</h3>
                <div className="mt-2 p-3 bg-gray-50 rounded">
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">🌽</span> Consider planting:{" "}
                    <strong className="ml-2">{rec.crop}</strong>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                  <button
                    onClick={() => setSelectedCrop(rec.crop)}
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Plan Crop Layout
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-4 p-4 bg-white rounded-xl shadow">
              <h3 className="font-semibold">Field Division</h3>
              <div className="mt-3 p-4 bg-white rounded-lg border text-center">
                <div className="h-28 bg-gradient-to-r from-green-400 via-yellow-300 to-green-400 rounded" />
                <p className="text-sm text-gray-600 mt-2">
                  Divide land into three sections
                </p>
              </div>
            </section>
          </div>
        )}

        {/* 🧑‍🌾 Khazana Sabja / Farmshare */}
        {screen === "farmshare" && (
          <div>
            <h2 className="text-xl font-bold">Khazana Sabja (Nearby Farmers)</h2>
            <div className="mt-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search crops or farms"
                className="w-full p-3 rounded-lg border bg-white"
              />
              <div className="mt-4 space-y-3">
                {mockFarms
                  .filter(
                    (f) =>
                      f.crop.toLowerCase().includes(search.toLowerCase()) ||
                      f.farm.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center bg-white rounded-xl p-3 shadow"
                    >
                      <div className="w-20 h-16 bg-green-100 rounded-lg mr-3 flex items-center justify-center">
                        IMG
                      </div>
                      <div className="flex-1 text-sm">
                        <p>
                          <strong>Crop :</strong> {f.crop}
                        </p>
                        <p>
                          <strong>Farm :</strong> {f.farm}
                        </p>
                        <p className="text-xs text-gray-600">{f.dist} away</p>
                      </div>
                      <button
                        className="px-3 py-1 bg-emerald-700 text-white rounded"
                        onClick={() => alert("Booked " + f.farm)}
                      >
                        Book
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 🚜 Rent Equipment */}
        {screen === "rent" && (
          <div>
            <h2 className="text-xl font-bold">Rent Equipment</h2>
            <div className="mt-4 space-y-4">
              {mockEquipment.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-white p-3 rounded-xl shadow flex items-center"
                >
                  <div className="w-28 h-20 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                    IMG
                  </div>
                  <div>
                    <p className="font-semibold">{eq.name}</p>
                    <p className="text-sm">₹{eq.price}/day</p>
                    <p className="text-sm">Owner: {eq.owner}</p>
                    <p className="text-xs text-gray-600">{eq.address}</p>
                  </div>
                  <button
                    className="ml-auto px-4 py-2 bg-green-600 text-white rounded"
                    onClick={() => alert("Request sent to " + eq.owner)}
                  >
                    Rent
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 💰 Rozana Wages */}
        {screen === "wages" && (
          <div>
            <h2 className="text-xl font-bold">Rozana Wages</h2>
            <div className="mt-4 space-y-4">
              {mockWorkers.map((w) => (
                <div key={w.id} className="bg-white p-3 rounded-xl shadow">
                  <div className="rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-36 flex items-center justify-center">
                      IMG
                    </div>
                    <div className="p-3">
                      <p className="font-semibold">{w.place}</p>
                      <p>WAGES - {w.wage} INR Per day</p>
                      <p>Remaining slots - {w.slots}</p>
                      <button
                        className="mt-2 px-3 py-1 bg-green-700 text-white rounded"
                        onClick={() => alert("Registered for " + w.place)}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 📊 Harvest Summary */}
        {screen === "harvest" && (
          <div>
            <h2 className="text-xl font-bold">Harvest Tools / Summary</h2>
            <div className="mt-3 bg-white p-4 rounded-xl shadow">
              <p className="font-medium">
                Selected crop: {selectedCrop || "None"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Use this page to export a planting plan or share with local
                buyers.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-2 bg-white border rounded">
                  Export PDF
                </button>
                <button className="px-3 py-2 bg-green-600 text-white rounded">
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <FooterNav active={screen} onNav={setScreen} />
    </div>
  );
}

// Header Component
function Header({ onNav, active }) {
  return (
    <header className="flex items-center justify-between max-w-md mx-auto">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded bg-white shadow"
          onClick={() => alert("menu")}
        >
          ☰
        </button>
        <div>
          <div className="font-bold text-lg text-green-700">AgroGuide</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <nav className="hidden sm:flex gap-4">
          <button
            className={`font-medium ${
              active === "home" ? "underline" : ""
            }`}
            onClick={() => onNav("home")}
          >
            Harvesthub
          </button>
          <button
            className={`font-medium ${
              active === "farmshare" ? "underline" : ""
            }`}
            onClick={() => onNav("farmshare")}
          >
            Farmshare
          </button>
        </nav>
        <button className="w-10 h-10 rounded-full bg-green-100">👨‍🌾</button>
      </div>
    </header>
  );
}

// Footer Navigation
function FooterNav({ active, onNav }) {
  return (
    <nav className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4">
      <div className="bg-white p-3 rounded-full shadow flex justify-between">
        <button
          onClick={() => onNav("home")}
          className={`px-3 ${active === "home" ? "text-green-700" : ""}`}
        >
          Home
        </button>
        <button
          onClick={() => onNav("farmshare")}
          className={`px-3 ${active === "farmshare" ? "text-green-700" : ""}`}
        >
          Farmshare
        </button>
        <button
          onClick={() => onNav("rent")}
          className={`px-3 ${active === "rent" ? "text-green-700" : ""}`}
        >
          Rent
        </button>
        <button
          onClick={() => onNav("wages")}
          className={`px-3 ${active === "wages" ? "text-green-700" : ""}`}
        >
          Wages
        </button>
        <button
          onClick={() => onNav("harvest")}
          className={`px-3 ${active === "harvest" ? "text-green-700" : ""}`}
        >
          Plan
        </button>
      </div>
    </nav>
  );
}
