import {calculateEndIndex, calculateSkip, paginationResult} from "../../src/utils/utils";

describe("Utils Test", () => {


    it('should return pagination with next and prev', function () {
        const page = 2;
        const limit = 10;
        const endIndex = 10;
        const skip = 10;
        const totalItems = 50;

        const expected = {
            next: { page: 3, limit: 10 },
            prev: { page: 1, limit: 10 }
        }


        const result = paginationResult(page,limit, endIndex, skip, totalItems)

        expect(result).toEqual(expected)
    });


    it('should return pagination only next ', function () {
        const page = 2;
        const limit = 10;
        const endIndex = 10;
        const skip = 0;
        const totalItems = 50;

        const expected = {
            next: { page: 3, limit: 10 },
            prev: {  }
        }


        const result = paginationResult(page,limit, endIndex, skip, totalItems)
        expect(result).toEqual(expected)
    });


    it('should return pagination only prev ', function () {
        const page = 2;
        const limit = 10;
        const endIndex = 50;
        const skip = 10;
        const totalItems = 50;

        const expected = {
            next: {},
            prev: { page: 1, limit: 10 }
        }


        const result = paginationResult(page,limit, endIndex, skip, totalItems)
        expect(result).toEqual(expected)
    });

    it('should return endIndex', function () {
        const page = 2;
        const limit = 10;

        const expected = 20
        const result = calculateEndIndex(page, limit)

        expect(result).toEqual(expected)
    });

    it('should return skip', function () {
        const page = 2;
        const limit = 10;

        const expected = 10
        const result = calculateSkip(page, limit)

        expect(result).toEqual(expected)
    });
})