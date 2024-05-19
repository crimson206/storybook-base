// Define the interface for the response data
interface ResponseData {
    message?: string;
    filename?: string;
    error?: string;
    details?: string;
}

// Function that fetches data and writes the TypeScript file
const WriteFile = async (
    code: string = 'console.log("Hello from TypeScript!");',
    filePath: string = 'example/tempCode.tsx'
): Promise<void> => {

    try {
        // Send a POST request with code and file path
        const response = await fetch('/write-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, filePath })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the response as JSON and cast to the expected interface
        const responseData: ResponseData = await response.json();

        // Log either the response data or error message
        if (responseData.error) {
            console.error(`Error: ${responseData.error}\nDetails: ${responseData.details}`);
        } else {
            console.log(JSON.stringify(responseData, null, 2));
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default WriteFile;
