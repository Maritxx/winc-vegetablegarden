const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                high: -60,
                medium: -30,
                low: 0,
            },
        },
    };

    const environmentFactors = {
        sun: "low",
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with a single environment factor", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15)
    });

    test("Get yield for plant with multiple environment factors", () => {
        const environmentFactors = {
            sun: "low",
            wind: "medium",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(10.5);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(10.5);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });

    test("Calculate total yield with environmental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -30,
                    medium: 10,
                    high: 30,
                },
                wind: {
                    high: -40,
                    medium: -10,
                    low: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "medium",
            wind: "medium",
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBe(18.42);
    });
});

describe("getCostsForCrop", () => {
    test("Get cost for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(10);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
            salePrice: 2,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(60);
    });

    test("Get revenue for crop with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
            salePrice: 2,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };   
        const environmentFactors = {
            sun: "medium",
            wind: "medium",
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(42);    
    });
});

describe("getProfitForCrop", () => {
    test("Get profit for crop with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
            salePrice: 2,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getProfitForCrop(input)).toBe(50);
    });

    test("Get profit for crop with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
            salePrice: 2,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };   
        const environmentFactors = {
            sun: "medium",
            wind: "medium",
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(32);
    });
});

describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops, without environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
            salePrice: 2,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 2,
            salePrice: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops })).toBe(53);
    });

    test("Calculate total profit with multiple crops, with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 1,
            salePrice: 2,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 2,
            salePrice: 4,
            factor: {
                sun: {
                    low: -30,
                    medium: 10,
                    high: 30,
                },
                wind: {
                    high: -40,
                    medium: -10,
                    low: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "medium",
            wind: "low",
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(56.2);
    });
});