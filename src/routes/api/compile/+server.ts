import { json, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json()

    const response = await fetch('https://svelte.dev/repl/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Svelte REPL error:', response.status, errorText)
      return json(
        {
          error: `Svelte REPL compilation failed: ${response.status} ${errorText}`,
          status: response.status,
        },
        { status: 500 }
      )
    }

    const result = await response.json()
    return json(result)
  } catch (error) {
    console.error('Compilation error:', error)
    return json(
      {
        error: error instanceof Error ? error.message : 'Compilation failed',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
