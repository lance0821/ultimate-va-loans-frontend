'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Info, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  getStates, 
  getCountiesByState, 
  searchCounties,
  STANDARD_LIMIT_2024,
  type CountyLimit 
} from '@/lib/constants/va-loan-limits-2024';
import { formatCurrency } from '@/lib/utils';

export default function CountyLimitSearch() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<CountyLimit[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<CountyLimit | null>(null);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const searchResults = searchCounties(searchQuery);
      setResults(searchResults.slice(0, 10)); // Limit to 10 results
    } else if (selectedState) {
      setResults(getCountiesByState(selectedState));
    } else {
      setResults([]);
    }
  }, [selectedState, searchQuery]);

  const handleCountySelect = (county: CountyLimit) => {
    setSelectedCounty(county);
    setSearchQuery('');
  };

  const states = getStates();

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Find Your County's VA Loan Limit
          </CardTitle>
          <CardDescription>
            Search by county name or select your state to see 2024 loan limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by county or state name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* State Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Or select state:</span>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Choose a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600 mb-2">
                {searchQuery ? 'Search results:' : `Counties in ${selectedState}:`}
              </p>
              <div className="grid gap-2 max-h-64 overflow-y-auto">
                {results.map((county) => (
                  <button
                    key={`${county.state}-${county.county}`}
                    onClick={() => handleCountySelect(county)}
                    className="text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {county.county}, {county.state}
                        </p>
                        <p className="text-sm text-gray-600">
                          Limit: {formatCurrency(county.limit)}
                        </p>
                      </div>
                      {county.isHighCost && (
                        <Badge variant="secondary">High Cost</Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected County Details */}
      {selectedCounty && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle>
              {selectedCounty.county}, {selectedCounty.state}
            </CardTitle>
            <CardDescription>2024 VA Loan Limit Information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <p className="text-sm text-gray-600">VA Loan Limit</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {formatCurrency(selectedCounty.limit)}
              </p>
              {selectedCounty.isHighCost && (
                <Badge className="mt-2" variant="secondary">
                  High-Cost Area
                </Badge>
              )}
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Remember:</strong> Veterans with full entitlement can borrow above 
                this limit without a down payment. This limit only applies if you have 
                partial entitlement.
              </AlertDescription>
            </Alert>

            {selectedCounty.limit > STANDARD_LIMIT_2024 && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">
                      Above Standard Limit
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      This county's limit is {formatCurrency(selectedCounty.limit - STANDARD_LIMIT_2024)} higher 
                      than the standard conforming loan limit of {formatCurrency(STANDARD_LIMIT_2024)}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}