// Test 1: Check if the response contains the required fields - user_cookie
pm.test("Response has the required field - user_cookie", function () {
    // Extract response data based on format
    const responseData = getResponseData(pm.response);

    // If the response format is CSV, skip this test
    if (responseData.format === 'csv') {
        pm.expect(true).to.be.true; // Skip the test
    } else {
        // Ensure that the response data is an object
        pm.expect(responseData).to.be.an('object');
        // Check if user_cookie field exists in the response
        pm.expect(responseData.user_cookie).to.exist;
    }
});

// Test 2: Check if the user_cookie is not empty
pm.test("User_cookie should not be empty", function () {
    // Extract response data based on format
    const responseData = getResponseData(pm.response);

    // If the response format is CSV, skip this test
    if (responseData.format === 'csv') {
        pm.expect(true).to.be.true; // Skip the test
    } else {
        // Ensure that the response data is an object
        pm.expect(responseData).to.be.an('object');
        // Check if user_cookie exists and is not empty
        pm.expect(responseData.user_cookie).to.exist.and.to.not.be.empty;
    }
});

// Test 4: Check if the Content-Type header is text/csv when format is csv
pm.test("Content-Type header is text/csv when format is csv", function () {
    // Check if the "format" query parameter is present in the request URL
    const formatQueryParam = pm.request.url.query.get('format');

    // If "format" is present and set to "csv", ensure the Content-Type is text/csv
    if (formatQueryParam && formatQueryParam.toLowerCase() === 'csv') {
        pm.expect(pm.response.headers.get("Content-Type")).to.include("text/csv");
    } else {
        // Skip the test if the "format" is not specified or not set to "csv"
        pm.expect(true).to.be.true; // Skip the test
    }
});

// Test 5: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 7: Check if the response status code is 200 OK
pm.test("Response status code is 200 OK", function () {
    pm.expect(pm.response.code).to.equal(200);
});

// Test 3: Check if admin_cookie, if present, is not empty
pm.test("Admin_cookie should not be empty if present", function () {
    // Extract response data based on format
    const responseData = getResponseData(pm.response);

    // If the response format is CSV or admin_cookie is null/undefined, skip this test
    if (responseData.format === 'csv' || responseData.admin_cookie === null || responseData.admin_cookie === undefined) {
        pm.expect(true).to.be.true; // Skip the test
    } else {
        // Ensure that the response data is an object
        pm.expect(responseData).to.be.an('object');
        // Check if admin_cookie exists and is not empty, if present
        pm.expect(responseData.admin_cookie).to.not.be.empty;
    }
});

// Function to extract response data based on format
function getResponseData(response) {
    // Determine the response format based on Content-Type header
    const contentType = response.headers.get("Content-Type");

    // Extract and return the appropriate response data based on the format
    if (contentType.includes("application/json")) {
        return { format: 'json', ...response.json() };
    } else if (contentType.includes("text/csv")) {
        // For CSV, you may need to implement a parser or adjust based on the actual response format
        // Placeholder code assuming CSV response structure for demonstration purposes
        const csvLines = response.text().split('\n');
        const headers = csvLines[0].split(',');
        const userCookieIndex = headers.indexOf('user_cookie');

        const userCookieRow = csvLines[1];
        const userCookieValue = userCookieRow.split(',')[userCookieIndex];

        const adminCookieIndex = headers.indexOf('admin_cookie');
        const adminCookieRow = csvLines[1];
        const adminCookieValue = adminCookieRow.split(',')[adminCookieIndex];

        return { format: 'csv', user_cookie: userCookieValue, admin_cookie: adminCookieValue };
    } else {
        // Handle other content types as needed
        return { format: 'unknown' };
    }
}
