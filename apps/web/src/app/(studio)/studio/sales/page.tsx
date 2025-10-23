import { e2eHeaders } from "@/lib/e2eHeaders";
import { Card, CardTitle } from "@gotmusic/ui";

interface SalesData {
  summary: {
    totalSales: number;
    totalRevenue: number;
    averagePrice: number;
  };
  topSelling: {
    assetId: string;
    title: string;
    sales: number;
    revenue: number;
  } | null;
  recentSales: Array<{
    id: string;
    assetTitle: string;
    priceAmount: string;
    soldAt: string;
    buyerId: string;
  }>;
}

async function fetchSalesData(): Promise<SalesData> {
  const response = await fetch("/api/studio/sales", {
    headers: e2eHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sales data: ${response.status}`);
  }

  return response.json();
}

export default async function StudioSalesPage() {
  let salesData: SalesData;
  let error: string | null = null;

  try {
    salesData = await fetchSalesData();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load sales data";
    // Provide fallback data structure
    salesData = {
      summary: {
        totalSales: 0,
        totalRevenue: 0,
        averagePrice: 0,
      },
      topSelling: null,
      recentSales: [],
    };
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Sales Dashboard</h1>
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error loading sales data</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sales Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <CardTitle>Total Sales</CardTitle>
          <div className="text-2xl font-bold text-fg">{salesData.summary.totalSales}</div>
        </Card>

        <Card className="p-4">
          <CardTitle>Total Revenue</CardTitle>
          <div className="text-2xl font-bold text-fg">
            {formatCurrency(salesData.summary.totalRevenue)}
          </div>
        </Card>

        <Card className="p-4">
          <CardTitle>Average Price</CardTitle>
          <div className="text-2xl font-bold text-fg">
            {formatCurrency(salesData.summary.averagePrice)}
          </div>
        </Card>
      </div>

      {/* Top Selling Asset */}
      {salesData.topSelling && (
        <Card className="p-4">
          <CardTitle>Top Selling Asset</CardTitle>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{salesData.topSelling.title}</p>
              <p className="text-sm text-fg/60">
                {salesData.topSelling.sales} sales • {formatCurrency(salesData.topSelling.revenue)}{" "}
                revenue
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-green-600">
                {formatCurrency(salesData.topSelling.revenue)}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Sales */}
      <Card className="p-4">
        <CardTitle>Recent Sales</CardTitle>
        {salesData.recentSales.length === 0 ? (
          <p className="text-fg/60 text-center py-4">No recent sales</p>
        ) : (
          <div className="space-y-3">
            {salesData.recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between border-b border-fg/10 pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{sale.assetTitle}</p>
                  <p className="text-sm text-fg/60">
                    Sold to {sale.buyerId} • {new Date(sale.soldAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    {formatCurrency(Number.parseFloat(sale.priceAmount))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
