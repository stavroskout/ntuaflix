// Test 1: Response status code is 200
pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test 1: Response status code is 200
pm.test("Response status code is 500", function () {
    pm.response.to.have.status(500);
});

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

// Test 7: Additional test - Check if titleId and ordering are valid values
pm.test("titleId and ordering are valid values", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    if (responseData.status === 'OK') {
        pm.expect(responseData.message).to.equal('File loaded successfully');
        pm.expect(responseData).to.have.property('titleId').that.is.a('string');
        pm.expect(responseData).to.have.property('ordering').that.is.a('number');
    }
});

// Test 8: Additional test - Check if region is a non-empty string
pm.test("Region is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    if (responseData.status === 'OK') {
        pm.expect(responseData.message).to.equal('File loaded successfully');
        pm.expect(responseData).to.have.property('region').that.is.a('string').and.to.have.lengthOf.at.least(1, "Region should not be empty");
    }
});

// Test 9: Additional test - Check if language is a non-empty string
pm.test("Language is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    if (responseData.status === 'OK') {
        pm.expect(responseData.message).to.equal('File loaded successfully');
        pm.expect(responseData).to.have.property('language').that.is.a('string').and.to.have.lengthOf.at.least(1, "Language should not be empty");
    }
});

// Add more tests as needed based on your specific requirements
