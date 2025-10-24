export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1>Test Page for ID: {id}</h1>
    </div>
  );
}
