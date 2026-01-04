import TradingViewWidget from "@/components/trading-view/TradingViewWidget";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";
import { scriptUrlHelper } from "@/lib/utils";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

export default function StockDetailsScreen() {
  const { symbol } = useLocalSearchParams();
  const symbolInfoConfig = useMemo(() => SYMBOL_INFO_WIDGET_CONFIG, []);
  const candleChartConfig = useMemo(() => CANDLE_CHART_WIDGET_CONFIG, []);
  const baselineConfig = useMemo(() => BASELINE_WIDGET_CONFIG, []);
  const technicalAnalysisConfig = useMemo(
    () => TECHNICAL_ANALYSIS_WIDGET_CONFIG,
    []
  );
  const companyProfileConfig = useMemo(() => COMPANY_PROFILE_WIDGET_CONFIG, []);
  const companyFinancialsConfig = useMemo(
    () => COMPANY_FINANCIALS_WIDGET_CONFIG,
    []
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: symbol as string,
          headerBackTitle: "Stocks",
        }}
      />
      <View className="flex-1 pt-4 bg-gray-50 dark:bg-gray-950">
        <ScrollView>
          <View className="flex-1 p-1 gap-4">
            <TradingViewWidget
              scriptUrl={scriptUrlHelper("symbol-info")}
              config={symbolInfoConfig(symbol as string)}
              height={280}
              className="w-full rounded-2xl overflow-hidden"
            />
            <TradingViewWidget
              scriptUrl={scriptUrlHelper("symbol-profile")}
              config={companyProfileConfig(symbol as string)}
              className="w-full rounded-2xl overflow-hidden"
              height={440}
            />
            <TradingViewWidget
              scriptUrl={scriptUrlHelper("technical-analysis")}
              config={technicalAnalysisConfig(symbol as string)}
              className="w-full rounded-2xl overflow-hidden"
              height={400}
            />
            <TradingViewWidget
              scriptUrl={scriptUrlHelper("financials")}
              config={companyFinancialsConfig(symbol as string)}
              className="w-full rounded-2xl overflow-hidden"
              height={464}
            />
            <TradingViewWidget
              scriptUrl={scriptUrlHelper("advanced-chart")}
              config={candleChartConfig(symbol as string)}
              className="w-full rounded-2xl overflow-hidden"
              height={600}
            />
            <TradingViewWidget
              scriptUrl={scriptUrlHelper("advanced-chart")}
              config={baselineConfig(symbol as string)}
              className="w-full rounded-2xl overflow-hidden"
              height={600}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
