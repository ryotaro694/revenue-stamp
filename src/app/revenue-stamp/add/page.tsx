"use client"

import { Save, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRevenueStamps } from "@/hooks/revenue_stamp/useRevenueStamps"

export default function RevenueStampRegistration() {
  const {
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
    isLoading
  } = useRevenueStamps();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">収入印紙を追加する</h1>
      <div className="flex gap-4 mb-4">
        <Select onValueChange={(value) => setSelectedUnitPrice(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="収入印紙を選択" />
          </SelectTrigger>
          <SelectContent>
            {stampUnitPrices.map((unitPrice) => (
              <SelectItem key={unitPrice} value={unitPrice.toString()}>
                {formatNumber(unitPrice)}円
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          min="1"
          value={quantity === 0 ? "" : quantity}
          onChange={(e) => {
            const newValue = e.target.value;
            setQuantity(newValue === "" ? 0 : Number(newValue));
          }}
        />
        <Button onClick={handleRegister}>
          <Plus className="mr-1 h-4 w-4 shadow-md" />追加
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>金額</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>小計</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {revenueStamps.map((stamp, index) => (
            <TableRow key={index}>
              <TableCell>{formatNumber(stamp.unitPrice)}円</TableCell>
              <TableCell>{formatNumber(stamp.quantity)}</TableCell>
              <TableCell>{formatNumber(stamp.unitPrice * stamp.quantity)}円</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" className="my-1 mb-1" onClick={() => handleDelete(index)}>
                  <Trash className="h-4 w-4"/>削除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold mr-4">合計: {formatNumber(totalValue)}円</p>
        <Button size="sm" variant="outline" className="my-1 mb-1 shadow-md" disabled={isLoading} onClick={handleSave}>
          <Save className="h-4 w-4"/>{isLoading ? "保存中..." : "保存する"}
        </Button>
      </div>
    </div>
  )
}