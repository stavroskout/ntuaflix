// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 2: Check if the response status code is 200 OK
pm.test("Response status code is 200 OK", function () {
    pm.expect(pm.response.code).to.equal(200);
});

//JSON////////


// Test 1: Check if the response Content-Type is application/json
pm.test("Content-Type header is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Test 2: Validate the user object
pm.test("Validate the user object", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    
    // Ensure that the response data is an array
    pm.expect(responseData).to.be.an('array');

    // Iterate through each user object in the array
    responseData.forEach(function(user) {
        // Ensure each user is an object
        pm.expect(user).to.be.an('object');
        
        // Check the data types and properties of each user object
        pm.expect(user.id).to.be.a('number');
        pm.expect(user.username).to.be.a('string');
        pm.expect(user.email).to.be.a('string');
        pm.expect(user.pwd).to.be.a('string');
        pm.expect(user.isadmin).to.be.a('number');
    });
});

// Test 3: Email is in a valid format
pm.test("Email is in a valid format", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
    
    // Iterate through each user object in the array
    responseData.forEach(function(user) {
        // Ensure the email matches the specified format
        pm.expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email format is not valid");
    });
});

// Test 4: All required fields are present
pm.test("All required fields are present", function () {
    // Extract response data as JSON
    const responseData = pm.response.json();
  
    // Ensure that the response data is an array
    pm.expect(responseData).to.be.an('array');

    // Iterate through each user object in the array
    responseData.forEach(function(user) {
        // Ensure each user object has the required properties
        pm.expect(user).to.have.property('id');
        pm.expect(user).to.have.property('username');
        pm.expect(user).to.have.property('email');
        pm.expect(user).to.have.property('pwd');
        pm.expect(user).to.have.property('isadmin');
    });
});

//CSV////////////

// Test 5: Check if the response Content-Type is text/csv when format is csv
pm.test("Content-Type header is text/csv when format is csv", function () {
    // Check if the "format" query parameter is present in the request URL
    const formatQueryParam = pm.request.url.query.get('format');

    // If "format" is present and set to "csv", ensure the Content-Type is text/csv
    if (formatQueryParam && formatQueryParam.toLowerCase() === 'csv') {
        pm.expect(pm.response.headers.get("Content-Type")).to.include("text/csv");
    }
});




