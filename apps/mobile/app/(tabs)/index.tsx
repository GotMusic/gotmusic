import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@gotmusic/tokens/native";

export default function Discover() {
  return (
    <SafeAreaView 
      className="flex-1 bg-bg"
      style={{ 
        flex: 1, 
        backgroundColor: tokens.color.bg.default
      }}
    >
      {/* Header */}
      <View 
        className="p-4 border-b border-fg/10"
        style={{ 
          padding: tokens.space["4"],
          borderBottomColor: tokens.color.border.subtle,
          borderBottomWidth: 1
        }}
      >
        <Text 
          className="text-fg text-2xl font-semibold"
          style={{ 
            color: tokens.color.fg.default, 
            fontSize: tokens.text["display-sm"].size,
            fontWeight: '600'
          }}
        >
          Discover
        </Text>
        <Text 
          className="text-fg/70 text-sm mt-1"
          style={{ 
            color: tokens.color.fg.muted,
            fontSize: tokens.text.sm.size,
            marginTop: tokens.space["1"]
          }}
        >
          Welcome to GotMusic!
        </Text>
      </View>

      {/* Content */}
      <View 
        className="flex-1 p-4"
        style={{ 
          flex: 1,
          padding: tokens.space["4"]
        }}
      >
        {/* Quick Actions */}
        <View className="mb-6">
          <Text 
            className="text-fg text-lg font-semibold mb-3"
            style={{ 
              color: tokens.color.fg.default,
              fontSize: tokens.text.lg.size,
              fontWeight: '600',
              marginBottom: tokens.space["3"]
            }}
          >
            Quick Actions
          </Text>
          
          <View className="flex-row gap-3 mb-4">
            <Link 
              href="/browse"
              className="flex-1 bg-brand-primary py-4 px-4 rounded-lg items-center"
              style={{ 
                backgroundColor: tokens.color.brand.primary,
                paddingVertical: tokens.space["4"],
                paddingHorizontal: tokens.space["4"],
                borderRadius: tokens.radius.lg,
                flex: 1
              }}
            >
              <Text 
                className="text-white font-semibold text-center"
                style={{ 
                  color: tokens.color.fg.inverse,
                  fontWeight: '600',
                  textAlign: 'center'
                }}
              >
                Browse Music
              </Text>
            </Link>
            
            <Link 
              href="/record"
              className="flex-1 bg-fg/10 py-4 px-4 rounded-lg items-center"
              style={{ 
                backgroundColor: tokens.color.fg.muted + '20',
                paddingVertical: tokens.space["4"],
                paddingHorizontal: tokens.space["4"],
                borderRadius: tokens.radius.lg,
                flex: 1
              }}
            >
              <Text 
                className="text-fg font-semibold text-center"
                style={{ 
                  color: tokens.color.fg.default,
                  fontWeight: '600',
                  textAlign: 'center'
                }}
              >
                Record Audio
              </Text>
            </Link>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <Text 
            className="text-fg text-lg font-semibold mb-3"
            style={{ 
              color: tokens.color.fg.default,
              fontSize: tokens.text.lg.size,
              fontWeight: '600',
              marginBottom: tokens.space["3"]
            }}
          >
            Recent Activity
          </Text>
          
          <View 
            className="rounded-lg border border-fg/10 bg-bg p-4"
            style={{ 
              borderRadius: tokens.radius.lg,
              borderColor: tokens.color.border.subtle,
              backgroundColor: tokens.color.bg.default,
              padding: tokens.space["4"]
            }}
          >
            <Text 
              className="text-fg/70 text-center"
              style={{ 
                color: tokens.color.fg.muted,
                textAlign: 'center'
              }}
            >
              No recent activity yet
            </Text>
            <Text 
              className="text-fg/50 text-sm text-center mt-1"
              style={{ 
                color: tokens.color.fg.subtle,
                fontSize: tokens.text.sm.size,
                textAlign: 'center',
                marginTop: tokens.space["1"]
              }}
            >
              Start browsing or recording to see activity here
            </Text>
          </View>
        </View>

        {/* Navigation Links */}
        <View>
          <Text 
            className="text-fg text-lg font-semibold mb-3"
            style={{ 
              color: tokens.color.fg.default,
              fontSize: tokens.text.lg.size,
              fontWeight: '600',
              marginBottom: tokens.space["3"]
            }}
          >
            Explore
          </Text>
          
          <View className="flex-row gap-3 flex-wrap">
            <Link 
              href="/library"
              className="bg-fg/10 px-4 py-2 rounded-md"
              style={{ 
                backgroundColor: tokens.color.fg.muted + '20',
                paddingHorizontal: tokens.space["4"],
                paddingVertical: tokens.space["2"],
                borderRadius: tokens.radius.md
              }}
            >
              <Text 
                className="text-fg"
                style={{ 
                  color: tokens.color.fg.default
                }}
              >
                My Library
              </Text>
            </Link>
            
            <Link 
              href="/develop"
              className="bg-fg/10 px-4 py-2 rounded-md"
              style={{ 
                backgroundColor: tokens.color.fg.muted + '20',
                paddingHorizontal: tokens.space["4"],
                paddingVertical: tokens.space["2"],
                borderRadius: tokens.radius.md
              }}
            >
              <Text 
                className="text-fg"
                style={{ 
                  color: tokens.color.fg.default
                }}
              >
                Developer Tools
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
