const path = require('path');

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-string'));

var main = require("../index");

describe("Process job object.", function () {

    it("PerfectPattern Flyer", function (done) {

        // arrange
        var pdfPath = path.join(__dirname, "/resources/job-processor/job-42_2500_Perfect Pattern Flyer.pdf");

        var job = {
            jobId: "job-42",
            files: [
                pdfPath
            ],
            amount: 2500,
            label: "Perfect Pattern Flyer"
        };

        // act
        main.processJob(job, function (bss, at) {
            expect(bss.length).to.equal(1);

            var bs = bss[0];
            console.log(JSON.stringify(bs, null, 4));

            // assert
            expect(at).to.null;

            expect(bs.id).to.equal("job-42");
            expect(bs.label).to.equal("Perfect Pattern Flyer");
            expect(bs.mustDemand).to.equal(2500);

            expect(bs.trimFormat.width).to.equal(210000);
            expect(bs.trimFormat.height).to.equal(297000);

            expect(bs.printData.frontPage.pdfPageNumber).to.equal("1");
            expect(bs.printData.frontPage.pdfUrl).to.equal("do hoid...");
            expect(bs.printData.backPage.pdfPageNumber).to.equal("2");
            expect(bs.printData.backPage.pdfUrl).to.equal("do hoid...");
         
            done();
        });
    });

});