export const makeRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {...options})

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error("An error occurred:", error)
    throw error // Propagate the error for handling at a higher level if needed
  }
}
