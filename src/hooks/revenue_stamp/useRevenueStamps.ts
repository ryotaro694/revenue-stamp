import { useState, useEffect } from "react";
import type { RevenueStamp } from "@/types/revenueStamp";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner"
import { promise } from "@/lib/promiseToast";

export const useRevenueStamps = () => {
  const [selectedUnitPrice, setSelectedUnitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [revenueStamps, setRevenueStamps] = useState<RevenueStamp[]>([]);
  const [stampUnitPrices, setStampUnitPrices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('/api/stamps')
      .then(response => response.json())
      .then(data => {
        setStampUnitPrices(data);
        setSelectedUnitPrice(data[0]); // Set the first amount as the default selected amount
      })
      .catch(error => console.error('Error fetching stamp amounts:', error));
  }, []);

  const handleRegister = () => {
    const newStamp: RevenueStamp = { unitPrice: selectedUnitPrice, quantity };
    setRevenueStamps([...revenueStamps, newStamp]);
  };

  const handleDelete = (indexToDelete: number) => {
    setRevenueStamps(revenueStamps.filter((_, index) => index !== indexToDelete));
  };

  const handleSave = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/revenue_stamps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(revenueStamps),
      });

      if (!response.ok) {
        throw new Error('Failed to save revenue stamps');
      }

      const result = await response.json();
      toast.success("保存しました！");

      setIsLoading(false); 
    } catch (error) {
      console.error('Error saving revenue stamps:', error);
    }
  };

  const formatNumber = (num: number) => num.toLocaleString();

  const totalValue = revenueStamps.reduce((sum, stamp) => sum + stamp.unitPrice * stamp.quantity, 0);

  return {
    selectedUnitPrice,
    setSelectedUnitPrice,
    quantity,
    setQuantity,
    revenueStamps,
    stampUnitPrices,
    handleRegister,
    handleDelete,
    handleSave,
    formatNumber,
    totalValue,
    isLoading,
  };
};