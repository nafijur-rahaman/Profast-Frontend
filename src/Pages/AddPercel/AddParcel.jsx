import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const warehouses = [
  {
    region: "Dhaka",
    district: "Dhaka",
    city: "Dhaka",
    covered_area: ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"],
    status: "active",
  },
  {
    region: "Dhaka",
    district: "Faridpur",
    city: "Faridpur",
    covered_area: ["Goalanda", "Boalmari", "Bhanga"],
    status: "active",
  },
  {
    region: "Chittagong",
    district: "Chittagong",
    city: "Chittagong",
    covered_area: ["Agrabad", "Pahartali", "Halishahar"],
    status: "active",
  },
];

// Generate tracking ID
const generateTrackingId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TRK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${random}`;
};

// Pricing logic
const calculatePrice = (type, weight, sameCity) => {
  if (type === "document") {
    return sameCity ? 60 : 80;
  }
  if (type === "non-document") {
    if (weight <= 3) {
      return sameCity ? 110 : 150;
    } else {
      let extra = Math.ceil(weight - 3) * 40;
      return sameCity ? 110 + extra : 150 + extra + 40;
    }
  }
  return 0;
};

export default function AddParcelForm() {
  const { register, handleSubmit, reset, watch } = useForm();
  const [type, setType] = useState("document");

  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [senderWarehouse, setSenderWarehouse] = useState("");
  const [receiverWarehouse, setReceiverWarehouse] = useState("");

  const [trackingId, setTrackingId] = useState("");
  const [price, setPrice] = useState(null);

  // watch live inputs
  const weight = parseFloat(watch("weight") || 0);

  useEffect(() => {
    if (!senderWarehouse || !receiverWarehouse) return;

    const sameCity =
      senderWarehouse.split(",")[0]?.trim() === receiverWarehouse.split(",")[0]?.trim();

    const cost = calculatePrice(type, weight || 0, sameCity);
    setPrice(cost);
  }, [type, weight, senderWarehouse, receiverWarehouse]);

  const onSubmit = async (data) => {
    const id = generateTrackingId();

    const sameCity =
      senderWarehouse.split(",")[0]?.trim() === receiverWarehouse.split(",")[0]?.trim();

    const cost = calculatePrice(type, parseFloat(data.weight || 0), sameCity);

    const payload = {
      ...data,
      parcelType: type,
      senderRegion,
      receiverRegion,
      senderWarehouse,
      receiverWarehouse,
      trackingId: id,
      price: cost,
    };

    try {
      const res = await fetch("http://localhost:8000/api/parcels/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit parcel");

      const result = await res.json();
      console.log("✅ Parcel created:", result);

      setTrackingId(id);
      setPrice(cost);
      reset();
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  const regions = [...new Set(warehouses.map((w) => w.region))];
  const senderWarehouseObj = warehouses.find(
    (w) => `${w.city}, ${w.region}` === senderWarehouse
  );
  const receiverWarehouseObj = warehouses.find(
    (w) => `${w.city}, ${w.region}` === receiverWarehouse
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="shadow-xl rounded-2xl bg-gradient-to-br from-blue-50 to-white">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-blue-800">
            ✈️ Add a Parcel
          </h2>

          {/* Parcel type toggle */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setType("document")}
              className={`rounded-full px-6 py-2 border ${
                type === "document"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
            >
              Document
            </button>
            <button
              type="button"
              onClick={() => setType("non-document")}
              className={`rounded-full px-6 py-2 border ${
                type === "non-document"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
            >
              Non-Document
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Common Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Parcel Name</label>
                <input
                  {...register("parcelName", { required: true })}
                  className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., Passport / Gift Box"
                />
              </div>

              {type === "non-document" && (
                <div>
                  <label className="block text-sm font-medium">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("weight", { required: type === "non-document" })}
                    className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., 2.5"
                  />
                </div>
              )}
            </div>

            {/* Sender & Receiver */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sender */}
              <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-blue-700 mb-3 text-center">
                  Sender Info
                </h3>
                <div className="space-y-3">
                  <input
                    {...register("senderName", { required: true })}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Sender Full Name"
                  />
                  <select
                    value={senderRegion}
                    onChange={(e) => {
                      setSenderRegion(e.target.value);
                      setSenderWarehouse("");
                    }}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <select
                    value={senderWarehouse}
                    onChange={(e) => setSenderWarehouse(e.target.value)}
                    disabled={!senderRegion}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="">
                      {senderRegion ? "Select Pickup Warehouse" : "Select Region First"}
                    </option>
                    {warehouses
                      .filter((w) => w.region === senderRegion)
                      .map((w, i) => (
                        <option key={i} value={`${w.city}, ${w.region}`}>
                          {w.city}, {w.region}
                        </option>
                      ))}
                  </select>
                  {senderWarehouseObj && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {senderWarehouseObj.covered_area.map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                  <input
                    {...register("senderAddress")}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Sender Address"
                  />
                  <input
                    {...register("senderPhone", { required: true })}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Sender Contact No"
                  />
                  <textarea
                    {...register("senderInstruction")}
                    className="w-full p-2 border rounded-xl"
                    rows="2"
                    placeholder="Pickup Instructions"
                  />
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-green-50 p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-green-700 mb-3 text-center">
                  Receiver Info
                </h3>
                <div className="space-y-3">
                  <input
                    {...register("receiverName", { required: true })}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Receiver Full Name"
                  />
                  <select
                    value={receiverRegion}
                    onChange={(e) => {
                      setReceiverRegion(e.target.value);
                      setReceiverWarehouse("");
                    }}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="">Select Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <select
                    value={receiverWarehouse}
                    onChange={(e) => setReceiverWarehouse(e.target.value)}
                    disabled={!receiverRegion}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="">
                      {receiverRegion ? "Select Pickup Warehouse" : "Select Region First"}
                    </option>
                    {warehouses
                      .filter((w) => w.region === receiverRegion)
                      .map((w, i) => (
                        <option key={i} value={`${w.city}, ${w.region}`}>
                          {w.city}, {w.region}
                        </option>
                      ))}
                  </select>
                  {receiverWarehouseObj && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {receiverWarehouseObj.covered_area.map((a, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                  <input
                    {...register("receiverAddress")}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Receiver Address"
                  />
                  <input
                    {...register("receiverPhone", { required: true })}
                    className="w-full p-2 border rounded-xl"
                    placeholder="Receiver Contact No"
                  />
                  <textarea
                    {...register("receiverInstruction")}
                    className="w-full p-2 border rounded-xl"
                    rows="2"
                    placeholder="Delivery Instructions"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-6 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md"
              >
                Submit Parcel
              </button>
            </div>
          </form>

          {/* Live Preview */}
          {(trackingId || price !== null) && (
            <div className="mt-6 text-center space-y-2">
              {trackingId && (
                <p className="text-lg font-semibold text-gray-800">
                  📦 Tracking ID: <span className="text-blue-700">{trackingId}</span>
                </p>
              )}
              {price !== null && (
                <p className="text-lg font-semibold text-gray-800">
                  💰 Estimated Price:{" "}
                  <span className="text-green-700">৳{price}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
