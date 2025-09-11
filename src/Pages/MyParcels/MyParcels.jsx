import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

export default function MyParcels() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [selectedParcel, setSelectedParcel] = useState(null);
  const navigate = useNavigate();

  // Fetch parcels
  const { data: parcels = [], isLoading, isError } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/get_parcels", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center mt-10">Loading parcels...</p>;
  if (isError) return <p className="text-center mt-10 text-red-600">Failed to load parcels.</p>;

  // Client-side filter by receiver phone
  const filteredParcels = parcels.filter((p) =>
    p.receiverPhone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">My Parcels</h2>
      <p className="text-gray-600 mb-4">Track your parcels or view details.</p>

      {/* Search */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by receiver mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 border">Tracking ID</th>
              <th className="px-4 py-2 border">Parcel Type</th>
              <th className="px-4 py-2 border">Sender</th>
              <th className="px-4 py-2 border">Receiver</th>
              <th className="px-4 py-2 border">Delivery Zone</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Payment Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No parcels found.
                </td>
              </tr>
            ) : (
              filteredParcels.map((p) => (
                <tr key={p.trackingId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{p.trackingId}</td>
                  <td className="px-4 py-2 border">{p.parcelType}</td>
                  <td className="px-4 py-2 border">{p.senderName}</td>
                  <td className="px-4 py-2 border">{p.receiverName}</td>
                  <td className="px-4 py-2 border">{p.delivery_zone}</td>
                  <td className="px-4 py-2 border">৳{p.price}</td>
                  <td
                    className={`px-4 py-2 border font-medium ${
                      p.payment_status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.payment_status ? p.payment_status.toUpperCase() : "N/A"}
                  </td>
                  <td className="px-4 py-2 border flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedParcel(p)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
                    >
                      Track
                    </button>
                    <button
                      onClick={() => navigate(`/parcel/${p.trackingId}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                    >
                      View
                    </button>
                    <button
                      disabled={p.payment_status === "paid"}
                      onClick={() => {
                        toast.success(`Proceeding to payment for ${p.trackingId}`);
                        navigate(`/dashboard/payment/${p._id}`); 
                      }}
                      className={`px-3 py-1 rounded-md text-sm text-white ${
                        p.payment_status === "paid"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      Payment
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Tracking Info</h3>
            <p>
              <span className="font-medium">Tracking ID:</span> {selectedParcel.trackingId}
            </p>
            <p>
              <span className="font-medium">Parcel Type:</span> {selectedParcel.parcelType}
            </p>
            <p>
              <span className="font-medium">Delivery Zone:</span> {selectedParcel.delivery_zone}
            </p>
            <p>
              <span className="font-medium">Price:</span> ৳{selectedParcel.price}
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              {selectedParcel.payment_status
                ? selectedParcel.payment_status.toUpperCase()
                : "N/A"}
            </p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                disabled={selectedParcel.payment_status === "paid"}
                onClick={() => {
                  toast("Proceed to payment clicked!");
                  setSelectedParcel(null);
                  navigate("/payment");
                }}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedParcel.payment_status === "paid"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setSelectedParcel(null)}
                className="px-4 py-2 rounded-md bg-gray-200"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
