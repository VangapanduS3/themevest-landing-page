
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeCard from "@/components/ThemeCard";
import { portfolioThemes } from "@/data/portfolioData";

// Sorting options
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "returns-high", label: "Highest Returns" },
  { value: "returns-low", label: "Lowest Returns" },
  { value: "stocks-high", label: "Most Stocks" },
  { value: "stocks-low", label: "Least Stocks" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [themes, setThemes] = useState(portfolioThemes);
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique sectors for filtering
  const sectors = Array.from(new Set(portfolioThemes.map(theme => theme.type)));
  const riskLevels = ["Low", "Medium", "High"];
  
  // Handle filtering and sorting
  useEffect(() => {
    let filteredThemes = [...portfolioThemes];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredThemes = filteredThemes.filter(
        theme => theme.title.toLowerCase().includes(query) || 
                theme.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sector filter
    if (selectedSector) {
      filteredThemes = filteredThemes.filter(theme => theme.type === selectedSector);
    }
    
    // Apply risk filter
    if (selectedRisk) {
      filteredThemes = filteredThemes.filter(theme => theme.riskLevel === selectedRisk);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "returns-high":
        filteredThemes.sort((a, b) => parseFloat(b.returns.replace("%", "")) - parseFloat(a.returns.replace("%", "")));
        break;
      case "returns-low":
        filteredThemes.sort((a, b) => parseFloat(a.returns.replace("%", "")) - parseFloat(b.returns.replace("%", "")));
        break;
      case "stocks-high":
        filteredThemes.sort((a, b) => b.stockCount - a.stockCount);
        break;
      case "stocks-low":
        filteredThemes.sort((a, b) => a.stockCount - b.stockCount);
        break;
      case "name-asc":
        filteredThemes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filteredThemes.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "popular":
      default:
        filteredThemes.sort((a, b) => b.popularity - a.popularity);
        break;
    }
    
    setThemes(filteredThemes);
  }, [searchQuery, selectedSector, selectedRisk, sortBy]);
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSector(null);
    setSelectedRisk(null);
    setSortBy("popular");
  };
  
  const hasActiveFilters = searchQuery || selectedSector || selectedRisk || sortBy !== "popular";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Investment Themes</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore curated portfolios based on themes that match your interests and values.
            </p>
          </div>
          
          {/* Search and Filters Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              {/* Search Input */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search themes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              {/* Sort and Filter Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="w-full md:w-auto flex-grow md:flex-grow-0">
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <Select.Trigger className="w-full">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      <span>Sort by</span>
                    </Select.Trigger>
                    <Select.Content>
                      {sortOptions.map((option) => (
                        <Select.Item key={option.value} value={option.value}>
                          {option.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn({ 'bg-primary/10': showFilters })}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            
            {/* Expanded Filter Options */}
            {showFilters && (
              <div className="bg-background border rounded-lg p-4 mb-4 animate-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Sector</h3>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((sector) => (
                      <Badge 
                        key={sector} 
                        variant={selectedSector === sector ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
                      >
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Risk Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {riskLevels.map((risk) => (
                      <Badge 
                        key={risk} 
                        variant={selectedRisk === risk ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedRisk(selectedRisk === risk ? null : risk)}
                      >
                        {risk}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedSector && (
                  <Badge 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Sector: {selectedSector}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedSector(null)} 
                    />
                  </Badge>
                )}
                {selectedRisk && (
                  <Badge 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Risk: {selectedRisk}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedRisk(null)} 
                    />
                  </Badge>
                )}
                {sortBy !== "popular" && (
                  <Badge 
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Sort: {sortOptions.find(o => o.value === sortBy)?.label}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSortBy("popular")} 
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {themes.length} theme{themes.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Themes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.length > 0 ? (
              themes.map((theme, index) => (
                <ThemeCard key={`${theme.title}-${index}`} {...theme} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg font-medium mb-2">No themes match your filters</p>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Discover;
