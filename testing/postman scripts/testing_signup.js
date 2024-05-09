pm.test("Response status code is 200", function () {
  pm.expect(pm.response.code).to.equal(200);
});


pm.test("Response has the required fields - status and message", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData).to.have.property('status');
    pm.expect(responseData).to.have.property('message');
});

pm.test("Status is a non-empty string", function () {
  const responseData = pm.response.json();
  pm.expect(responseData.status).to.be.a('string').and.to.have.lengthOf.at.least(1, "Status should not be empty");
});


pm.test("Message is a non-empty string", function () {
    const responseData = pm.response.json();
    
    pm.expect(responseData.message).to.be.a('string').and.to.have.lengthOf.at.least(1, "Message should not be empty");
});


pm.test("Content-Type header is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});
