export default async function AssetDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main>
      <h1 data-testid="studio-asset-detail">Asset Detail OK</h1>
      <p data-testid="asset-id">{id}</p>
    </main>
  );
}
