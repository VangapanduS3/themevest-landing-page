
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Plus, Minus } from "lucide-react";

type Stock = {
  name: string;
  weight: string;
  performance: string;
};

type InvestmentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  stocks: Stock[];
  portfolioTitle: string;
};

const InvestmentDialog = ({ isOpen, onClose, stocks, portfolioTitle }: InvestmentDialogProps) => {
  const initialInvestment = 1000;
  const [investment, setInvestment] = useState(initialInvestment);
  const [adjustedStocks, setAdjustedStocks] = useState<Array<{ name: string; weight: number; value: number }>>([]);

  useEffect(() => {
    // Convert string weights to numbers and normalize to ensure total is 100%
    if (stocks.length) {
      // Parse the initial weights
      const initialParsed = stocks.map(stock => ({
        name: stock.name,
        weight: Math.abs(parseFloat(stock.weight.replace("%", ""))),
        value: 0
      }));
      
      // Normalize weights to ensure they sum to 100%
      const totalInitialWeight = initialParsed.reduce((sum, stock) => sum + stock.weight, 0);
      const normalizedStocks = initialParsed.map(stock => ({
        ...stock,
        weight: totalInitialWeight > 0 ? Math.max((stock.weight / totalInitialWeight) * 100, 1) : (100 / initialParsed.length)
      }));
      
      // Make final adjustments to ensure total is exactly 100%
      const normalizedTotal = normalizedStocks.reduce((sum, stock) => sum + stock.weight, 0);
      if (normalizedTotal !== 100 && normalizedStocks.length > 0) {
        const diff = 100 - normalizedTotal;
        normalizedStocks[0].weight += diff;
      }
      
      updateStockValues(normalizedStocks, investment);
    }
  }, [stocks, investment]);

  const updateStockValues = (stocksArray: Array<{ name: string; weight: number; value: number }>, totalInvestment: number) => {
    const updated = stocksArray.map(stock => ({
      ...stock,
      value: (stock.weight / 100) * totalInvestment
    }));
    
    setAdjustedStocks(updated);
  };

  const handleWeightChange = (index: number, newWeight: number) => {
    // Don't allow weights below 1%
    newWeight = Math.max(newWeight, 1);
    
    const updated = [...adjustedStocks];
    const oldWeight = updated[index].weight;
    const weightDiff = newWeight - oldWeight;
    
    // If increasing weight, decrease others proportionally
    if (weightDiff > 0) {
      // Calculate total weight of other stocks
      const otherStocksWeight = updated.reduce((sum, stock, i) => 
        i !== index ? sum + stock.weight : sum, 0);
      
      // Check if we can increase (need at least 1% for each other stock)
      if (otherStocksWeight - weightDiff < updated.length - 1) {
        return; // Can't adjust, would make other stocks too small
      }
      
      // Distribute the weight reduction across other stocks proportionally
      const reductionFactor = (otherStocksWeight - weightDiff) / otherStocksWeight;
      
      updated.forEach((stock, i) => {
        if (i !== index) {
          // Reduce weight but ensure it's at least 1%
          stock.weight = Math.max(stock.weight * reductionFactor, 1);
        }
      });
    } 
    // If decreasing weight, increase others proportionally
    else if (weightDiff < 0) {
      const increaseFactor = -weightDiff / (100 - oldWeight);
      
      updated.forEach((stock, i) => {
        if (i !== index) {
          stock.weight += stock.weight * increaseFactor;
        }
      });
    }
    
    updated[index].weight = newWeight;
    
    // Make final adjustments to ensure total is exactly 100%
    const finalTotal = updated.reduce((sum, stock) => sum + stock.weight, 0);
    if (Math.abs(finalTotal - 100) > 0.1) {
      // Find the stock with highest weight that isn't the one being changed
      const adjustIndex = updated.findIndex((stock, i) => 
        i !== index && stock.weight === Math.max(...updated.filter((s, idx) => idx !== index).map(s => s.weight))
      );
      
      if (adjustIndex >= 0) {
        updated[adjustIndex].weight += (100 - finalTotal);
      } else if (updated.length > 0) {
        // If all stocks have the same weight, adjust the first one
        updated[0].weight += (100 - finalTotal);
      }
    }
    
    updateStockValues(updated, investment);
  };

  const handleInvestmentChange = (value: number) => {
    // Allow any non-negative value, including zero
    if (value >= 0) {
      setInvestment(value);
      updateStockValues(adjustedStocks, value);
    }
  };

  const handleIncrementWeight = (index: number) => {
    handleWeightChange(index, adjustedStocks[index].weight + 1);
  };

  const handleDecrementWeight = (index: number) => {
    handleWeightChange(index, adjustedStocks[index].weight - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Investment Successful",
      description: `You've invested $${investment} in ${portfolioTitle}`,
    });
    onClose();
  };

  const totalWeight = adjustedStocks.reduce((sum, stock) => sum + stock.weight, 0);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Invest in {portfolioTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Investment Amount</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={investment}
                onChange={(e) => handleInvestmentChange(Number(e.target.value))}
                className="w-32"
                min={0}
                step={100}
              />
              <span className="text-sm text-muted-foreground">USD</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
              <span>Stock</span>
              <div className="flex gap-8">
                <span>Weight</span>
                <span>Value</span>
              </div>
            </div>
          </div>
          
          <div className="mt-2 max-h-[300px] overflow-y-auto">
            {adjustedStocks.map((stock, index) => (
              <div key={index} className="py-3 border-b last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{stock.name}</div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 w-20 justify-end">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleDecrementWeight(index)}
                        disabled={stock.weight <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center">{stock.weight.toFixed(0)}%</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => handleIncrementWeight(index)}
                        disabled={stock.weight >= 99}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="w-20 text-right">
                      ${stock.value.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="pl-4 pr-8 mt-2">
                  <Slider
                    value={[stock.weight]}
                    min={1}
                    max={99}
                    step={1}
                    onValueChange={(values) => handleWeightChange(index, values[0])}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4 pt-2 border-t">
            <span className="font-medium">Total</span>
            <div className="flex items-center gap-6">
              <span className="w-20 text-right">{totalWeight.toFixed(0)}%</span>
              <span className="w-20 text-right font-medium">${investment.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={handleSubmit}>Invest Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentDialog;
