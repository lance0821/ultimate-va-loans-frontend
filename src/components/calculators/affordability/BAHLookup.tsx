'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getBAHRate, BAH_RATES, RANK_OPTIONS } from '@/lib/calculators/bah-rates'
import { formatCurrency } from '@/lib/utils/formatting'

interface BAHLookupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (bahAmount: number) => void
}

export function BAHLookup({ open, onOpenChange, onSelect }: BAHLookupProps) {
  const [zipCode, setZipCode] = useState('')
  const [rank, setRank] = useState('')
  const [bahAmount, setBAHAmount] = useState<number | null>(null)
  
  const handleLookup = () => {
    if (zipCode && rank) {
      const rate = getBAHRate(zipCode, rank)
      setBAHAmount(rate)
    }
  }
  
  const handleSelect = () => {
    if (bahAmount !== null) {
      onSelect(bahAmount)
      onOpenChange(false)
    }
  }
  
  const availableZipCodes = Object.keys(BAH_RATES)
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>BAH Rate Lookup</DialogTitle>
          <DialogDescription>
            Look up your Basic Allowance for Housing based on location and rank.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
              maxLength={5}
            />
            <p className="text-xs text-muted-foreground">
              Demo data available for: {availableZipCodes.join(', ')}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rank">Rank</Label>
            <Select value={rank} onValueChange={setRank}>
              <SelectTrigger id="rank">
                <SelectValue placeholder="Select your rank" />
              </SelectTrigger>
              <SelectContent>
                {RANK_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {bahAmount !== null && bahAmount > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly BAH Rate</p>
              <p className="text-2xl font-bold text-va-blue">
                {formatCurrency(bahAmount)}
              </p>
            </div>
          )}
          
          {bahAmount === 0 && zipCode && rank && (
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                No BAH data found for this location. Try one of the demo ZIP codes.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLookup}
            disabled={!zipCode || !rank}
            className="flex-1"
          >
            Look Up
          </Button>
          {bahAmount !== null && bahAmount > 0 && (
            <Button
              onClick={handleSelect}
              className="flex-1 bg-primary-900 hover:bg-[oklch(36.5%_0.145_254.6)]"
            >
              Use This Rate
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}