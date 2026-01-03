import { useDebounce } from "@/hooks/useDebounce";
import { useFinntech } from "@/providers/FinntechProvider";
import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

interface SearchScreenProps {
  initialStocks?: StockWithWatchlistStatus[];
}

interface SearchScreenProps {
  initialStocks?: StockWithWatchlistStatus[];
}

export default function SearchScreen({
  initialStocks = [],
}: SearchScreenProps) {
  const { searchStocks } = useFinntech();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  const handleSearch = async () => {
    if (!isSearchMode) {
      setStocks(initialStocks);
      return;
    }

    setLoading(true);
    try {
      // Update: searchStocks now returns { success, data, count }
      const response = await searchStocks(searchTerm.trim());
      setStocks(response.data); // Extract data from response
    } catch (error) {
      console.error("Search error:", error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  // Load initial popular stocks on mount if none provided
  useEffect(() => {
    if (initialStocks.length === 0) {
      loadPopularStocks();
    }
  }, []);

  const loadPopularStocks = async () => {
    try {
      setLoading(true);
      const response = await searchStocks(); // Empty query returns popular stocks
      setStocks(response.data);
    } catch (error) {
      console.error("Error loading popular stocks:", error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStock = (symbol: string) => {
    router.push(`/stocks/${symbol}`);
    setSearchTerm("");
    setStocks(initialStocks);
  };

  const renderStockItem = ({ item }: { item: StockWithWatchlistStatus }) => (
    <Pressable
      onPress={() => handleSelectStock(item.symbol)}
      className="flex-row items-center px-4 py-3 border-b border-gray-200 active:bg-gray-50"
    >
      <TrendingUp size={16} color="#6B7280" />
      <View className="flex-1 ml-3">
        <Text className="font-semibold text-gray-900">{item.name}</Text>
        <Text className="text-sm text-gray-500">
          {item.symbol} | {item.exchange} | {item.type}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Search Input */}
      <View className="px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search stocks..."
            className="flex-1 text-base"
            autoFocus
            returnKeyType="search"
          />
          {loading && (
            <ActivityIndicator size="small" color="#6B7280" className="ml-2" />
          )}
        </View>
      </View>

      {/* Results Count */}
      {displayStocks.length > 0 && (
        <View className="px-4 py-2 bg-gray-50">
          <Text className="text-sm text-gray-600">
            {isSearchMode ? "Search results" : "Popular stocks"} (
            {displayStocks.length})
          </Text>
        </View>
      )}

      {/* Stock List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6B7280" />
          <Text className="mt-2 text-gray-500">Loading stocks...</Text>
        </View>
      ) : displayStocks.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-gray-500 text-center">
            {isSearchMode ? "No results found" : "No stocks available"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayStocks}
          renderItem={renderStockItem}
          keyExtractor={(item) => item.symbol}
          contentContainerClassName="pb-4"
        />
      )}
    </View>
  );
}
