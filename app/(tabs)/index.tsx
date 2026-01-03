import TradingViewWidget from "@/components/trading-view/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
import { scriptUrlHelper } from "@/lib/utils";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const marketOverviewConfig = useMemo(() => MARKET_OVERVIEW_WIDGET_CONFIG, []);
  const heatmapConfig = useMemo(() => HEATMAP_WIDGET_CONFIG, []);
  const topStoriesConfig = useMemo(() => TOP_STORIES_WIDGET_CONFIG, []);
  const marketDataConfig = useMemo(() => MARKET_DATA_WIDGET_CONFIG, []);
  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
      <View className="flex-1 p-2 gap-8">
        <TradingViewWidget
          title={"Market Overview"}
          scriptUrl={scriptUrlHelper("market-overview")}
          config={marketOverviewConfig}
          height={600}
          className="w-full rounded-2xl overflow-hidden"
        />
        <TradingViewWidget
          title="Stock Heatmap"
          scriptUrl={scriptUrlHelper("stock-heatmap")}
          config={heatmapConfig}
          className="w-full rounded-2xl overflow-hidden"
          height={600}
        />
        <TradingViewWidget
          title="Top Stories"
          scriptUrl={scriptUrlHelper("timeline")}
          config={topStoriesConfig}
          className="w-full rounded-2xl overflow-hidden"
          height={600}
        />
        <TradingViewWidget
          title="Market Data"
          scriptUrl={scriptUrlHelper("market-quotes")}
          config={marketDataConfig}
          className="w-full rounded-2xl overflow-hidden"
          height={600}
        />
      </View>
    </ScrollView>
  );
}
