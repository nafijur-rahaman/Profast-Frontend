import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import locationsData from "../../assets/warehouses.json";

import "leaflet/dist/leaflet.css";


// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Move map to a location
const MapMover = ({ location }) => {
  const map = useMap();
  if (location) {
    map.setView([location.latitude, location.longitude], 12, {
      animate: true,
    });
  }
  return null;
};

const BangladeshMap = () => {
  const [filteredLocations, setFilteredLocations] = useState(locationsData);
  const [highlighted, setHighlighted] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const regions = [...new Set(locationsData.map((loc) => loc.region))];
  const districts = [...new Set(locationsData.map((loc) => loc.district))];

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setFilteredLocations(
      region === "all"
        ? locationsData
        : locationsData.filter((loc) => loc.region === region)
    );
    setHighlighted(null);
    setSearchValue("");
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFilteredLocations(
      district === "all"
        ? locationsData
        : locationsData.filter((loc) => loc.district === district)
    );
    setHighlighted(null);
    setSearchValue("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    const found = filteredLocations.find(
      (loc) =>
        loc.city.toLowerCase().includes(search) ||
        loc.region.toLowerCase().includes(search) ||
        loc.district.toLowerCase().includes(search)
    );
    if (found) {
      setHighlighted(found);
    } else {
      alert("Location not found in Bangladesh!");
      setHighlighted(null);
    }
  };

  // Bangladesh bounds (approx)
  const bangladeshBounds = [
    [20.7433, 88.01], // SW corner
    [26.63, 92.67], // NE corner
  ];

  const defaultCenter = [23.8103, 90.4125]; // Dhaka

  return (
    <div className="p-4 max-w-screen-xl  mx-auto">
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4  mb-4">
        <select
          onChange={handleRegionChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Regions</option>
          {regions.map((r, idx) => (
            <option key={idx} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          onChange={handleDistrictChange}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Districts</option>
          {districts.map((d, idx) => (
            <option key={idx} value={d}>
              {d}
            </option>
          ))}
        </select>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by city, region, district"
            className="px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#caeb66] rounded-lg hover:bg-[#7c9f13] transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Map */}
      <MapContainer
        center={defaultCenter}
        zoom={7}
        style={{ height: "80vh", width: "100%" }}
        maxBounds={bangladeshBounds}
        maxBoundsViscosity={1.0} // prevents panning outside bounds
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup>
          {filteredLocations.map((loc, idx) => (
            <Marker
              key={idx}
              position={[loc.latitude, loc.longitude]}
              opacity={highlighted === loc ? 1 : 0.6}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold">{loc.city}</h3>
                  <p>Covered Areas: {loc.covered_area.join(", ")}</p>
                  <p>Status: {loc.status}</p>
                  <img
                    src={loc.flowchart}
                    alt="Flowchart"
                    className="mt-2 w-full h-24 object-contain"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {highlighted && <MapMover location={highlighted} />}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
