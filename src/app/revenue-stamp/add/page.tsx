"use client"

import { useState } from "react"
import { Save, Trash, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type RevenueStamp = {
  amount: number
  quantity: number
}

const STAMP_AMOUNTS = [10, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 100000]

export default function RevenueStampRegistration() {
  const [selectedAmount, setSelectedAmount] = useState<number>(STAMP_AMOUNTS[0])
  const [quantity, setQuantity] = useState<number>(0)
  const [stamps, setStamps] = useState<RevenueStamp[]>([])

  const handleRegister = () => {
    const newStamp: RevenueStamp = { amount: selectedAmount, quantity }
    setStamps([...stamps, newStamp])
  }

  const handleDelete = (indexToDelete: number) => {
    setStamps(stamps.filter((_, index) => index !== indexToDelete));
  };  

  const formatNumber = (num: number) => num.toLocaleString();


  const totalValue = stamps.reduce((sum, stamp) => sum + stamp.amount * stamp.quantity, 0)

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">収入印紙を追加する</h1>
      <div className="flex gap-4 mb-4">
        <Select onValueChange={(value) => setSelectedAmount(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="収入印紙を選択" />
          </SelectTrigger>
          <SelectContent>
            {STAMP_AMOUNTS.map((amount) => (
              <SelectItem key={amount} value={amount.toString()}>
                {formatNumber(amount)}円
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
          {stamps.map((stamp, index) => (
            <TableRow key={index}>
              <TableCell>{formatNumber(stamp.amount)}円</TableCell>
              <TableCell>{formatNumber(stamp.quantity)}</TableCell>
              <TableCell>{formatNumber(stamp.amount * stamp.quantity)}円</TableCell>
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
        {/* 未実装 */}
        <Button size="sm" variant="outline" className="my-1 mb-1 shadow-md">
          <Save className="h-4 w-4"/>保存する
        </Button>
      </div>
    </div>
  )
}

