import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { DashboardLayout } from "../components/DashboardLayout";
import { useToast } from "../hooks/useToast";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { SubscriptionCard } from "../components/SubscriptionCard";
import { subscriptionStore } from "../store/subscriptionStore";
import type { Subscription } from "../types/types";
import type { CreateSubscriptionPayload } from "../services/api/subscription.api";

export const SubscriptionsPage: React.FC = () => {
  const {
    subscriptions,
    isLoading,
    error,
    fetchSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  } = subscriptionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formData, setFormData] = useState<CreateSubscriptionPayload>({
    name: "",
    price: 0,
    billingCycle: "monthly",
    nextBillingDate: new Date().toISOString().split("T")[0],
    category: "other",
    autoRenew: true,
  });
  const { showToast } = useToast();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const exportCSV = () => {
    const rows = filteredSubscriptions.length > 0 ? filteredSubscriptions : subscriptions;

    if (!rows.length) {
      showToast('No subscriptions to export', 'warning');
      return;
    }

    const header = ['Name', 'Price', 'Billing Cycle', 'Next Billing Date', 'Category', 'Status', 'Auto Renew'];
    const csvRows = [header.join(',')];

    rows.forEach((sub) => {
      const values = [
        `"${sub.name.replace(/"/g, '""')}"`,
        sub.price,
        sub.billingCycle,
        sub.nextBillingDate,
        sub.category,
        sub.status,
        sub.autoRenew ? 'Yes' : 'No',
      ];
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'subscriptions_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('CSV export ready', 'success');
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredSubscriptions = subscriptions
    .filter((sub) => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(
      (sub) => categoryFilter === "all" || sub.category === categoryFilter,
    );

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (formData.price <= 0) errors.price = "Price must be greater than 0";
    if (!formData.nextBillingDate)
      errors.nextBillingDate = "Next billing date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateSubscription(editingId, formData);
        setEditingId(null);
      } else {
        await createSubscription(formData);
      }

      // Reset form
      setFormData({
        name: "",
        price: 0,
        billingCycle: "monthly",
        nextBillingDate: new Date().toISOString().split("T")[0],
        category: "other",
        autoRenew: true,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingId(subscription._id);
    setFormData({
      name: subscription.name,
      price: subscription.price,
      billingCycle: subscription.billingCycle,
      nextBillingDate: subscription.nextBillingDate.split("T")[0],
      category: subscription.category,
      autoRenew: subscription.autoRenew,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        setIsDeleting(id);
        await deleteSubscription(id);
      } catch (err) {
        console.error("Error deleting:", err);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      price: 0,
      billingCycle: "monthly",
      nextBillingDate: new Date().toISOString().split("T")[0],
      category: "other",
      autoRenew: true,
    });
    setFormErrors({});
  };

  return (
    <DashboardLayout title="Subscriptions" greeting={false}>
      <div className="space-y-6 px-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-small-medium font-inter text-gray-900 dark:text-gray-100">
            Subscriptions
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={exportCSV}>
              Export CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
            >
              Create
              <FiPlus size={13} />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-4 text-text-muted"
              size={14}
            />
            <Input
              type="text"
              placeholder="Search subscriptions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-400"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="entertainment">Entertainment</option>
            <option value="productivity">Productivity</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div
            className="flex items-center justify-center"
            style={{ minHeight: 400 }}
          >
            <Spinner size="sm" />
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          <div className="space-y-4">
            {filteredSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub._id}
                subscription={sub}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting === sub._id}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-small font-inter text-gray-700">
                No subscriptions created yet.
              </h3>
              <p className="text-gray-500 text-center text-x-small font-sans mb-6">
                {searchQuery || categoryFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Add your first subscription to get started"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Edit Subscription" : "Add Subscription"}
      >
        <form onSubmit={handleSubmit} className="">
          <Input
            label="Subscription Name"
            placeholder="e.g., Netflix, Spotify"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
          />

          <div className="grid grid-cols-2 gap-4 my-3">
            <Input
              label="Price"
              type="number"
              step="0.01"
              placeholder="9.99"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              error={formErrors.price}
            />
            <div>
              <label className="block text-sm font-sans text-gray-900 my-1">
                Billing Cycle
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billingCycle: e.target.value as "monthly" | "yearly",
                  })
                }
                className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-gray-700"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <Input
            label="Next Billing Date"
            type="date"
            value={formData.nextBillingDate}
            onChange={(e) =>
              setFormData({ ...formData, nextBillingDate: e.target.value })
            }
            error={formErrors.nextBillingDate}
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 my-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 font-sans cursor-pointer"
            >
              <option value="entertainment">Entertainment</option>
              <option value="productivity">Productivity</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
              <option value="other">Other</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer px-1 py-3">
            <input
              type="checkbox"
              checked={formData.autoRenew}
              onChange={(e) =>
                setFormData({ ...formData, autoRenew: e.target.checked })
              }
              className="w-4 h-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-small font-sans text-gray-700 py-2">
              Auto-renew subscription
            </span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              variant="primary"
              isLoading={isLoading}
              className="flex-1"
            >
              {editingId ? "Update" : "Add"} Subscription
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default SubscriptionsPage;
