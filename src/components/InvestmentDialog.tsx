
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
    // Convert string weights to numbers and calculate initial values
    if (stocks.length) {
      const parsed = stocks.map(stock => ({
        name: stock.name,
        weight: parseFloat(stock.weight.replace("%", "")),
        value: 0
      }));
      
      updateStockValues(parsed, investment);
    }
  }, [stocks, investment]);

  const updateStockValues = (stocksArray: any[], totalInvestment: number) => {
    const updated = stocksArray.map(stock => ({
      ...stock,
      value: (stock.weight / 100) * totalInvestment
    }));
    
    setAdjustedStocks(updated);
  };

  const handleWeightChange = (index: number, newWeight: number) => {
    // Don't allow weights below 1%
    if (newWeight < 1) newWeight = 1;
    
    const totalOtherWeights = adjustedStocks.reduce((sum, stock, i) => 
      i !== index ? sum + stock.weight : sum, 0);
    
    // Don't allow total weight to exceed 100%
    if (totalOtherWeights + newWeight > 100) {
      newWeight = 100 - totalOtherWeights;
    }
    
    const updated = [...adjustedStocks];
    updated[index] = {
      ...updated[index],
      weight: newWeight,
    };
    
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
                        disabled={totalWeight >= 100 && stock.weight >= 1}
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
                    max={100}
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
              <span className="w-20 text-right">{totalWeight}%</span>
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
