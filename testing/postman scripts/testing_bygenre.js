// Test 1: Check if the response status code is 200
pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});

// Test 2: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

//JSON//////////////

// Test 3: Check if the response has the expected fields for a valid search result with multiple entries
pm.test("Valid search result with multiple entries has the expected fields", function () {
    pm.response.to.have.status(200);
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    pm.expect(responseData.length).to.be.greaterThan(0);

    // Assuming the structure of each item in the response array
    const firstResult = responseData[0];
    pm.expect(firstResult).to.have.property('titleID');
    pm.expect(firstResult).to.have.property('type');
    pm.expect(firstResult).to.have.property('originalTitle');
    pm.expect(firstResult).to.have.property('titlePoster');
    pm.expect(firstResult).to.have.property('startYear');
    pm.expect(firstResult).to.have.property('endYear');
    pm.expect(firstResult).to.have.property('genres');
    pm.expect(firstResult).to.have.property('titleAkas');
    pm.expect(firstResult).to.have.property('principals');
    pm.expect(firstResult).to.have.property('rating');
});

// Test 4: Check if the "originalTitle" property is a non-empty string
pm.test("Original title should be a non-empty string", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.originalTitle).to.be.a('string').and.to.have.lengthOf.at.least(1, "Original title should not be empty");
    });
});

// Test 5: Check if the "genres" property is an array
pm.test("Genres should be an array", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.genres).to.be.an('array');
    });
});

// Test 6: Check if the "titleAkas" property is an array
pm.test("Title Akas should be an array", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.titleAkas).to.be.an('array');
    });
});

// Test 7: Check if the "principals" property is an array
pm.test("Principals should be an array", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.principals).to.be.an('array');
    });
});

// Test 8: Check if the "rating" property is an object
pm.test("Rating should be an object", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        pm.expect(item.rating).to.be.an('object');
    });
});

// Test 9: Check if the "rating" property has the expected fields
pm.test("Rating has the expected fields", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    responseData.forEach(function (item) {
        if (item.rating !== null) {
            pm.expect(item.rating).to.have.property('avRating');
            pm.expect(item.rating).to.have.property('nVotes');
        }
    });
});


//CSV/////////////



// Test 4: Check if the "originalTitle" property is a non-empty string (CSV format)
pm.test("Original title should be a non-empty string (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of each item in the response array
    responseData.slice(1).forEach(function (line) {
        const originalTitle = line.split(',')[2]; // 3rd field is 'originalTitle'
        if (originalTitle) {
            pm.expect(originalTitle).to.be.a('string').and.to.have.lengthOf.at.least(1, "Original title should not be empty");
        }
    });
});

// Test 5: Check if the "genres" property is an array (CSV format)
pm.test("Genres should be an array (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of each item in the response array
    responseData.slice(1).forEach(function (line) {
        const genres = line.split(',')[6]; // 7th field is 'genres'
        if (genres) {
            const genresArray = genres.split('\n');
            pm.expect(genresArray).to.be.an('array');
        }
    });
});

// Test 6: Check if the "titleAkas" property is an array (CSV format)
pm.test("Title Akas should be an array (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of each item in the response array
    responseData.slice(1).forEach(function (line) {
        const titleAkas = line.split(',')[7]; // 8th field is 'titleAkas'
        if (titleAkas) {
            const titleAkasArray = titleAkas.split('\n');
            pm.expect(titleAkasArray).to.be.an('array');
        }
    });
});

// Test 7: Check if the "principals" property is an array (CSV format)
pm.test("Principals should be an array (CSV format)", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of each item in the response array
    responseData.slice(1).forEach(function (line) {
        const principals = line.split(',')[8]; // 9th field is 'principals'
        if (principals) {
            const principalsArray = principals.split('\n');
            pm.expect(principalsArray).to.be.an('array');
        }
    });
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
        return { format: 'csv', ...response.text() };
    } else {
        // Handle other content types as needed
        return { format: 'unknown' };
    }
}
