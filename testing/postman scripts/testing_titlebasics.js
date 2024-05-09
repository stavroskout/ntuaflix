// Test 1: Response status code is 200
pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

//JSON////////////////

// Test 2: Response has the required fields - status and message
pm.test("Response has the required fields - status and message", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData).to.have.property('status');
    pm.expect(responseData).to.have.property('message');
});

// Test 3: Status is a non-empty string
pm.test("Status is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.status).to.be.a('string').and.to.have.lengthOf.at.least(1, "Status should not be empty");
});

// Test 4: Message is a non-empty string
pm.test("Message is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.message).to.be.a('string').and.to.have.lengthOf.at.least(1, "Message should not be empty");
});

// Test 5: Content-Type header is application/json
pm.test("Content-Type header is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Test 6: Additional test - Check if the response has the expected structure
pm.test("Response has the expected structure", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData).to.have.property('status');
    pm.expect(responseData).to.have.property('message');
    // Add more property expectations if needed based on your response structure
});

// Test 7: Additional test - Check if tconst, titleType, primaryTitle, and other fields are valid values
pm.test("tconst, titleType, primaryTitle, and other fields are valid values", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    if (responseData.status === 'OK') {
        pm.expect(responseData.message).to.equal('File loaded successfully');
        pm.expect(responseData).to.have.property('tconst').that.is.a('string');
        pm.expect(responseData).to.have.property('titleType').that.is.a('string');
        pm.expect(responseData).to.have.property('primaryTitle').that.is.a('string');
        // Add more expectations for other fields as needed
    }
});

// Test 8: Additional test - Check for error response when file structure is invalid
pm.test("Error response when file structure is invalid", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    if (responseData.status === 'failed') {
        pm.expect(responseData).to.have.property('error').that.is.a('string');
    }
    pm.expect(responseData).to.have.property('message').that.includes('Error uploading file');
});

//CSV/////////////

// Test 2: Content-Type header is text/csv
pm.test("Content-Type header is text/csv", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("text/csv");
});

// Test 3: Additional test - Check if the response has the expected structure for CSV
pm.test("Response has the expected structure for CSV", function () {
    const responseData = pm.response.text();

    // Check if the response contains expected CSV headers
    pm.expect(responseData).to.include("status,message,error");

    // Add more checks based on the specific structure of your CSV response
});

// Test 4: Additional test - Check for error response when file structure is invalid
pm.test("Error response when file structure is invalid", function () {
    const responseData = pm.response.text();

    // Check if the response contains the expected error message
    pm.expect(responseData).to.include("failed,Error uploading file,Duplicate entry 'tt9999999' for key 'PRIMARY'");
});
