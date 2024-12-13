export async function revalidateTagClient(tag: string): Promise<void> {
  if (!tag) {
    throw new Error('Invalid tag provided')
  }

  try {
    const response = await fetch(
      `/api/revalidate?tag=${encodeURIComponent(tag)}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to revalidate tag: ${tag}. Status: ${response.status}`
      )
    }

    const data = await response.json()
    console.log(`Tag "${tag}" revalidated successfully at ${data.now}`)
  } catch (error) {
    console.error('Error revalidating tag:', error)
  }
}
