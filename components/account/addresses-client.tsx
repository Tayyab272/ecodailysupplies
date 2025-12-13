"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Check, MapPin } from "lucide-react";
import {
  createSavedAddress,
  deleteSavedAddress,
  setDefaultSavedAddress,
  updateSavedAddress,
  type SavedAddress,
} from "@/services/users/user.service";

interface AddressesClientProps {
  initialAddresses: SavedAddress[];
  userId: string;
}

export function AddressesClient({
  initialAddresses,
  userId,
}: AddressesClientProps) {
  const [addresses, setAddresses] = useState<SavedAddress[]>(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteSavedAddress(userId, id);
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultSavedAddress(userId, id);
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_default: a.id === id }))
    );
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-gray-200/50">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Saved Addresses
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
            Manage your shipping and billing addresses
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="self-start sm:self-auto bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" strokeWidth={2.5} />
          Add Address
        </Button>
      </div>

      {/* Address List */}
      {addresses.length === 0 && !isAdding ? (
        <div className="flex items-center justify-center py-16 sm:py-20 rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl">
          <div className="text-center space-y-8 max-w-md px-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-3xl"></div>
                <div className="relative rounded-3xl bg-linear-to-br from-primary/10 to-primary/5 p-6 border-2 border-primary/20">
                  <MapPin
                    className="h-10 w-10 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200/60">
              <p className="text-xl font-bold text-gray-900 mb-2">
                No addresses saved yet
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add your first address to speed up checkout
              </p>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="mr-2 h-5 w-5" strokeWidth={2.5} />
              Add Your First Address
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
          {addresses.map((address) =>
            editingId === address.id ? (
              <div
                key={address.id}
                className="rounded-2xl border-2 border-dashed border-primary/40 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl relative overflow-hidden"
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="mb-5 pb-4 border-b border-gray-200/50">
                    <h3 className="text-lg font-bold text-gray-900">
                      Edit Address
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">
                      Update address details
                    </p>
                  </div>
                  <AddressForm
                    initial={address}
                    onCancel={() => setEditingId(null)}
                    onSubmit={async (payload) => {
                      const updated = await updateSavedAddress(
                        userId,
                        address.id,
                        payload
                      );
                      setAddresses((prev) =>
                        prev.map((a) =>
                          a.id === address.id
                            ? updated
                            : {
                                ...a,
                                is_default: updated.is_default
                                  ? false
                                  : a.is_default,
                              }
                        )
                      );
                      setEditingId(null);
                    }}
                  />
                </div>
              </div>
            ) : (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={() => setEditingId(address.id)}
                onDelete={() => handleDelete(address.id)}
                onSetDefault={() => handleSetDefault(address.id)}
              />
            )
          )}

          {/* Add New Address Form */}
          {isAdding && (
            <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
              <div className="relative">
                <div className="mb-5 pb-4 border-b border-gray-200/50">
                  <h3 className="text-lg font-bold text-gray-900">
                    Add New Address
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">
                    Enter address information
                  </p>
                </div>
                <AddressForm
                  onCancel={() => setIsAdding(false)}
                  onSubmit={async (payload) => {
                    const created = await createSavedAddress(
                      userId,
                      payload,
                      payload.is_default
                    );
                    setAddresses((prev) => [
                      created,
                      ...prev.map((a) => ({
                        ...a,
                        is_default: created.is_default ? false : a.is_default,
                      })),
                    ]);
                    setIsAdding(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Address Card Component - Premium Style
function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: SavedAddress;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}) {
  return (
    <div className="group relative rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:scale-[1.02] overflow-hidden">
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="mb-2 flex items-center gap-3 flex-wrap">
              <span className="font-bold text-base capitalize truncate text-gray-900">
                {address.name}
              </span>
              {address.is_default && (
                <span className="inline-flex items-center rounded-full bg-linear-to-r from-primary/20 to-primary/10 px-3 py-1.5 text-xs font-bold text-primary border-2 border-primary/30 shadow-md">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700">
              {address.first_name} {address.last_name}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="h-9 w-9 p-0 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Edit className="h-4 w-4" strokeWidth={2.5} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-9 w-9 p-0 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2.5} />
            </Button>
          </div>
        </div>

        <div className="mb-5 text-sm text-gray-700 space-y-1.5 font-medium">
          <p className="leading-relaxed">
            {address.address_line_1}
            {address.address_line_2 ? `, ${address.address_line_2}` : ""}
          </p>
          <p>
            {address.city}, {address.state} {address.postal_code}
          </p>
          <p>{address.country}</p>
          {address.phone && <p className="text-gray-600">{address.phone}</p>}
        </div>

        {!address.is_default && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSetDefault}
            className="w-full h-10 border-2 border-gray-300 text-gray-700 font-semibold hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200 rounded-xl"
          >
            <Check className="mr-2 h-4 w-4" strokeWidth={2.5} />
            Set as Default
          </Button>
        )}
      </div>
    </div>
  );
}

// Address Form Component
interface AddressFormProps {
  initial?: Partial<SavedAddress>;
  onSubmit: (payload: {
    name: string;
    first_name: string;
    last_name: string;
    company?: string | null;
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country?: string;
    phone?: string | null;
    is_default?: boolean;
  }) => void | Promise<void>;
  onCancel: () => void;
}

function AddressForm({ initial, onSubmit, onCancel }: AddressFormProps) {
  const [form, setForm] = useState({
    name: initial?.name || "Home",
    first_name: initial?.first_name || "",
    last_name: initial?.last_name || "",
    company: initial?.company || "",
    address_line_1: initial?.address_line_1 || "",
    address_line_2: initial?.address_line_2 || "",
    city: initial?.city || "",
    state: initial?.state || "",
    postal_code: initial?.postal_code || "",
    country: initial?.country || "US",
    phone: initial?.phone || "",
    is_default: Boolean(initial?.is_default) || false,
  });

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          ...form,
          company: form.company || null,
          address_line_2: form.address_line_2 || null,
          phone: form.phone || null,
        });
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
            Label
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Home, Office, Mom's House"
            className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
          />
        </div>
        <div className="flex items-end gap-3 pb-2">
          <input
            id="is_default"
            type="checkbox"
            checked={form.is_default}
            onChange={(e) =>
              setForm((f) => ({ ...f, is_default: e.target.checked }))
            }
            className="h-5 w-5 rounded border-2 border-gray-300 text-primary focus:ring-primary/20 focus:ring-2 cursor-pointer"
          />
          <Label
            htmlFor="is_default"
            className="text-sm font-semibold text-gray-700 cursor-pointer"
          >
            Set as default
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label
            htmlFor="first_name"
            className="text-sm font-semibold text-gray-900"
          >
            First name
          </Label>
          <Input
            id="first_name"
            value={form.first_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, first_name: e.target.value }))
            }
            placeholder="John"
            className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="last_name"
            className="text-sm font-semibold text-gray-900"
          >
            Last name
          </Label>
          <Input
            id="last_name"
            value={form.last_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, last_name: e.target.value }))
            }
            placeholder="Doe"
            className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
            required
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="address_line_1"
          className="text-sm font-semibold text-gray-900"
        >
          Street Address
        </Label>
        <Input
          id="address_line_1"
          value={form.address_line_1}
          onChange={(e) =>
            setForm((f) => ({ ...f, address_line_1: e.target.value }))
          }
          placeholder="123 Business Street"
          className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
          required
        />
      </div>

      <div>
        <Label
          htmlFor="address_line_2"
          className="text-sm font-semibold text-gray-900"
        >
          Unit, Apt, etc.{" "}
          <span className="text-gray-500 font-normal">(optional)</span>
        </Label>
        <Input
          id="address_line_2"
          value={form.address_line_2 || ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, address_line_2: e.target.value }))
          }
          placeholder="Suite 100"
          className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <Label htmlFor="city" className="text-sm font-semibold text-gray-900">
            City
          </Label>
          <Input
            id="city"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            placeholder="New York"
            className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="state"
            className="text-sm font-semibold text-gray-900"
          >
            State
          </Label>
          <Input
            id="state"
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            placeholder="NY"
            className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="postal_code"
            className="text-sm font-semibold text-gray-900"
          >
            ZIP
          </Label>
          <Input
            id="postal_code"
            value={form.postal_code}
            onChange={(e) =>
              setForm((f) => ({ ...f, postal_code: e.target.value }))
            }
            placeholder="10001"
            className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
          Phone <span className="text-gray-500 font-normal">(optional)</span>
        </Label>
        <Input
          id="phone"
          value={form.phone || ""}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="(555) 555-5555"
          className="mt-2 h-11 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm font-medium"
        />
      </div>

      <div className="flex gap-4 pt-3">
        <Button
          type="submit"
          className="flex-1 h-12 bg-linear-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300"
        >
          Save Address
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-12 px-6 border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-primary hover:text-primary transition-all duration-200 rounded-xl"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
