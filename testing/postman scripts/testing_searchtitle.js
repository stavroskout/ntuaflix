// Test 1: Check if the response time is less than 200ms
pm.test("Response time is less than 200ms", function () {
    // Check if the response time is below 200ms
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Test 1: Check if the response status code is 200 when a title is found
pm.test("Response status code is 200 when a title is found", function () {
    pm.expect(pm.response.code).to.equal(200);
});

// Test 2: Check if the response status code is 204 when no title is found
pm.test("Response status code is 204 when no title is found", function () {
    pm.expect(pm.response.code).to.equal(204);
});

//JSON//////////////

// Test 3: Check if the response has the expected fields for a valid search result
pm.test("Valid search result has the expected fields", function () {
    const responseData = pm.response.json();
    pm.expect(responseData).to.be.an('array');
    if (responseData.length > 0) {
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
    }
});

// Test 4: Check if the "genres" property is an array in the response
pm.test("Genres should be an array in the response", function () {
    const responseData = pm.response.json();
    if (responseData.length > 0) {
        responseData.forEach(function (item) {
            pm.expect(item.genres).to.be.an('array');
        });
    }
});

// Test 5: Check if the "titleAkas" property is an array in the response
pm.test("Title Akas should be an array in the response", function () {
    const responseData = pm.response.json();
    if (responseData.length > 0) {
        responseData.forEach(function (item) {
            pm.expect(item.titleAkas).to.be.an('array');
        });
    }
});

// Test 6: Check if the "principals" property is an array in the response
pm.test("Principals should be an array in the response", function () {
    const responseData = pm.response.json();
    if (responseData.length > 0) {
        responseData.forEach(function (item) {
            pm.expect(item.principals).to.be.an('array');
        });
    }
});

// Test 7: Check if the "rating" property is an object in the response
pm.test("Rating should be an object in the response", function () {
    const responseData = pm.response.json();
    if (responseData.length > 0) {
        responseData.forEach(function (item) {
            pm.expect(item.rating).to.be.an('object');
        });
    }
});

// Test 8: Check if the "rating" property has the expected fields in the response
pm.test("Rating has the expected fields in the response", function () {
    const responseData = pm.response.json();
    if (responseData.length > 0) {
        responseData.forEach(function (item) {
            if (item.rating !== null) {
                pm.expect(item.rating).to.have.property('avRating');
                pm.expect(item.rating).to.have.property('nVotes');
            }
        });
    }
});

//CSV/////////////////////

// Test 3: Check if the response has the expected header fields (CSV format)
pm.test("CSV response has the expected header fields", function () {
    const responseData = pm.response.text().split('\n');

    // Assuming the structure of each item in the response array
    const headerLine = responseData[0];
    if (headerLine) {
        const fields = headerLine.split(',');

        pm.expect(fields).to.have.lengthOf.at.least(10, "CSV should have at least 10 fields");
        pm.expect(fields[0]).to.equal('titleID');
        pm.expect(fields[1]).to.equal('type');
        pm.expect(fields[2]).to.equal('originalTitle');
        pm.expect(fields[3]).to.equal('titlePoster');
        pm.expect(fields[4]).to.equal('startYear');
        pm.expect(fields[5]).to.equal('endYear');
        pm.expect(fields[6]).to.equal('genres');
        pm.expect(fields[7]).to.equal('titleAkas');
        pm.expect(fields[8]).to.equal('principals');
        pm.expect(fields[9]).to.equal('rating');
    }
});

// Test 4: Check if the "genres" property is an array in the response (CSV format)
pm.test("Genres should be an array in the response (CSV format)", function () {
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

// Test 5: Check if the "titleAkas" property is an array in the response (CSV format)
pm.test("Title Akas should be an array in the response (CSV format)", function () {
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

// Test 6: Check if the "principals" property is an array in the response (CSV format)
pm.test("Principals should be an array in the response (CSV format)", function () {
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

