export default async function Default({
  params,
}: {
  params: Promise<{ artist: string }>
}) {
  const artist = (await params).artist
  return (
    <div>
      <h1>{artist}</h1>
    </div>
  )
}
