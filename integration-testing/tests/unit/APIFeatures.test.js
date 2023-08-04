const { APIFeatures } = require('../../src/utils');

//queryString = 'location.state=MA&housing=true&avgerageCost[lte]=1000&careers[in]=Business,UI/UX&careers[nin]=Mobile Development&sort=avgerageCost,-averageRatings&page=1&limit=2&select=name,careers,courses';

const reqQuery = {
    location: {
        state: 'MA',
    },
    housing: true,
    avgerageCost: {
        lte: 1000,
    },
    careers: {
        in: 'Business,UI/UX',
        nin: 'Mobile Developmen',
    },
    sort: 'avgerageCost,-averageRatings',
    page: 1,
    limit: 2,
    select: 'name,careers,courses',
};

const apiFeatures = new APIFeatures(reqQuery);

describe('APIFeatures', () => {
    const filterOptions = {
        location: {
            state: 'MA',
        },
        housing: true,
        avgerageCost: {
            $lte: 1000,
        },
        careers: {
            $in: ['Business', 'UI/UX'],
            $nin: ['Mobile Developmen'],
        },
    };

    const sortOptions = 'avgerageCost -averageRatings';

    const selectOptions = 'name careers courses';

    // Test parseFilterOptions
    describe('parseFilterOptions', () => {
        it('should correctly parse filter options', () => {
            expect(apiFeatures.parseFilterOptions()).toMatchObject(
                filterOptions
            );
        });

        it('should handle empty reqQuery', () => {
            const emptyAPIFeatures = new APIFeatures({});
            const emptyFilterOptions = emptyAPIFeatures.parseFilterOptions();
            expect(emptyFilterOptions).toEqual({});
        });
    });

    // Test parseSortOptions
    describe('parseSortOptions', () => {
        it('should correctly parse sort options', () => {
            // Test actual sort options against expected sortOptions
            expect(apiFeatures.parseSortOptoins()).toBe(sortOptions);
        });

        it('should handle missing sort options', () => {
            const emptyAPIFeatures = new APIFeatures({});
            const emptySortOptions = emptyAPIFeatures.parseSortOptoins();

            expect(emptySortOptions).toBe('_id'); // Default sorting
            expect(emptyAPIFeatures.parseSortOptoins('price')); // price
        });
    });

    // Test parseSelectOptions
    describe('parseSelectOptions', () => {
        it('should correctly parse select options', () => {
            // Test actual select options against expected selectOptions
            expect(apiFeatures.parseSelectOptions()).toBe(selectOptions);
        });

        it('should handle missing select options', () => {
            const emptyAPIFeatures = new APIFeatures({});
            const emptySelectOptions = emptyAPIFeatures.parseSelectOptions();
            expect(emptySelectOptions).toBe('-__v'); // Default selection
        });
    });
});
