import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext";

// Generate a unique tracking ID
const generateTrackingId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TRK-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-${random}`;
};


// Calculate price based on type, weight, and zone
const calculatePrice = (type, weight, sameCity) => {
  if (type === "document") return sameCity ? 60 : 80;
  if (type === "non-document") {
    if (weight <= 3) return sameCity ? 110 : 150;
    let extra = Math.ceil(weight - 3) * 40;
    return sameCity ? 110 + extra : 150 + extra + 40;
  }
  return 0;
};

export default function AddParcelForm() {
  const { register, handleSubmit, watch, reset } = useForm();
  const [type, setType] = useState("document");
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [senderWarehouse, setSenderWarehouse] = useState("");
  const [receiverWarehouse, setReceiverWarehouse] = useState("");
  const [price, setPrice] = useState(null);
  const weight = parseFloat(watch("weight") || 0);

  //load warehouses data
  const warehouses = useLoaderData();

  const {user} = use(AuthContext);
  // console.log(user);


//calculate price
  useEffect(() => {
    if (!senderWarehouse || !receiverWarehouse) return;
    const sameCity =
      senderWarehouse.split(",")[0]?.trim() ===
      receiverWarehouse.split(",")[0]?.trim();
    setPrice(calculatePrice(type, weight || 0, sameCity));
  }, [type, weight, senderWarehouse, receiverWarehouse]);

  const onSubmit = (data) => {
    const trackingId = generateTrackingId();
    const sameCity =
      senderWarehouse.split(",")[0]?.trim() ===
      receiverWarehouse.split(",")[0]?.trim();
    const cost = calculatePrice(type, parseFloat(data.weight || 0), sameCity);

    const payload = {
      ...data,
      parcelType: type,
      senderRegion,
      receiverRegion,
      senderWarehouse,
      receiverWarehouse,
      trackingId,
      price: cost,
      userEmail: user?.email,
      delivery_zone: sameCity ? "Within City" : "Outside City/District",
      payment_status: "unpaid",
      creation_date: new Date().toISOString(),
    };

    // Show toast confirmation
    toast.custom((t) => (
      <div className="bg-white shadow-2xl rounded-2xl p-5 w-[380px] space-y-4">
        <h3 className="font-bold text-lg text-blue-800">
          Review Parcel Details
        </h3>
        <div className="text-sm text-gray-700 space-y-1 text-left">
          <p>
            <span className="font-medium">Tracking ID:</span> {trackingId}
          </p>
          <p>
            <span className="font-medium">Type:</span> {type}
          </p>
          <p>
            <span className="font-medium">Zone:</span> {payload.delivery_zone}
          </p>
          <p>
            <span className="font-medium">Total Cost:</span>{" "}
            <span className="font-bold text-green-600">৳{cost}</span>
          </p>
        </div>
        <div className="flex justify-between gap-3 pt-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Continue Editing
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleConfirm(payload);
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    ));
  };

  // Inside your handleConfirm function
  const handleConfirm = async (payload) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/add_parcel/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );


      if (res.data.status == true) {
        // Successfully saved
        toast.success(`Saved! Redirecting to payment...`);
      }

      // reset();

      // simulate redirect to static payment page
      // setTimeout(() => {
      //   window.location.href = "/payment"; // replace with actual payment page later
      // }, 1200);
    } catch (err) {
      toast.error("Error saving parcel");
      console.error(err);
    }
  };

  const regions = [...new Set(warehouses.map((w) => w.region))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <Toaster />
      <div className="shadow-xl rounded-2xl bg-gradient-to-br from-blue-50 to-white p-6">
        <h2 className="text-3xl font-bold text-center text-blue-800">
          Add Parcel (User)
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Door-to-Door delivery service — provide pickup & delivery details
        </p>

        {/* Type toggle */}
        <div className="flex justify-center gap-4 mb-6">
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

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Info */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Parcel Info
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("parcelName", { required: true })}
                className="w-full p-2 border rounded-xl"
                placeholder="Parcel Title"
              />
              {type === "non-document" && (
                <input
                  type="number"
                  step="0.01"
                  {...register("weight")}
                  className="w-full p-2 border rounded-xl"
                  placeholder="Weight (kg)"
                />
              )}
            </div>
          </div>

          {/* Sender Info */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Sender Info
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("senderName", { required: true })}
                defaultValue='Tanjid'
                className="w-full p-2 border rounded-xl"
                placeholder="Sender Name"
              />
              <input
                {...register("senderPhone", { required: true })}
                className="w-full p-2 border rounded-xl"
                placeholder="Sender Contact No"
              />
              <select
                value={senderRegion}
                onChange={(e) => {
                  setSenderRegion(e.target.value);
                  setSenderWarehouse("");
                }}
                className="w-full p-2 border rounded-xl"
                required
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
                required
              >
                <option value="">Select Service Center</option>
                {warehouses
                  .filter((w) => w.region === senderRegion)
                  .map((w, i) => (
                    <option key={i} value={`${w.city}, ${w.region}`}>
                      {w.city}, {w.region}
                    </option>
                  ))}
              </select>
              <input
                {...register("senderAddress", { required: true })}
                className="w-full p-2 border rounded-xl md:col-span-2"
                placeholder="Sender Address"
              />
              <textarea
                {...register("senderInstruction", { required: true })}
                className="w-full p-2 border rounded-xl md:col-span-2"
                rows="2"
                placeholder="Pickup Instruction"
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Receiver Info
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register("receiverName", { required: true })}
                className="w-full p-2 border rounded-xl"
                placeholder="Receiver Name"
              />
              <input
                {...register("receiverPhone", { required: true })}
                className="w-full p-2 border rounded-xl"
                placeholder="Receiver Contact No"
              />
              <select
                value={receiverRegion}
                onChange={(e) => {
                  setReceiverRegion(e.target.value);
                  setReceiverWarehouse("");
                }}
                className="w-full p-2 border rounded-xl"
                required
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
                required
              >
                <option value="">Select Service Center</option>
                {warehouses
                  .filter((w) => w.region === receiverRegion)
                  .map((w, i) => (
                    <option key={i} value={`${w.city}, ${w.region}`}>
                      {w.city}, {w.region}
                    </option>
                  ))}
              </select>
              <input
                {...register("receiverAddress", { required: true })}
                className="w-full p-2 border rounded-xl md:col-span-2"
                placeholder="Receiver Address"
              />
              <textarea
                {...register("receiverInstruction", { required: true })}
                className="w-full p-2 border rounded-xl md:col-span-2"
                rows="2"
                placeholder="Delivery Instruction"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              Submit Parcel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
