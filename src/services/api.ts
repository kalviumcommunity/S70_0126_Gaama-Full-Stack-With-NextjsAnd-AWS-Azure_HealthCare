export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockApiResponse<T>(data: T, error: boolean = false): Promise<T> {
    await delay(800); // Simulate network latency
    if (error) {
        throw new Error("Simulated API Error");
    }
    return data;
}
