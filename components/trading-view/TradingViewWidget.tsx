import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { WebView } from "react-native-webview";

interface TradingViewWidgetProps {
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
  title?: string;
}

export default function TradingViewWidget({
  scriptUrl,
  config,
  height = 600,
  className,
  title,
}: TradingViewWidgetProps) {
  const { colorScheme } = useColorScheme();
  const [html, setHtml] = useState("");

  useEffect(() => {
    const theme = colorScheme === "light" ? "light" : "dark";
    const backgroundColor = theme === "light" ? "#F9FAFB" : "#141414";

    const widgetConfig = {
      ...config,
      colorTheme: theme,
      theme: theme,
      backgroundColor: backgroundColor,
      isTransparent:
        config.isTransparent !== undefined ? config.isTransparent : false,
    };

    // Escape the config JSON for safe embedding in HTML
    const configJson = JSON.stringify(widgetConfig).replace(/</g, "\\u003c");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <title>${title}</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              overflow: hidden; 
              background-color: ${backgroundColor};
            }
            .tradingview-widget-container { 
              width: 100%; 
              height: ${height}px; 
            }
            .tradingview-widget-container__widget { 
              width: 100%; 
              height: 100%; 
            }
          </style>
        </head>
        <body>
          <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <script type="text/javascript" src="${scriptUrl}" async>
            ${configJson}
            </script>
          </div>
        </body>
      </html>
    `;

    setHtml(htmlContent);
  }, [scriptUrl, config, height, colorScheme, title]);

  return (
    <View className={className}>
      {title && (
        <Text className="text-3xl font-semibold mb-2 ml-2 py-3 text-gray-800 dark:text-white tracking-tighter">
          {title}
        </Text>
      )}
      <View style={{ height }}>
        <WebView
          source={{ html }}
          style={{ flex: 1, backgroundColor: "transparent" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          originWhitelist={["*"]}
          renderLoading={() => (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" />
            </View>
          )}
        />
      </View>
    </View>
  );
}
